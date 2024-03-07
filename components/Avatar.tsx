import React from 'react';

interface Props {
  image: string;
}

const Avatar: React.FC<Props> = ({ image }) => {
  return (
    <div className="w-[60px] h-[60px] border-2 border-black rounded-full overflow-hidden inline-block">
        <img src={image} alt="Profile" className="h-full w-full" />
    </div>
  );
};

export default Avatar;
