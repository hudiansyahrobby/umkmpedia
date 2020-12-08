import React from 'react';
import { IconContext } from 'react-icons';

export default function UserCard({ data, icon, title, mainColor, bgColor, textColor }) {
  return (
    <IconContext.Provider
      value={{
        className: `mr-2 ${bgColor} ${mainColor} rounded-lg`,
        style: { padding: '6px' },
        size: '2rem',
      }}
    >
      <div className={`flex items-center ${textColor} p-4 rounded-md`}>
        {icon}
        <span className={`${mainColor} font-semibold`}>
          {data?.length} {title}
        </span>
      </div>
    </IconContext.Provider>
  );
}
