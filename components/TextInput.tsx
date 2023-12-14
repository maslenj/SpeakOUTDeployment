import React, { useState, ChangeEvent } from 'react';
import EmailIcon from './icons/Email';
import KeyIcon from './icons/Key'
import PasswordIcon from './icons/Password'

import { cn } from '@/lib/utils'

const renderIcon = (label?: string) => {
  const twClass = 'absolute top-1/2 transform -translate-y-1/2 left-2 text-indigo-950 text-lg '
  if (label === 'email') return <EmailIcon className={twClass} />
  if (label === 'password') return <PasswordIcon className={twClass} />
  if (label === 'key') return <KeyIcon className={twClass} />
  // Add more conditions for other icons if needed
  return null;
};

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { 
    icon?: 'email' | 'password' | 'key'
   }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {renderIcon(icon)}
        <input
          className={cn('w-full pl-10 pr-2 pt-2 pb-2 block w-100% border border-indigo-950 rounded-md shadow-sm focus:outline-none focus:border-indigo-950 focus:ring focus:ring-blue-200 transition duration-200 placeholder-indigo-950 text-base flex-center', className)}
          {...props}
        />
      </div>
    );
  });
  Input.displayName = 'Input'

  export { Input }