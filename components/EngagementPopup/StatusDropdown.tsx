import { useState } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { FaRegDotCircle } from "react-icons/fa";

const statusOptions = ["In-Person", "Virtual", "Hybrid"];

export default function StatusDropdown({ status, setStatus } : { status: string, setStatus: (status: string) => void }) {
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);

    return (
        <div className="relative">
            <div className="border border-black rounded-xl px-2 py-1 focus:outline-none focus:border-[#7481D6] flex flex-row">
                <FaRegDotCircle className="pr-1 text-xl" />
                <div className="mr-1">{status}</div>
                <button onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="mt-1">
                    <AiOutlineDown className="text-sm" />
                </button>
            </div>
            {showStatusDropdown && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {statusOptions.map((option, index) => (
                        <div
                            key={index}
                            className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                                setStatus(option)
                                setShowStatusDropdown(false);
                            }}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}