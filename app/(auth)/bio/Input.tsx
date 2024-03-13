import React from "react"
import { cn } from '@/lib/utils'

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }, ref) => {
    const inputVariants = {
        "valid": 'w-full py-2 px-3 inline-block border placeholder-[#1E2A78] border-indigo-950 rounded-md shadow-sm focus:outline-none focus:border-indigo-950 focus:ring focus:ring-blue-200 transition duration-200 text-base flex-center',
        "error": 'w-full py-2 px-3 inline-block border-2 placeholder-[#1E2A78] border-red-500 rounded-md shadow-sm focus:outline-none focus:border-indigo-950 focus:ring focus:ring-blue-200 transition duration-200 text-base flex-center',
    }

    return (
        <>
            <input
                className={cn(inputVariants[error ? "error" : "valid"], className)}
                {...props}
            />
            {error &&
                <div className="text-red-500"> *This field is required. </div>
            }
        </>

    )
})

export { Input }