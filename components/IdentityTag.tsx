import React from 'react';
import { IoCloseOutline } from "react-icons/io5";

interface Props {
    label: string;
    onDelete?: () => void; // function to handle deleting tag
}

export default function IdentityTag({ label, onDelete }: Props) {
    return (
        <div className="relative mt-2 mb-2">
            {onDelete? (
                <span className="bg-[#1E2A78] px-4 py-1.5 rounded-full text-white text-sm font-sans font-medium flex flex-row">
                    <button
                        onClick={onDelete}>
                        <IoCloseOutline className="text-white text-xl"/>
                    </button>
                    {label}
                </span>
            ): (
                <span className="bg-[#1E2A78] px-6 py-1.5 rounded-full text-white text-sm font-sans font-medium">
                    {label}
                </span>
            )}
        </div>
    );
}