"use client"

import Avatar from "@/components/Avatar"
import { Squash as Hamburger } from "hamburger-react";
import React, { useEffect } from "react"
import NavbarMobile from "../../../components/Navbar/NavbarMobile";
import NavbarDesktop from "../../../components/Navbar/NavbarDesktop";
import { useSession } from "next-auth/react";
import Link from "@/node_modules/next/link";
import { User } from "@prisma/client";
import { speakerRoutes, adminRoutes } from "./routes";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<User | null>(null);
  const { data: session } = useSession()
  const sessionUser : any = session?.user
  const routes = sessionUser?.role === "ADMIN" ? adminRoutes : speakerRoutes

  useEffect(() => {
    if (session && session.user) {
      fetch('/api/users/one?id=' + sessionUser.id)
        .then(res => res.json()
          .then(data => {
            setUser(data)
          }))
    }
  }, [session])

  return (
    <>
      <div className="border-2 border-[#9D9FA2] h-[90px] w-screen bg-white flex justify-between items-center">
        <div className="sm:hidden block">
          <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
          <NavbarMobile routes={routes} isOpen={isOpen} setOpen={setOpen} />
        </div>
        <img className="mx-4" src="../images/SpeakOUTLogo.svg" />
        <div className="mx-4 hover:cursor-pointer">
          <Link href="/main/profile"><Avatar image={!!user ? user.image : ""} /></Link>
        </div>
      </div>
      <div className="flex bg-[#F3F4F6]">
        <div className="w-64 min-h-screen border-r-2 border-[#9D9FA2] bg-white sm:block hidden">
          <NavbarDesktop routes={routes} />
        </div>
        <div className="w-full">
          {children}
        </div>
      </div>
    </>
  )
}
