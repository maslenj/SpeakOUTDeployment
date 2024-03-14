"use client"

import Avatar from "@/components/Avatar"
import Typography from "@/components/Typography";
import { NonEditableProfile } from "@/app/(app)/main/profile/[id]/NonEditableProfile";
import EditableProfile from "./EditableProfile"
import { useState } from "react";
import Button from "@/components/Button";
import { signOut } from 'next-auth/react'
import { UserNoPassword } from "@/lib/types";
import Link from "next/link";
import ImageUpload from "@/app/(auth)/bio/ImageUpload";


export default function SelfView({ user }: { user: UserNoPassword }) {
  const [editable, setEditable] = useState(false);
  const [userData, setUserData] = useState<UserNoPassword>(user);

  if (!userData) return (<div>Loading...</div>)

  return (
    <div className="w-full md:px-20 px-5">
      <div className="mb-1 mt-5 flex items-center">
        {editable ?
          <div>
            <ImageUpload
              image={userData.image}
              setImage={(image) => setUserData({ ...userData, image: image })}
            />
          </div>
          :
          <Avatar image={userData.image} />
        }

        <div className="ml-2 flex flex-row">
          <div className="pl-3 font-medium">
            <Typography variant="h1">
              {userData["firstname"]} {userData["lastname"]}
            </Typography>
          </div>
          <div className="pl-3 pt-4 font-semibold">
            <Typography variant="h3">{userData["pronouns"]}</Typography>
          </div>
        </div>
      </div>
      {editable ?
        <EditableProfile
          userData={userData}
          setUserData={setUserData}
          setEditable={setEditable}
        /> :
        <NonEditableProfile
          userData={userData}
          setEditable={setEditable}
        />}

      <div className="my-4 space-x-2">
        <Button variant="primary" onClick={signOut}>
          Sign Out
        </Button>
        <Link href="/main/update-password">
          <Button variant="primary">
            Update Password
          </Button>
        </Link>
      </div>

    </div>
  )
}