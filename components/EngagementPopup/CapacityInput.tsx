import React from 'react';

import { IoPeopleSharp } from 'react-icons/io5';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
}

const CapacityInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, _) => {
        return (
            <span className="border border-black rounded-xl mb-2 px-2 py-1 focus:outline-none focus:border-[#7481D6] flex flex-row">
                <IoPeopleSharp />
                <input className="ml-2 w-[30px]" type="number" {...props} />
            </span>
        );
    });
CapacityInput.displayName = 'Input'

export { CapacityInput }