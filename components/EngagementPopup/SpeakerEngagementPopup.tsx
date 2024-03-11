'use client'
import React, { useEffect, useState } from 'react';
import Typography from '@/components/Typography';
import { IoMdTime } from "react-icons/io";
import { FaRegDotCircle } from "react-icons/fa";
import IdentityTag from '@/components/IdentityTag';
import { GoLocation } from "react-icons/go";
import { SpeakerStatus } from '@/lib/types';
import PopupModal from './PopupModal';
import { Engagement } from '@prisma/client';

export default function SpeakerEngagementPopup({ engagement, onClose }: { engagement: Engagement, onClose: () => void }) {
    const { title, location, start, status, description, tags } = engagement;
    const [speakerStatus, setSpeakerStatus] = useState<SpeakerStatus | null>(null);
    useEffect(() => {
        fetch(`/api/engagements/status?id=${engagement.id}`)
            .then(res => res.json()
            .then(data => setSpeakerStatus(data.status)))
    })

    const signUp = () => {
        fetch("/api/engagements/signup", {
            method: "POST",
            body: JSON.stringify({engagementId: engagement.id})
        }).then(res => res.json().then(data => setSpeakerStatus(data.status)))
    }

    const optOut = () => {
        fetch("/api/engagements/optout", {
            method: "POST",
            body: JSON.stringify({engagementId: engagement.id})
        }).then(res => res.json().then(data => console.log(data)))
    }

    return (
        <PopupModal onClose={onClose}>
            <span className="text-[#380D5A] font-medium"> <Typography variant="h2">{title}</Typography></span>

            <div className="flex flex-row items-center mb-2 text-sm font-sans text-[#11173D] space-x-2" >
                <GoLocation className="pr-1 text-xl" />
                {location}

                <IoMdTime className="text-xl" />

                <span className="bg-white py-1 rounded-full">{new Date(start).toDateString()}</span>

                <FaRegDotCircle className="pr-1 text-xl" />
                {status}
            </div>
            <div>
                <span className="text-[20px] text-[#380D5A] font-serif font-medium mb-4">Description</span>
            </div>
            <div className="mb-4">
                <Typography variant="p1">
                    {description}
                </Typography>
            </div>

            <div>
                <span className="text-[20px] text-[#380D5A] font-serif font-medium mb-4">Identity Tags</span>
            </div>
            <div className="mt-3 mb-3 flex flex-row space-x-3">
                {tags.map((tag, index) => (
                    <IdentityTag key={index} label={tag}></IdentityTag>
                ))}
            </div>
            {/* {isConfirmed && (
                        <div>
                            <div>
                                <span className="text-[20px] text-[#380D5A] font-serif font-medium mb-3">
                                    Speakers ({numSpeakers})
                                </span>
                            </div>
                            <div className="mt-2 mb-8 flex flex-row space-x-3">
                                {speakers.map((speaker, index) => (
                                    <SpeakerCard
                                        key={index}
                                        image={speaker.image}
                                        name={speaker.name}
                                        pronouns={speaker.pronouns}
                                    />
                                ))}
                            </div>
                        </div>
                    )} */}
            

            {speakerStatus == "unmarked" && (
                <button className="absolute bottom-0 right-0 bg-[#7481D6] px-8 py-2 rounded-full text-white text-sm font-sans font-medium m-5"
                    onClick={signUp}>
                    I'm Available
                </button>
            )}
            {speakerStatus == "pending" && (
                <div className="absolute bottom-0 right-0 bg-[#7481D6] px-8 py-2 rounded-full text-white text-sm font-sans font-medium m-5">
                    Pending...
                </div>
            )}

            {speakerStatus == "confirmed" && (
                <button className="absolute bottom-0 right-0 bg-[#7481D6] px-8 py-2 rounded-full text-white text-sm font-sans font-medium m-5"
                    onClick={optOut}>
                    Opt Out
                </button>
            )}
        </PopupModal>
    );
}
