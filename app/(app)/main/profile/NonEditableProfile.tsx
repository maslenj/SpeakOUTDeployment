import React, { Dispatch, SetStateAction } from 'react';
import Typography from "@/components/Typography";
import EditIcon from "@/components/icons/EditIcon";
import { User } from "@/prisma/client"

interface Props {
        userData: User,
        setEditable: Dispatch<SetStateAction<boolean>>,
}
export function NonEditableProfile({ userData, setEditable}: Props) {
  return (
    <div>
      <div className="flex items-center justify-between my-4 text-[#1E2A78] font-semibold">
        <Typography variant="h3">Account Settings</Typography>
        <button className="flex items-center" onClick={() => {setEditable(true)}}> 
          <div className="text-[#000000] rounded-full bg-[#F0F0F0] border border-black flex items-center justify-center w-20 p-1">
            <EditIcon />
            <div>
              <Typography variant="p1" className="pl-2">Edit</Typography>
            </div>
          </div>
        </button>
      </div>
      <div className="flex items-center my-2 space-x-1">
        <div className="pl-2 font-semibold"><Typography variant="p1"> Email:  </Typography></div>
        {userData && <Typography variant="p1" className="pl-3"> {userData["email"]} </Typography>}
      </div>
      <div className="flex items-center my-2 space-x-1">
        <div className="pl-2 font-semibold"><Typography variant="p1"> Phone Number: </Typography></div>
        {userData && <Typography variant="p1" className="pl-3"> {userData["phonenum"]} </Typography>}
      </div>
      <div className="flex items-center my-2 space-x-1">
        <div className="pl-2 font-semibold"><Typography variant="p1"> Password:  </Typography></div>
        <div className="pl-1"><Typography variant="p1"> ************ </Typography></div>
      </div>
      <div className="my-4 text-[#1E2A78] font-semibold"> <Typography variant="h3" > About </Typography></div>
      {userData && <div className="pl-2"> <Typography variant="p1" > {userData["about"]} </Typography></div>}
      <div className="my-4 text-[#1E2A78] font-semibold"> <Typography variant="h3" > Identities </Typography></div>

        <div className="flex">
          {userData.tags && userData.tags.map((tag, index) => (
            <div key={index} className="text-[#000000] rounded-full bg-[#EBEEFF] border border-black flex items-center justify-center w-[fit-content] h-[fit-content] p-2 text-bold ml-2">
              <Typography variant="p1">{tag}</Typography>
            </div>
          ))}
        </div>

</div>
    )
}
