'use client'

import React, { Dispatch, SetStateAction } from 'react'
import EngagementCard from "./EngagementCard";
import { EngagementWithSpeakers } from "@/lib/types";
import { User } from '@prisma/client';

export default function ListView({ user, engagements, setEngagements, currentDate }: { user: User, engagements: EngagementWithSpeakers[], setEngagements: Dispatch<SetStateAction<EngagementWithSpeakers[]>>, currentDate: Date }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {engagements.map(engagement => {
                const setEngagement = (engagement: EngagementWithSpeakers) => {
                    setEngagements(engagements => {
                        const index = engagements.findIndex(e => e.id === engagement.id);
                        if (index === -1) {
                            return engagements;
                        }
                        const newEngagements = [...engagements];
                        newEngagements[index] = engagement;
                        return newEngagements;
                    });
                }
                return (
                new Date(engagement.start).getMonth() === currentDate.getMonth() &&
                <EngagementCard 
                    user={user}
                    key={engagement.id} 
                    engagement={engagement} 
                    setEngagement={setEngagement}
                />
            )})}
            {engagements.filter(engagement => new Date(engagement.start).getMonth() === currentDate.getMonth()).length === 0 && (
                <div className="text-center w-full text-xl col-span-4">
                    <p>No events in this month</p>
                </div>
            )}
        </div>
    )
}