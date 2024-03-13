"use client"

import SpeakerCard from "@/components/SpeakerCard"
import React, { useState } from 'react';
import { EmailSpeakers } from '@/components/EmailSpeakers';
import { UserNoPassword } from "@/lib/types";
import InviteSpeakersPopup from "./InviteSpeakersPopup";

function Button({ onClick, children }: { onClick: () => void, children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-sm border border-solid border-indigo-800 text-indigo-800 font-bold font-sans rounded-full hover:bg-gray-200 bg-white p-3 m-2"
    >
      {children}
    </button>
  );
}


export default function SpeakerView({ users }: { users: UserNoPassword[] }) {
  const [selectedUsers, setSelectedUsers] = useState<UserNoPassword[]>([]);
  const [isEmailPopupVisible, setEmailPopupVisible] = useState(false);
  const [isInvitePopupVisible, setInvitePopupVisible] = useState(false);
  const [selectAll, setSelectAll] = useState(true); // Ensure this starts as true or false depending on your initial state preference

  const toggleSelectAll = () => {
    if (selectAll) {
      // Select all users
      setSelectedUsers(users);
    } else {
      // Deselect all users
      setSelectedUsers([]);
    }
    setSelectAll(!selectAll);
  };

  const handleUserSelection = (user: UserNoPassword) => {
    // Check if the user is already selected
    if (selectedUsers.includes(user)) {
      // If selected, remove from the array
      setSelectedUsers(prevSelected => prevSelected.filter(prevUser => prevUser.id !== user.id));
    } else {
      // If not selected, add to the array
      setSelectedUsers(prevSelected => [...prevSelected, user]);
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
      <main className="p-5">
        <div>
          <div className="flex flex-col md:flex-row md:justify-between">
            <span className="text-4xl text-indigo-800 font-serif font-semibold flex justify-center sm:justify-start">
              Speakers
            </span>
            <span className="grid md:grid-cols-4 sm:grid-cols-2">
              <Button
                onClick={handleEmailButtonClick}
              >
                Email
              </Button>
              <Button
                onClick={toggleSelectAll}
              >
                {selectAll ? 'Select All' : 'Deselect All'}
              </Button>
              <Button
                onClick={handleDeleteUsers}
              >
                Delete User
              </Button>
              <Button
                onClick={() => setInvitePopupVisible(true)}
              >
                Invite Users
              </Button>
            </span>
          </div>
          <div className="ml-[20px] text-lg text-black font-medium">
            {users.length} Speakers
          </div>
        </div>
        <div className="ml-[5%]">
          {users.length > 0 ? (
            users.map(user => {
              return (
                <SpeakerCard
                  key={user.id}
                  speaker={user}
                  isSelected={selectedUsers.includes(user)}
                  onSelect={() => handleUserSelection(user)}
                  users={users}
                />
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
      {isEmailPopupVisible && (
        <EmailSpeakers
          users={selectedUsers}
          onClose={handleCloseEmailPopup}
        />
      )}
      {
        isInvitePopupVisible && (
          <InviteSpeakersPopup
            onClose={() => setInvitePopupVisible(false)}
          />
        )
      }
    </>
  )
}