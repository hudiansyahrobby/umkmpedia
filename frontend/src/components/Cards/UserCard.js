import React from 'react';
import { IconContext } from 'react-icons';

export default function UserCard({ data, icon, title, color }) {
  return (
    <IconContext.Provider
      value={{
        className: `mr-2 bg-${color}-500 text-${color}-700 rounded-lg`,
        style: { padding: '6px' },
        size: '2rem',
      }}
    >
      <div className={`flex items-center bg-${color}-300 p-4 rounded-md`}>
        {icon}
        <span className={`text-${color}-700 font-semibold`}>
          {data?.length} {title}
        </span>
      </div>
    </IconContext.Provider>
  );
}
