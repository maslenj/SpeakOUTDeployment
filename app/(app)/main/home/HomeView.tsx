"use client"

import { EngagementCard } from "./EngagmentCard";
import Typography from '@/components/Typography'
import { useState } from "react";
import { EngagementWithSpeakers, UserNoPassword } from "@/lib/types";
import { Engagement, Notification, Role } from "@prisma/client";
import { NotificationCard } from "@/components/NotificationCard";
import Button from "@/components/Button";
import AdminEngagementCreate from "@/components/EngagementPopup/AdminEngagementCreate";
import { FaPlusCircle } from "react-icons/fa";

export default function HomeView({ user, engagementsData, notificationData }: { user: UserNoPassword, engagementsData: (EngagementWithSpeakers | Engagement)[], notificationData: Notification[] }) {
    const [engagements, setEngagements] = useState<(EngagementWithSpeakers | Engagement)[]>(engagementsData);
    const [notifications, setNotifications] = useState<Notification[]>(notificationData)
    const [showCreateEvent, setShowCreateEvent] = useState(false)

    const clearNotification = async (id: number) => {
        const res = await fetch(`/api/notifications?id=${id}`, {
            method: 'DELETE',
        })
        if (res.ok) {
            const data = await res.json()
            const deletedNotification = data.deletedNotification
            setNotifications(notifications => notifications.filter(n => n.id !== deletedNotification.id))
        }
    }

    return (
        <div className="w-full lg:w-[80%] lg:px-20 px-10 h-full">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div className="mb-2 mt-5"> <Typography variant="h1" > Welcome, {user?.firstname}! </Typography> </div>
            {
                user.role == Role.ADMIN ?
                <span className="mt-4"><Button variant="primary" onClick={() => setShowCreateEvent(true)}> New Event <FaPlusCircle className="inline" /> </Button></span>
                    :
                <span></span>
            }
            </div>
            <div className="my-4"><Typography variant="h2" > Upcoming Engagements</Typography></div>
            {
                showCreateEvent &&
                <AdminEngagementCreate onClose={() => setShowCreateEvent(false)} setEngagements={setEngagements} />
            }


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
                            <div key={engagement.id}>
                                <EngagementCard
                                    engagement={engagement}
                                    setEngagement={setEngagement}
                                />
                            </div>
                        )
                    })
                }
                {
                    engagements.length === 0 &&
                    <div>
                        <Typography variant="p1">No upcoming engagements</Typography>
                    </div>
                }
            </div>
            <div className="my-4"><Typography variant="h2" > Notifications</Typography></div>
            <div className="grid grid-cols-1 gap-4 mb-8">
                {notifications.map((notification) => (
                    <div key={notification.id}>
                        <NotificationCard 
                            notification={notification} 
                            clearNotification={() => clearNotification(notification.id)}
                        />
                    </div>
                ))}
                {
                    notifications.length === 0 &&
                    <div>
                        <Typography variant="p1">No notifications</Typography>
                    </div>
                }
            </div>
        </div>
    )
}