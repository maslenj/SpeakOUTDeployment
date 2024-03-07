"use client"

import SpeakerCard from "@/components/SpeakerCard"
import { useSession } from "next-auth/react"
import { useEffect, useState } from 'react';
import { EmailSpeakers } from '@/components/EmailSpeakers';
import { User } from "@prisma/client";

export default function AdminSpeakers() {
  const [users, setUser] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]); // Array to store the IDs of selected users
  const [isEmailPopupVisible, setEmailPopupVisible] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      fetch('/api/users').then(response => response.json().then(data => {
        setUser(data)
        //console.log(data)
      })).catch(function (error) {
        // Handle any errors
        console.error(error);
      });
    }
  }, [session])

  const [selectall, setSelectAll] = useState(true);

  const handleUserSelection = (userId: number) => {
    // Check if the user is already selected
    if (selectedUsers.includes(userId)) {
      console.log(`Removing user with ID ${userId} from selectedUsers array`);
      // If selected, remove from the array
      setSelectedUsers(prevSelected => prevSelected.filter(id => id !== userId));
    } else {
      console.log(`Adding user with ID ${userId} to selectedUsers array`);
      // If not selected, add to the array
      setSelectedUsers(prevSelected => [...prevSelected, userId]);
    }
  };

  const handleEmailButtonClick = () => {
    // Show the email popup
    setEmailPopupVisible(true);
  };

  const handleCloseEmailPopup = () => {
    // Close the email popup
    setEmailPopupVisible(false);
  };

  const handleSelectAllButtonClick = () => {
    if (users.length > 0) {
      users.forEach(user => {
        if (!selectedUsers.includes(user.id)) {
          setSelectedUsers(prevSelected => [...prevSelected, user.id]);
        }
      });
    }
    setSelectAll(false);
  };

  const handleDeSelectAllButtonClick = () => {
    if (users.length > 0) {
      users.forEach(user => {
        if (selectedUsers.includes(user.id)) {
          setSelectedUsers(prevSelected => prevSelected.filter(id => id !== user.id));
        }
      });
    }
    setSelectAll(true);
  };

  const handleDeleteUsers = async () => {
    try {
      // Check if there are selected users to delete
      if (selectedUsers.length === 0) {
        console.log('No users selected for deletion');
        return;
      }

      // Ask for confirmation
      const isConfirmed = window.confirm('Are you sure you want to delete the selected users?');

      // If the user confirms, proceed with deletion
      if (isConfirmed) {
        // Use Promise.all to wait for all delete requests to complete
        const deletePromises = selectedUsers.map((userId) =>
          fetch(`/api/users?id=${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`Failed to delete user with ID ${userId}`);
              }
              return response.json();
            })
            .catch((error) => {
              console.error(error.message);
              // Handle errors as needed
            })
        );

        const results = await Promise.all(deletePromises);

        // Process the results if needed
        console.log('Users deleted successfully:', results);

        // Reload the page after successful deletion
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting users:', error);
      // Handle errors as needed
    }
  };




  return (
    <>
      <main>
        <div className="mt-[40px] ml-[90px]">
          <div className="text-4xl text-indigo-800 font-serif font-semibold">
            Speakers
            <button
              type="button"
              className="ml-[7%] mt-[5%] text-sm border border-solid border-indigo-800 text-indigo-800 font-bold font-sans rounded-full hover:bg-gray-200 bg-white w-[12%] h-[40px]"
              onClick={handleEmailButtonClick}  >
              Email
            </button>
            {selectall ?
              (<button
                type="button"
                className="ml-[0.5%] mt-[5%] text-sm border border-solid border-indigo-800 text-indigo-800 font-bold font-sans rounded-full hover:bg-gray-200 bg-white w-[12%] h-[40px]"
                onClick={handleSelectAllButtonClick}  >
                Select All
              </button>) :
              (<button
                type="button"
                className="ml-[0.5%] mt-[5%] text-sm border border-solid border-indigo-800 text-indigo-800 font-bold font-sans rounded-full hover:bg-gray-200 bg-white w-[12%] h-[40px]"
                onClick={handleDeSelectAllButtonClick}  >
                Deselect All
              </button>)}
            <button
              type="button"
              className="ml-[0.5%] mt-[5%] text-sm border border-solid border-indigo-800 text-indigo-800 font-bold font-sans rounded-full hover:bg-gray-200 bg-white w-[12%] h-[40px]"
              onClick={handleDeleteUsers}>
              Delete User
            </button>
          </div>
          <div className="ml-[20px] text-lg text-black font-medium">
            {users.length} Speakers
          </div>
        </div>
        <div className=" ml-[5%]">
          {users.length > 0 ? (
            users.map(user => {
              //console.log('Iterating through user:', user); 
              return (
                <div key={user.id} className="w-[70%] min-w-[500px]">
                  <div>
                    <SpeakerCard
                      ID={user.id}
                      image={user.image}
                      name={user.firstname + " " + user.lastname}
                      email={user.email}
                      pronouns={user.pronouns}
                      status="Verified"
                      isSelected={selectedUsers.includes(user.id)}
                      onSelect={() => handleUserSelection(user.id)}
                      users={users}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
      {isEmailPopupVisible && (
        <EmailSpeakers
          IDs={selectedUsers}
          users={users}
          onClose={handleCloseEmailPopup}
        />
      )}

    </>
  )
}