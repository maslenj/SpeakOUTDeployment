"use client"

import { EngagementCard } from "./EngagmentCard";
import Typography from '@/components/Typography'
import { useState } from "react";
import { EngagementWithSpeakers, UserNoPassword } from "@/lib/types";
import { Engagement } from "@prisma/client";

export default function HomeView({ user, engagementsData } : { user: UserNoPassword, engagementsData: (EngagementWithSpeakers | Engagement)[] }) {
    const [engagements, setEngagements] = useState<(EngagementWithSpeakers | Engagement)[]>(engagementsData);

    return (
        <div className="w-full ml-20">
            <div className="mb-2 mt-5"> <Typography variant="h1" > Welcome, {user?.firstname}! </Typography> </div>
            <div className="my-4"><Typography variant="h2" > Upcoming Engagements</Typography></div>
            <div className="grid grid-cols-1 gap-4">
                {
                    engagements.map((engagement) => {
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
                            <div key={engagement.id} className="w-[80%]">
                                <EngagementCard 
                                    engagement={engagement} 
                                    setEngagement={setEngagement} 
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}