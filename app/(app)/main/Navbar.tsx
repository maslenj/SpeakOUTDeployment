"use client"
import Avatar from '@/components/Avatar';
import NavbarDesktop from '@/components/Navbar/NavbarDesktop';
import NavbarMobile from '@/components/Navbar/NavbarMobile';
import { UserNoPassword } from '@/lib/types';
import Hamburger from 'hamburger-react';
import Link from 'next/link';
import React from 'react';
import { adminRoutes, speakerRoutes } from './routes';


export default function Navbar({ user, children }: { user: UserNoPassword, children: React.ReactNode }) {
    const [isOpen, setOpen] = React.useState(false);
    const routes = user.role === "ADMIN" ? adminRoutes : speakerRoutes

    return (
        <>
            <div className="border-2 border-[#9D9FA2] h-[90px] w-screen bg-white flex justify-between items-center">
                <div className="sm:hidden block">
                    <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
                    <NavbarMobile routes={routes} isOpen={isOpen} setOpen={setOpen} />
                </div>
                <img className="mx-4" src="/images/SpeakOUTLogo.svg" />
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