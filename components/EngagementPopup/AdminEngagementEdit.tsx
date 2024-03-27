'use client'
import React, { Dispatch, SetStateAction, useState } from 'react';
import PendingSpeakerCard from '@/components/EngagementPopup/PendingSpeakerCard';
import SpeakerCard from './SpeakerCardEventDetails';
import { EngagementWithSpeakers } from '@/lib/types';
import "react-datepicker/dist/react-datepicker.css";
import AdminEngagementEditForm from './AdminEngagementEditForm';
import Button from '../Button';
import { EmailSpeakers } from '../EmailSpeakers';

export function AdminEngagementEdit({ engagement, setEngagement, toggleEditMode }: { engagement: EngagementWithSpeakers, setEngagement: (engagement: EngagementWithSpeakers) => void, toggleEditMode: () => void}) {
    const [confirmedSpeakersEmailPopupVisible, setConfirmedSpeakersEmailPopupVisible] = useState(false);
    const [pendingSpeakersEmailPopupVisible, setPendingSpeakersEmailPopupVisible] = useState(false);
    
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

    const deleteSpeaker = async (speaker: any) => {
        const res = await fetch('/api/engagements/remove', {
            method: 'POST',
            body: JSON.stringify({ engagementId: engagement.id, userId: speaker.id }),
        })
        const data = await res.json()
        console.log(data)
        setEngagement(data.updatedEngagement)
    }


    return (
        <div>
            <AdminEngagementEditForm engagement={engagement} setEngagement={setEngagement} />

            <div className="grid lg:grid-cols-2 lg:gap-2 xs:grid-cols-1">
                <div>
                    <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-3">Speakers ({engagement.confirmedSpeakers.length}/{engagement.capacity}) <span className='text-[16px]'>
                    <Button variant="secondary" onClick={() => { setConfirmedSpeakersEmailPopupVisible(true) }}>Email Confirmed Speakers</Button></span> </span>
                    <div className="border border-black flex flex-row w-full rounded-xl px-2 py-3 mt-2 mb-8">
                        {engagement.confirmedSpeakers.map((speaker, index) => (
                            <div key={index} className="m-1">
                                <SpeakerCard
                                    speaker={speaker}
                                    isAdminMode={true}
                                    onDelete={() => deleteSpeaker(speaker)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div>
                        <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-3"> Pending Speakers </span> <Button variant="secondary" onClick={() => { setPendingSpeakersEmailPopupVisible(true)}}>Email Pending Speakers</Button>
                    </div>
                    <div className="border border-black flex flex-wrap w-full rounded-xl px-2 py-3 mt-2 mb-12">
                        {engagement.pendingSpeakers.map((speaker, index) => (
                            <div key={index} className="m-1">
                                <PendingSpeakerCard
                                    speaker={speaker}
                                    isAdminMode={true}
                                    onDelete={() => deleteSpeaker(speaker)}
                                    onConfirm={() => confifmSpeaker(speaker)}
                                />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <div>
                <div className="flex flex-row justify-end">
                    <button
                        className="bg-[#7481D6] px-7 py-1 rounded-full text-black border border-black text-med font-sans font-medium mt-10 mb-5 mr-5 flex items-center"
                        onClick={saveChanges}>
                        Save
                    </button>
                </div>
            </div>

            {
                confirmedSpeakersEmailPopupVisible && (
                    <EmailSpeakers
                        users={engagement.confirmedSpeakers}
                        onClose={() => setConfirmedSpeakersEmailPopupVisible(false)}
                    />)
            }
            {
                pendingSpeakersEmailPopupVisible && (
                    <EmailSpeakers
                        users={engagement.pendingSpeakers}
                        onClose={() => setPendingSpeakersEmailPopupVisible(false)}
                    />)
            }

        </div>
    );
}