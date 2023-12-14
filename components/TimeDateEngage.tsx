import React from 'react';
import ClockIcon from '@/components/icons/ClockIcon'

interface Props {
    startTime: string
    endTime: string
    date: string
}

export function TimeDateEngage({ startTime, endTime, date }: Props) {

    const getDayOfWeek = (): string => {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dateobj = new Date(date);
        const dayIndex = dateobj.getDay();
        return daysOfWeek[dayIndex];
    };
    const dayOfWeek = getDayOfWeek();

    return (
        <div className="bg-white border-black py-1 rounded-lg text-xs flex items-center">
            <span className='mr-2'> <ClockIcon /> </span>
            <span> {dayOfWeek} {date} {startTime} {endTime} </span>
        </div>
    );
};