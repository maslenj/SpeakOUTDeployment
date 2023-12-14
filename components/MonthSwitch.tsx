import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

interface Props {
  initialMonth: number;
  initialYear: number;
}

export default function MonthSwitch({ initialMonth, initialYear }: Props) {
  const [month, setMonth] = useState<number>(initialMonth);
  const [year, setYear] = useState<number>(initialYear);

// const handlePrev = () => {
//     setMonth((month) => (month === 0 ? 11 : month - 1));
//     if (month === 11) {
//         setYear((year) => (year - 1));
//     }
// };

// const handleNext = () => {
//     setMonth((month) => (month === 11 ? 0 : month + 1));
//     if (month === 0) {
//         setYear((year) => (year + 1));
//     }
// };

const handlePrev = () => {
    setMonth((month) => {
      if (month === 0) {
        setYear((year) => year - 1);
        return 11;
      }
      return month - 1;
    });
  };

  const handleNext = () => {
    setMonth((month) => {
      if (month === 11) {
        setYear((year) => year + 1);
        return 0;
      }
      return month + 1;
    });
  };

const formattedDate = new Date(year, month).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
});

return (
    <div className="flex items-center justify-center">
        <button className="mx-1 text-blue-900 font-bold" onClick={handlePrev}>
            <AiOutlineArrowLeft />
        </button>

        <div className="mx-1 font-serif text-black text-regular text-3xl">
            {formattedDate}
        </div>
      
        <button className="mx-1 text-blue-900 font-bold" onClick={handleNext}>
            <AiOutlineArrowRight />
        </button>
    </div>
  );
};