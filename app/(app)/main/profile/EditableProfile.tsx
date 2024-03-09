import React, { Dispatch, SetStateAction } from 'react';
import Typography from "@/components/Typography";
import { UserNoPassword } from '@/lib/types';


interface Props {
  userData: UserNoPassword,
  setUserData: Dispatch<SetStateAction<UserNoPassword>>,
  setEditable: Dispatch<SetStateAction<boolean>>,
}

export default function EditableProfile({ userData, setUserData, setEditable }: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(userData => {
      return ({
        ...userData,
        [e.target.name]: e.target.value
      })
    })
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag: string = (e.currentTarget as HTMLInputElement).value.trim();
      if (newTag !== '') {
        setUserData(userData => ({
          ...userData,
          tags: [...userData.tags, newTag]
        }));
        (e.currentTarget as HTMLInputElement).value = '';
      }
    } else if (e.key === 'Backspace' && (e.currentTarget as HTMLInputElement).value === '') {
      e.preventDefault();
      setUserData(userData => ({
        ...userData,
        tags: userData.tags.slice(0, -1)
      }));
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between my-4 text-[#1E2A78] font-semibold">
        <Typography variant="h3">Account Settings</Typography>
        <button className="flex items-center" onClick={() => {
          fetch("/api/users?id=" + userData.id, { method: "PATCH", body: JSON.stringify(userData) })
          setEditable(false)
        }}>
          <div className="rounded-full bg-[#7481D6] font-light text-white flex items-center justify-center px-8 py-[6px] hover:bg-[#6574d8]">
            <div>
              <Typography variant="p1">Done</Typography>
            </div>
          </div>
        </button>
      </div>
      <div className="flex items-center my-2 space-x-1">
        <div className="text-[#000000] rounded-full bg-[#FFFFFF] border border-black flex items-center justify-left w-full p-2 text-bold">
          <div className="pl-2 font-semibold"><Typography variant="p1"> Email: </Typography></div>
          {userData && <input
            type="email"
            name="email"
            value={userData['email']}
            onChange={handleChange}
          />}
        </div>
      </div>
      <div className="flex items-center my-2 space-x-1">
        <div className="text-[#000000] rounded-full bg-[#FFFFFF] border border-black flex items-center justify-left w-full p-2 text-bold">
          <div className="pl-2 font-semibold"><Typography variant="p1"> Phone Number: </Typography></div>
          {userData && <input
            type="phonenum"
            value={userData['phonenum']}
            name="phonenum"
            onChange={handleChange}
          />}
        </div>
      </div>
      <div className="flex items-center my-2 space-x-1">
        <div className="text-[#000000] rounded-full bg-[#FFFFFF] border border-black flex items-center justify-left w-full p-2 text-bold">
          <div className="pl-2 font-semibold"><Typography variant="p1"> Password: </Typography></div>
          <Typography variant="p1"> ********** </Typography>
        </div>
      </div>
      <div className="my-4 text-[#1E2A78] font-semibold"> <Typography variant="h3" > About </Typography></div>
      <div className="text-[#000000] rounded-full bg-[#FFFFFF] border border-black flex items-center justify-between w-full p-2 text-bold">
        {userData && <input
          type="about"
          value={userData['about']}
          name="about"
          onChange={handleChange}
        />}
      </div>
      <div className="my-4 text-[#1E2A78] font-semibold"> <Typography variant="h3" > Identities </Typography></div>
      <div className="flex items-center my-2 space-x-1 text-[#000000] rounded-full bg-[#FFFFFF] border border-black w-full p-2 text-bold">
        <div className="flex">
          {userData.tags && userData.tags.map((tag, index) => (
            <div key={index} className="text-[#000000] rounded-full bg-[#EBEEFF] border border-black flex items-center justify-center w-[fit-content] h-[fit-content] p-2 text-bold ml-2">
              <Typography variant="p1">{tag}</Typography>
            </div>
          ))}
          <input
            type="text"
            onKeyDown={handleKeyDown}
            className="outline-none px-2"
            placeholder="Add a tag..."
          />
        </div>
      </div>
    </div>
  )
}
