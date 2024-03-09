"use client"

import Avatar from "@/components/Avatar"
import Typography from "@/components/Typography";
import { NonEditableProfile } from "@/app/(app)/main/profile/NonEditableProfile";
import EditableProfile from "./EditableProfile"
import { useState } from "react";
import Button from "@/components/Button";
import { signOut } from 'next-auth/react'
import { UserNoPassword } from "@/lib/types";


export default function ProfileView({ user } : { user: UserNoPassword }) {
  const [editable, setEditable] = useState(false);
  const [userData, setUserData] = useState<UserNoPassword>(user);

  if (!userData) return (<div>Loading...</div>)

  return (
    <div className="w-full md:px-20 px-5">
      <div className="mb-1 mt-5 flex items-center">
        <Avatar image={userData.image} />
        <div className="ml-2 flex flex-row">
          {userData && ( // Check if userData is not null
            <div className="pl-3 font-medium">
              <Typography variant="h1">
                {userData["firstname"]} {userData["lastname"]}
              </Typography>
            </div>
          )}
          {userData && ( // Check if userData is not null
            <div className="pl-3 pt-4 font-semibold">
              <Typography variant="h3">{userData["pronouns"]}</Typography>
            </div>
          )}
        </div>
      </div>
      {userData &&
        (editable ?
          <EditableProfile
            userData={userData}
            setUserData={setUserData}
            setEditable={setEditable}
          /> :
          <NonEditableProfile
            userData={userData}
            setEditable={setEditable}
          />)
      }
      <div className="my-4">
        <Button variant="primary" onClick={signOut}>
          Sign Out
        </Button>
      </div>



    </div>
  )
}