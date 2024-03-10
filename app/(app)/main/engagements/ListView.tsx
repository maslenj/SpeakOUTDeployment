'use client'

import React, { Dispatch, SetStateAction } from 'react'
import EngagementCard from "./EngagementCard";
import { EngagementWithSpeakers } from "@/lib/types";
import { Engagement } from '@prisma/client';

export default function ListView({ engagements, setEngagements, currentDate }: { engagements: (EngagementWithSpeakers | Engagement)[], setEngagements: Dispatch<SetStateAction<(EngagementWithSpeakers | Engagement)[]>>, currentDate: Date }) {
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