import React from "react"
import { cn } from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    error?: boolean
}

const TextArea = React.forwardRef<HTMLTextAreaElement, InputProps>(({ className, error, ...props }, ref) => {
    const inputVariants = {
        "valid": 'mt-1 py-2 px-3 block w-full border border-indigo-950 rounded-md shadow-sm focus:outline-none focus:border-indigo-950 focus:ring focus:ring-blue-200 transition duration-200 placeholder-[#1E2A78] text-base overflow-y-auto text-med font-inter text-slate-950 min-h-[100px]',
        "error": 'mt-1 py-2 px-3 block w-full border-2 border-red-500 rounded-md shadow-sm focus:outline-none focus:border-indigo-950 focus:ring focus:ring-blue-200 transition duration-200 placeholder-[#1E2A78] text-base overflow-y-auto text-med font-inter text-slate-950 min-h-[100px]',
    }

    return (
        <>
            <textarea
                className={cn(inputVariants[error ? "error" : "valid"], className)}
                {...props}
            />
            {error &&
                <div className="text-red-500"> *This field is required. </div>
            }
        </>

    )
})

export { TextArea }