'use client'

import React, { useState } from 'react';
import Avatar from '@/components/Avatar';
import { EmailSpeakers } from '@/components/EmailSpeakers';

interface Props {
  ID: number
  name: string
  email: string
  pronouns: string
  image: string
  status: string
  isSelected: boolean
  onSelect: () => void
  users: any
}

export default function SpeakerCard({ID, name, email, pronouns, image, status, isSelected, onSelect, users }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailPopupVisible, setEmailPopupVisible] = useState(false);

  const arrowClasses = isOpen ? 'transform rotate-180' : '';

  const handleButtonClick = () => {
    setIsOpen(isOpen => !isOpen);
  };

  const handleCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation(); // Prevents the parent button from being clicked
    onSelect(); // Call the onSelect prop from the parent component
  };

  const handleEmailButtonClick = () => {
    // Show the email popup
    setEmailPopupVisible(true);
  };

  const handleCloseEmailPopup = () => {
    // Close the email popup
    setEmailPopupVisible(false);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxClick}
        className="mr-5 h-6 w-6"
      />
      <div className="text-base px-4 py-2 r bg-white border-black border-2 w-full rounded-[15px] mt-[10px]">
        <button
          className="w-full h-full"
          type="button"
          onClick={handleButtonClick}
        >
          <div className="flex justify-between">
            <div className="mr-3">
              <Avatar image={image} />
            </div>
            <span>
              <div className="text-blue-600 text-left mr-2 text-xl">{name}</div>
              <div className="text-left">{pronouns} {status}</div>
            </span>
            <div className="text-center">
              <div className = "mt-4 flex justify-center">{email}</div>
            </div>
            <svg
              className={`mt-[2%] w-5 h-2.5 ms-[2.5%] ml-auto mr-1${arrowClasses}`}
              aria-hidden="true"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </div>
        </button>
        {isOpen && (
          <div className="ml-10 mt-10 text-center">
            <button
              type="button"
              className="ml-[35%] text-sm border border-solid border-black text-black font-bold py-1 px-6 rounded-full hover:bg-gray-200"
            >
              Profile
            </button>
            <button
              type="button"
              className="ml-[5%] text-sm border border-solid border-black text-black font-bold py-1 px-6 rounded-full hover:bg-gray-200"
              onClick = {handleEmailButtonClick} 
            >
              Email
            </button>
          </div>
        )}
        {isEmailPopupVisible && (
          <EmailSpeakers
            IDs={[ID]}
            users={users}
            onClose={handleCloseEmailPopup}
          />
        )}
      </div>
    </div>
    
  );
}