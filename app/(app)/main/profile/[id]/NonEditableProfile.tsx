import React, { Dispatch, SetStateAction } from 'react';
import Typography from "@/components/Typography";
import EditIcon from "@/components/icons/EditIcon";
import { User } from "@prisma/client"
import { UserNoPassword } from '@/lib/types';
import ProfileView from './SelfView';
import ProfileData from './ProfileData';

interface Props {
  userData: UserNoPassword,
  setEditable: Dispatch<SetStateAction<boolean>>,
}
export function NonEditableProfile({ userData, setEditable }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between my-4 text-[#1E2A78] font-semibold">
        <Typography variant="h3">Account Settings</Typography>
        <button className="flex items-center" onClick={() => { setEditable(true) }}>
          <div className="text-[#000000] rounded-full bg-[#F0F0F0] border border-black flex items-center justify-center w-20 p-1">
            <EditIcon />
            <div>
              <Typography variant="p1">Edit</Typography>
            </div>
          </div>
        </button>
      </div>
      <ProfileData 
        user={userData} 
      />
    </div>
  )
}
