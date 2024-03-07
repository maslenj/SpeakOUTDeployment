'use client'
import React, { Dispatch, SetStateAction, useState } from 'react';
import PendingSpeakerCard from '@/components/EngagementPopup/PendingSpeakerCard';
import SpeakerCard from './SpeakerCardEventDetails';
import { EngagementWithSpeakers } from '@/lib/types';
import "react-datepicker/dist/react-datepicker.css";
import AdminEngagementEditForm from './AdminEngagementEditForm';

export function AdminEngagementEdit({ engagement, setEngagement, toggleEditMode }: { engagement: EngagementWithSpeakers, setEngagement: (engagement: EngagementWithSpeakers) => void, toggleEditMode: () => void}) {
    const saveChanges = () => {
        const { confirmedSpeakers: confirmedSpeakers, pendingSpeakers: pendingSpeakers, ...data } = engagement
        fetch(`/api/engagements?id=${engagement.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(toggleEditMode)
    }

    const confifmSpeaker = (speaker: any) => {
        fetch('/api/engagements/confirm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ engagementId: engagement.id, userId: speaker.id }),
        }).then(res => {
            res.json().then(data => console.log(setEngagement(data.updatedEngagement)))
        })
    }

    return (
        <div>
            <AdminEngagementEditForm engagement={engagement} setEngagement={setEngagement} />

            <div className="grid lg:grid-cols-2 lg:gap-2 xs:grid-cols-1">
                <div>
                    <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-3">Speakers </span>
                    <div className="border border-black flex flex-row w-full rounded-xl px-2 py-3 mt-2 mb-8">
                        {engagement.confirmedSpeakers.map((speaker, index) => (
                            <div key={index} className="m-1">
                                <SpeakerCard
                                    speaker={speaker}
                                    isAdminMode={true}
                                    onDelete={() => setEngagement({ ...engagement, confirmedSpeakers: engagement.confirmedSpeakers.filter((_, i) => i !== index) })}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div>
                        <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-3">Pending Speakers </span>
                    </div>
                    <div className="border border-black flex flex-wrap w-full rounded-xl px-2 py-3 mt-2 mb-12">
                        {engagement.pendingSpeakers.map((speaker, index) => (
                            <div key={index} className="m-1">
                                <PendingSpeakerCard
                                    speaker={speaker}
                                    isAdminMode={true}
                                    onDelete={() => setEngagement({ ...engagement, pendingSpeakers: engagement.pendingSpeakers.filter((_, i) => i !== index) })}
                                    onConfirm={() => confifmSpeaker(speaker)}
                                />
                            </div>
                        ))}
                        {/* save add speaker button for later (not MVP)
                        <button className="border border-black flex flex-row items-center bg-[#EBEEFF] pl-3 pr-3 py-1.5 rounded-3xl text-[#1E2A78] text-sm font-sans font-medium max-w-[130px] max-h-[40px]align-center">
                            Add Speaker
                            <AiOutlinePlus className="pl-1 text-xl" />
                        </button> */}
                    </div>

                </div>
            </div>
            <div>
                <div className="flex flex-row justify-end absolute bottom-0 right-0">
                    <button
                        className="bg-white px-3 py-1 rounded-full text-[#1E2A78] border border-black text-med font-sans font-medium mt-10 mb-5 mr-3 flex items-center"
                        onClick={() => { alert("todo") }}>
                        Cancel Event
                    </button>

                    <button
                        className="bg-[#7481D6] px-7 py-1 rounded-full text-black border border-black text-med font-sans font-medium mt-10 mb-5 mr-5 flex items-center"
                        onClick={saveChanges}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}