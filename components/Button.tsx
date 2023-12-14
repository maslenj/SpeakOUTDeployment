import React, { ReactNode } from 'react';

interface Props {
  variant?: "primary" | "secondary";
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button({ variant = "primary", onClick, children, disabled = false, type }: Props) {
  const inputVariants = {
    "enabled":
    {
      'primary': 'bg-[#7481D6] rounded-full px-12 py-2 text-white hover:bg-indigo-300 hover: active:bg-indigo-400',
      'secondary': 'text-[#11173D] border-[#11173D] border-[1px] border-solid rounded-full px-4 py-1 text-black hover:bg-gray-300 active:bg-gray-200 bg-[#EBEEFF]',
    },
    "disabled":
    {
      'primary': 'rounded-full px-4 py-1 text-black hover:bg-gray-300 active:bg-gray-200',
      'secondary': '',
    }
  }
  return (
    <button className={`${inputVariants[disabled? "disabled" : "enabled"][variant]}`} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
