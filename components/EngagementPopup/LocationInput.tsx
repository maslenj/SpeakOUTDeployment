import React from 'react';

import { cn } from '@/lib/utils'
import { GoLocation } from 'react-icons/go';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string
}

const base_classes = "border border-black mb-2 rounded-xl px-2 py-1 focus:outline-none focus:border-[#7481D6] flex flex-row"
const error_classes = "border-2 border-red-500 mb-2 rounded-xl px-2 py-1 focus:outline-none focus:border-[#7481D6] flex flex-row"

const LocationInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ error, className, ...props }, _) => {
        return (
            <div>
                <span className={error? error_classes : base_classes}>
                    <GoLocation className="pr-1 text-xl" />
                    <input
                        {...props}
                        className="w-full pl-1 pr-1"
                    />
                </span>
                {error && <span className="text-red-500"> {error} </span>}
            </div>


        );
    });
LocationInput.displayName = 'Input'

export { LocationInput }