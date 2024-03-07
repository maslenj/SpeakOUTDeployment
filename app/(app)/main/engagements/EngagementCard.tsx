"use client"

import Button from '@/components/Button'
import Typography from '@/components/Typography'
import { IoMdTime } from "react-icons/io"
import { FaRegDotCircle } from "react-icons/fa"
import { dateToAMPM } from '@/lib/utils'
import { AdminEngagementPopup } from '@/components/EngagementPopup/AdminEngagementPopup'
import { useState } from 'react'
import { EngagementWithSpeakers } from '@/lib/types'
import { Role, User } from '@prisma/client'
import SpeakerEngagementPopup from '@/components/EngagementPopup/SpeakerEngagementPopup'

export default function EngagementCard({ user, engagement, setEngagement }: { user: User, engagement: EngagementWithSpeakers, setEngagement: (engagement: EngagementWithSpeakers) => void }) {
    const startDate = new Date(engagement.start)
    const endDate = new Date(engagement.end)
    const startTime: string = dateToAMPM(startDate)
    const endTime: string = dateToAMPM(endDate)
    const date = startDate.toLocaleDateString()
    const [showEngagement, setShowEngagment] = useState<boolean>(false);

    return (
        <span className="bg-white border-[#172554] border-2 rounded-lg p-3 text-left flex flex-col">
            <img src={engagement.image} alt="Krusty" className="mb-2 rounded-lg mx-auto w-full h-[140px]" />
            <div> <Typography variant="h3"> {engagement.title} </Typography></div>
            <div className="flex flex-row items-center">
                <IoMdTime className="pr-1" />
                <span className="bg-white py-1 rounded-full">{startTime}-{endTime}, {date}</span>
            </div>
            <div className="flex flex-row items-center mb-1">
                <FaRegDotCircle className="pr-1" />
                <span className="bg-white py-1 rounded-full"> {engagement.status} </span>
            </div>
            <div className="flex flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Button variant="secondary" onClick={() => setShowEngagment(true)}>Details</Button>
            </div>
            {showEngagement &&
                (user.role == "ADMIN" ?
                <AdminEngagementPopup
                    engagement={engagement}
                    setEngagement={setEngagement}
                    onClose={() => { setShowEngagment(false) }}
                />
                :
                <SpeakerEngagementPopup
                    userId={user.id}
                    engagement={engagement}
                    onClose={() => { setShowEngagment(false) }}
                />)
            }
        </span>
    );
}