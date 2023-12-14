import React from 'react';


interface props {
    label: string
    handleClose: () => void
}

export default function Tag({ label, handleClose } : props) {
  return (
      <span className="bg-emerald-200 border-green-800 px-2 py-3 border-2 rounded-full">

      <button className="px-2" onClick={() => handleClose()}>
        X
      </button>
      {label}
      </span>
  );
};