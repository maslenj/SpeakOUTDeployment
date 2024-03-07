"use client"
import { useState } from "react";

export type View = "List" | "Calendar"
const options: View[] = ["List", "Calendar"];

const ViewSelector = ({ view, setView } : { view : View, setView : React.Dispatch<React.SetStateAction<View>> }) => {
    const [showDropDown, setShowDropDown] = useState(false);

    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    };

    const selectOption = (view: View) => {
        setView(view);
        setShowDropDown(false);
    };

    return (
        <>
            <div className="flex flex-row items-end">
                <label className="text-[#1E2A78] font-serif text-[40px]">{view}</label>
                <div className="h-[50px] pl-2 flex flex-col items-center justify-center cursor-pointer" onClick={toggleDropDown}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="15" viewBox="0 0 26 15" fill="" >
                        <path d="M13 15L0.00961876 0L25.9904 0L13 15Z" fill="#1E2A78" />
                    </svg>
                </div>
            </div>
            {
                showDropDown && (
                    <div className="rounded-lg border z-10 absolute top-[60px] bg-white border-black w-[150px] p-[5px] ">
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => selectOption(option)}
                                className="hover:bg-[#97a1d6] cursor-pointer rounded-[5px] p-[5px]"
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )
            }
        </>
    )
}

export default ViewSelector