import React from 'react';
import Avatar from '@/components/Avatar';
import { TimeDateEngage } from '@/components/TimeDateEngage'

interface Props {

    location: string
    startTime: string
    endTime: string
    date: string
    image: string
    full: boolean
}


export function EngagementCard({ image, location, date, startTime, endTime, full }: Props) {
    return (
        <div className="bg-white border-black px-4 py-2 border-2" style={{ borderRadius: '15px', display: 'flex', alignItems: 'center' }}>

            <span style={{ marginLeft: '10px', marginRight: 'auto' }}>
                <p>{location}</p>
                <TimeDateEngage date={date} startTime={startTime} endTime={endTime} />
            </span>

            {full && (
                <div className="mx-4 w-20 text-center py-1 border rounded-full bg-purple-800 text-white">
                    FULL
                </div>
            )}

            <div className="flex -space-x-2">
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1531927557220-a9e23c1e4794?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" alt="Image Description" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80" alt="Image Description" />
                <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1541101767792-f9b2b1c4f127?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&&auto=format&fit=facearea&facepad=3&w=300&h=300&q=80" alt="Image Description" />
            </div>

            <div style={{ marginLeft: '20px', marginRight: '0%', width: '100px', textAlign: 'center', padding: '5px', border: '1px solid black', borderRadius: '20px', backgroundColor: 'white' }}>
                View Event
            </div>
        </div>
    );
}