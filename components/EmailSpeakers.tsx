'use client'

import { UserNoPassword } from '@/lib/types';
import React, { useState } from 'react';

export const EmailSpeakers = ({users, onClose}: { users: UserNoPassword[]; onClose: () => void; }) => {
    const [message, setMessage] = useState("These speakers rock!");
    const [visibleUsers, setVisibleUsers] = useState<UserNoPassword[]>(users);
    console.log(visibleUsers)

    const handleEmailClick = (userToRemove: any) => {
        setVisibleUsers(visibleUsers.filter((user) => user !== userToRemove));
    };

    const handleCancelClick = () => {
        onClose();
    };

    async function send() {
        await fetch('/api/email', {
            method: 'POST',
            body: JSON.stringify({
                emails: visibleUsers.map(user => user.email),
                message: message
            })
        });
        onClose();
    }

    return (
        <div className="fixed inset-0 sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2 bg-gray-100 sm:bg-transparent">
            <div className="bg-white sm:min-w-[400px] w-full h-full sm:h-[470px] rounded-xl sm:border border-black m-0 sm:ml-[40px]">
                {/* email speakers text */}
                <div className="text-3xl font-normal ml-10 mt-10">Email Speakers</div>
                {/* recipients text */}
                <div className="text-xl font-normal ml-10 mt-4">Recipients</div>
                {/* recipient box */}
                <div className="py-5 px-3 bg-white w-[85%] rounded-[20px] border border-black ml-10 overflow-auto">
                    <div className="flex flex-wrap gap-2 p-4">
                        {visibleUsers.map((user, index) => (
                            <button key={index} className="bg-indigo-900 text-sm text-white px-3 py-1 rounded-full flex items-center justify-center">
                                {`${user.firstname} ${user.lastname}`}
                                <span onClick={() => handleEmailClick(user)} className="ml-2 cursor-pointer text-xs border-2 border-white rounded-full bg-indigo-100 px-1">X</span>
                            </button>
                        ))}
                        {/* <button onClick={add} className="bg-indigo-50 hover:bg-indigo-100 rounded-[20px] border border-indigo-900 flex items-center justify-center px-3 py-1">
                            <div className="text-indigo-900 text-sm font-bold">Add +</div>
                        </button> */}
                    </div>
                </div>
                {/* message text */}
                <div className="text-xl font-normal mx-10 mt-4">Message</div>
                {/* text box */}
                <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-[85%] h-[132px] box-border bg-white rounded-[20px] border border-black mx-10 p-3"
                />
                {/* Button container */}
                <div className="flex justify-end mt-4 mr-12 space-x-3">
                    {/* Cancel button */}
                    <button onClick={handleCancelClick} className="bg-gray-100 hover:bg-gray-200 rounded-[20px] border border-gray-300 px-5 py-2 flex items-center justify-center">
                        <div className="text-indigo-900 text-base font-bold">Cancel</div>
                    </button>
                    {/* Send button */}
                    <button onClick={send} className="bg-white hover:bg-gray-100 rounded-[20px] border border-indigo-900 px-5 py-2 flex items-center justify-center">
                        <div className="text-indigo-900 text-base font-bold">Send</div>
                    </button>
                </div>
            </div>
        </div>
    )    
}