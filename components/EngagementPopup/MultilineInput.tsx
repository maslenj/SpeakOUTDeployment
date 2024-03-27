import React from 'react';

import { cn } from '@/lib/utils'

export interface InputProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    error?: string
}

const base_classes = "text-[#380D5A] font-medium font-serif text-[20px] w-full border border-black rounded-xl px-2 py-1 focus:outline-none focus:border-[#7481D6]"
const error_classes = "text-[#380D5A] border-2 border-red-500 font-medium font-serif text-[20px] w-full  rounded-xl px-2 py-1 focus:outline-none focus:border-[#7481D6]"

const MultilineInput = React.forwardRef<HTMLTextAreaElement, InputProps>(
    ({ error, className, ...props }, _) => {
        return (
            <>
                <textarea
                    className={cn(error? error_classes : base_classes, className)}
                    {...props}
                />
                {error && <span className="text-red-500"> {error} </span>}
            </>
        );
    });
MultilineInput.displayName = 'Input'

export { MultilineInput }