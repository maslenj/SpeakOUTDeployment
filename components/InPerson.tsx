'use client'

interface props {
        status: string
        // endTime: string
        // date: string
    }
    

export function InPersonVirtual ({status} : props) {
return (
    <span className="bg-white py-1 rounded-full">{status} </span>
);
}