"use client"
import React, { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';


interface Props {
  setCurrentDate: any
  currentDate: Date
}

export default function MonthSwitch({ setCurrentDate, currentDate }: Props) {
  const handlePrev = () => {
    setCurrentDate((date : Date) => {
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();

      // Adjust for month and year when month is January
      if (month === 0) {
        month = 11;
        year--;
      } else {
        month--;
      }

      return new Date(year, month, day);
    });
  };

  const handleNext = () => {
    setCurrentDate((date : Date) => {
      let year = date.getFullYear();
      let month = date.getMonth();
      let day = date.getDate();

      // Adjust for month and year when month is December
      if (month === 11) {
        month = 0;
        year++;
      } else {
        month++;
      }

      return new Date(year, month, day);
    });
  };

  const formattedDate = new Date(currentDate).toLocaleDateString('en-US', {
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