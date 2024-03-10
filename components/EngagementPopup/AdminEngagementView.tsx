'use client'

import Typography from '@/components/Typography';
import { IoMdTime } from "react-icons/io";
import { FaRegDotCircle } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import SpeakerCard from './SpeakerCardEventDetails';
import IdentityTag from '../IdentityTag';
import { EngagementWithSpeakers } from '@/lib/types';
import { dateToAMPM } from '@/lib/utils';
import { MdOutlineEditNote } from 'react-icons/md';
import { IoPeopleSharp } from 'react-icons/io5';

export function AdminEngagementView({ engagement, toggleEditMode }: { engagement: EngagementWithSpeakers, toggleEditMode: () => void }) {
    return (
        <div>
            <span className="text-[#380D5A] font-medium"> <Typography variant="h2">{engagement.title}</Typography></span>

            <div className="flex flex-row items-center mb-2 text-sm font-sans text-[#11173D] space-x-2" >
                <span className="flex flex-row">
                    <GoLocation className="pr-1 text-xl" />
                    {engagement.location}
                </span>

                <span className="flex flex-row">
                    <IoMdTime className="pr-1 text-xl" />
                    {dateToAMPM(new Date(engagement.start))} - {dateToAMPM(new Date(engagement.end))}
                </span>
                <span className="flex items-center">
                    <FaRegDotCircle className="pr-1 text-xl" />
                    {engagement.status}
                </span>
                <span className="flex items-center">
                    <IoPeopleSharp className="pr-1 text-xl" />
                    {engagement.capacity}
                </span>
            </div>
            <div>
                <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-4">Description</span>
            </div>
            <div className="mb-4">
                <Typography variant="p1">{engagement.description}</Typography>
            </div>
            <div>
                <span className="text-[20px] text-[#380D5A] font-serif font-medium mb-4">Identity Tags</span>
            </div>
            <div className="mt-3 mb-3 flex flex-wrap rounded-xl px-2 py-2 focus:outline-none focus:border-[#7481D6]">
                {engagement.tags.map((tag, index) => (
                    <div key={index} className="mr-3">
                        <IdentityTag key={index} label={tag}></IdentityTag>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 lg:gap-2 xs:grid-cols-1">
                <div>
                    <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-3">Speakers ({engagement.confirmedSpeakers.length}/{engagement.capacity}) </span>
                    <div className="mt-2 mb-8 flex flex-wrap">
                        {engagement.confirmedSpeakers.map((speaker, index) => (
                            <div key={index} className="m-1">
                                <SpeakerCard
                                    speaker={speaker}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div>
                        <span className="text-[20px] text-[#380D5A] font-medium font-serif mb-3">Pending Speakers</span>
                    </div>
                    <div className="mt-2 mb-12 flex flex-wrap">
                        {engagement.pendingSpeakers.map((speaker, index) => (
                            <div key={index} className="m-1">
                                <SpeakerCard
                                    speaker={speaker}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <button
                className="absolute bottom-0 right-0 bg-[#F0F0F0] px-7 py-2 rounded-full text-black border border-black text-med font-sans font-medium mt-10 mb-5 mr-5 flex items-center"
                onClick={toggleEditMode}>
                <MdOutlineEditNote className="pr-1" size="25" />
                Edit
            </button>
        </div>
    );
}