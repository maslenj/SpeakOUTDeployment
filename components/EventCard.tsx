'use client'
import React, { ReactNode } from 'react'
import { TimeDate } from '@/components/TimeDate'
import { InPersonVirtual } from '@/components/InPerson'
import Button from '@/components/Button'
import Typography from '@/components/Typography'
import { IoMdTime } from "react-icons/io";
import { FaRegDotCircle } from "react-icons/fa";
import { dateToAMPM } from '@/lib/utils'

interface props {
    title: string
    start: string
    end: string
    status: string
    image: string
}

export function EventCard({ title, start, end, status, image }: props) {
    const startObj = new Date(start)
    const endObj = new Date(end)
    const startTime = dateToAMPM(startObj)
    const endTime = dateToAMPM(endObj)
    const date = startObj.toLocaleDateString()
    
    return (
        <span className="bg-white border-[#172554] border-2 rounded-lg p-3 text-left flex flex-col">
            <img style={{ height: 140, width: "100%" }} src={'/images/' + image} alt="Krusty" className="mb-2 rounded-lg mx-auto" />
            <div> <Typography variant="h3">{title}</Typography></div>
            <div className="flex flex-row items-center">
                <IoMdTime className="pr-1" />
                <TimeDate startTime={startTime} endTime={endTime} date={date} />
            </div>
            <div className="flex flex-row items-center mb-1">
                <FaRegDotCircle className="pr-1" />
                <InPersonVirtual status={status} />
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Button variant="secondary" onClick={() => alert("here are the details of ur event")}>Details</Button>
                <Button variant="secondary" onClick={() => alert("are u available")}>I&apos;m Available</Button>
            </div>
        </span>
    );
}