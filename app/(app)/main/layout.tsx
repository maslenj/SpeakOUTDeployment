import React from "react"
import Navbar from "./Navbar";
import { getSelf } from "@/lib/db/utils";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getSelf()
  if (!user) throw new Error("User not found")

  return (
    <>
      <Navbar user={user}>
        {children}
      </Navbar>
    </>
  )
}
