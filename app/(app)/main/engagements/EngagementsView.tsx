"use client"

import React, { useState } from "react";
import ListView from "./ListView";
import MonthSwitch from "@/components/MonthSwitch";
import Button from "@/components/Button";
import ViewSelector, { View } from "./ViewSelector";
import { FaPlusCircle } from "react-icons/fa";
import { EngagementWithSpeakers } from "@/lib/types";
import AdminEngagementCreate from "@/components/EngagementPopup/AdminEngagementCreate";
import { Engagement } from "@prisma/client";
import CalendarView from "./CalendarView";

export default function EngagementsView({ engagemnts }: { engagemnts: (EngagementWithSpeakers | Engagement)[] }) {
    const [view, setView] = useState<View>("List")
    const [engagements, setEngagements] = useState<(EngagementWithSpeakers | Engagement)[]>(engagemnts)
    const [currentDate, setCurrentDate] = useState<Date>(new Date())
    const [showCreateEvent, setShowCreateEvent] = useState(false)

    return (
        <div className="px-20 pt-10">
            <div className="flex justify-between items-center mb-4 ">
                <div className="relative">
                    <ViewSelector view={view} setView={setView} />
                </div>
                <MonthSwitch currentDate={currentDate} setCurrentDate={setCurrentDate} />
                {
                    "confirmedSpeakers" in engagements ?
                    <Button variant="primary" onClick={() => setShowCreateEvent(true)}> New Event <FaPlusCircle className="inline" /> </Button>
                    :
                    <span></span>
                }
            </div>
            {view === "List" ?
                <ListView
                    currentDate={currentDate}
                    engagements={engagements}
                    setEngagements={setEngagements}
                /> :
                <CalendarView
                    currentDate={currentDate}
                    engagements={engagements}
                    setEngagements={setEngagements}
                />
            }
            {
                showCreateEvent &&
                <AdminEngagementCreate onClose={() => setShowCreateEvent(false)} />
            }
        </div>
    );
}