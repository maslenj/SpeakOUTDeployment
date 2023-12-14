import React, { useState, ReactNode } from 'react';

interface props {
    variant?: "h1" | "h2" | "h3" | "h4" | "p1" | "p2" | "b1" | "b2"
    //color?: "primary" | "darker" | "text" | "secondary" | "gradient" | "tertiary1" | "tertiary2" | "tertiary3" | "gray1" | "gray2" | "gray2"
    children: ReactNode
}



export default function Typography({ variant="h1", color, children } : props) {
  let classes = ""
  if (variant == "h1") {
    classes = "text-[40px] font-serif text-[#1E2A78]"
  }
  else if (variant == "h2") {
    classes = "text-[30px] font-serif"
  }
  else if (variant == "h3") {
    classes = "text-[24px] font-inter"
  }
  else if (variant == "h4") {
    classes = "text-[20px] font-inter"
  }
  else if (variant == "p1") {
    classes = "text-[16px] font-inter"
  }
  else if (variant == "p2") {
    classes = "text-[12px] font-inter"
  }
  else if (variant == "b1") {
    classes = "text-[16px] font-inter font-bold"
  }
  else if (variant == "b2") {
    classes = "text-[14px] font-inter"
  }

  //trying to implement adding color styling
  // if (color == "primary") {
  //   classes += "color-#[1E2A78]"
  // }

  // if (color) {
  //   classes += ` color-${color}`; // Assuming color classes are defined
  // }

 

  return (
    <h1 className={classes}>
      {children}
    </h1>
  );
};


