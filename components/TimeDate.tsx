'use client'

interface props {
        startTime: string
        endTime: string
        date: string
    }
    

export function TimeDate ({startTime, endTime, date} : props) {
return (
    <span className="bg-white py-1 rounded-full">{startTime}-{endTime}, {date}</span>

);
}