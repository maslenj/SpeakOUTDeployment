'use client'

import React, { useState } from 'react';
import Avatar from '@/components/Avatar';
import { EmailSpeakers } from '@/components/EmailSpeakers';
import { UserNoPassword } from '@/lib/types';

interface Props {
  speaker: UserNoPassword
  isSelected: boolean
  onSelect: () => void
  users: any
}

export default function SpeakerCard({ speaker, isSelected, onSelect, users }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailPopupVisible, setEmailPopupVisible] = useState(false);
  const arrowClasses = isOpen ? 'transform rotate-180' : '';

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
        onChange={onSelect}
        className="mr-5 h-6 w-6"
      />
      <div className="text-base px-4 py-2 r bg-white border-black border-2 w-full rounded-[15px] mt-[10px]">
        <button
          className="w-full h-full"
          type="button"
          onClick={() => {setIsOpen(isOpen => !isOpen)}}
        >
          <div className="flex justify-between">
            <div className="mr-3">
              <Avatar image={speaker.image} />
            </div>
            <span>
              <div className="text-blue-600 text-left mr-2 text-xl">{speaker.firstname} {speaker.lastname}</div>
              <div className="text-left">{speaker.pronouns}</div>
            </span>
            <div className="text-center">
              <div className = "mt-4 flex justify-center">{speaker.email}</div>
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
            IDs={[speaker.id]}
            users={users}
            onClose={handleCloseEmailPopup}
          />
        )}
      </div>
    </div>
    
  );
}