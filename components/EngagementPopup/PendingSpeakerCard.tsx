import { User } from '@prisma/client';
import React, { useState } from 'react';
import { AiOutlineDown } from "react-icons/ai";

interface Props {
    speaker: User;
    isAdminMode: boolean;
    onDelete: () => void;
    onConfirm: () => void;
}

export default function PendingSpeakerCard({ speaker, isAdminMode, onDelete, onConfirm }: Props) {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleDeleteClick = () => {
        setShowDropdown(false)
        onDelete();
    };

    const handleConfirmClick = () => {
        setShowDropdown(false);
        onConfirm();
    };

    return (
        <div className="relative">
            <div className="bg-white border border-[#1E2A78] border-1 pl-3 pr-3 py-1.5 rounded-3xl text-black text-sm font-sans font-medium flex flex-row">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden min-w-[50px]">
                    <img src={speaker.image} alt="Profile" className="h-full w-full" />
                </div>

                <div className="ml-1">
                    <span className="text-[#1E2A78] text-xl font-sans font-medium">
                        {`${speaker.firstname} ${speaker.lastname}`}
                    </span>
                    <br />
                    <span className="text-[#1E2A78] text-sm font-sans font-medium">
                        {speaker.pronouns}
                    </span>
                </div>

                {isAdminMode && (
                    <div className="ml-2">
                        {showDropdown ? (
                            <div className="flex flex-col">
                                <button
                                    onClick={handleConfirmClick}
                                    className="text-lime-700 text-base font-medium hover:bg-gray-200 focus:bg-gray-200 rounded px-2 mr-1"
                                >
                                    Confirm
                                </button>
                                <button
                                    onClick={handleDeleteClick}
                                    className="text-rose-700 text-base font-medium hover:bg-gray-200 focus:bg-gray-200 rounded px-2 mr-1"
                                >
                                    Deny
                                </button>
                            </div>
                        ) : (
                            <button className="mt-3 ml-2" onClick={handleDropdownToggle}>
                                <AiOutlineDown className="text-[#1E2A78] text-2xl" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}