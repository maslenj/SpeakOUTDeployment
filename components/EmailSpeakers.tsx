'use client'

import { UserNoPassword } from '@/lib/types';
import { User } from '@prisma/client';
import React, { useState, useEffect} from 'react';

export const EmailSpeakers = (props: { IDs: any; users: UserNoPassword[]; onClose: () => void; }) => {
    
    const [visibleUsers, setVisibleUsers] = useState<UserNoPassword[]>([]);

    //Finds the users that are selected
    useEffect(() => {
        const usersToDisplay = props.users.filter((user) => props.IDs.includes(user.id));

        setVisibleUsers(usersToDisplay);

    }, [props.IDs, props.users]);


    const handleEmailClick = (userToRemove: any) => {
        setVisibleUsers(visibleUsers.filter((user) => user !== userToRemove));
    };

    function add() {
        alert('You clicked me!');
    }

    const handleCancelClick = () => {
        // Call the onClose prop to close the popup
        props.onClose();
    };

    async function send() {
        alert('You clicked me!');
    }

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[470px] ">
                <div className="w-[100%] h-[470px] bg-white rounded-xl border border-black ml-[40px]" >
                    {/* email speakers text */}
                    <div className="w-[301px] h-[52px] text-black text-3xl font-normal font-['DM Serif Text'] ml-10 mt-10">Email Speakers</div>
                    {/* recipients text */}
                    <div className="w-[239px] h-[35px] text-black text-xl font-normal ml-10">Recipients</div>
                    {/* recipient box  */}
                    <div className="w-[711px] h-[79px] py-5 px-3 bg-white rounded-[20px] border border-black ml-10 overflow-auto" >
                        <div className="py-3 px-3 flex flex-wrap gap-2 p-4 max-w-[711] ">
                            {visibleUsers.map((user: any, index: number) => (
                                <button  key={index} className="bg-indigo-900 text-sm text-white mr-2 px-3 py-1 rounded-full items-center">
                                    {`${user.firstname} ${user.lastname}`}  <span className="px-2 border text-black border-black rounded-full bg-indigo-100" onClick={() => handleEmailClick(user)}> X</span>
                                    </button>
                            ))}
                            <button onClick={add} className="w-[100px] h-[30px] bg-indigo-50 hover:bg-indigo-100 rounded-[20px] border border-indigo-900" >
                                <div className="w-[101px] h-[23px] text-indigo-900 text-sm font-bold font-['DM Sans'] flex items-center justify-center">Add +</div>
                            </button>
                        </div>
                    </div>
                    {/* message text */}
                    <div className="w-[239px] h-[35px] text-black text-xl font-normal] ml-10 mt-4">Message</div>
                    {/* text box */}
                    <textarea   defaultValue="These speakers rock!" className="w-[711px] h-[132px] bg-white rounded-[20px] border border-black ml-10 p-3">
                    </textarea>
                    {/* Button container */}
                    <div className="flex justify-end mt-4 mr-12 space-x-3">
                        {/* Cancel button */}
                        <button onClick={handleCancelClick} className="w-[150px] h-[45px] bg-gray-100 hover:bg-gray-200 rounded-[20px] border border-gray-300 flex items-center justify-center">
                            <div className="text-indigo-900 text-base font-bold font-['DM Sans']">Cancel</div>
                        </button>
                        {/* Send button */}
                        <button onClick={async () => await send()} className="w-[150px] h-[45px] bg-white hover:bg-gray-100 rounded-[20px] border border-indigo-900 flex items-center justify-center" >
                            <div className="text-indigo-900 text-base font-bold font-['DM Sans']">Send</div>
                        </button>
                    </div>
            </div>
        </div>
    )
}