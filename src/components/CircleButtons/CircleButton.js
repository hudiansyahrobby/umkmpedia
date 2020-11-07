import React from 'react';

const CircleButton = ({ icon, background, border, data }) => {
  let style;
  if (border) {
    style = `border ${border}`;
  } else {
    style = `${background}`;
  }

  return (
    <div className='mr-2'>
      <button
        className={`rounded-full h-10 w-10 flex justify-center items-center ${style} font-bold overflow-hidden`}
      >
        {icon && icon}
        {data && data}
      </button>
    </div>
  );
};

export default CircleButton;
