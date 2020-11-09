import React from 'react';
import { IconContext } from 'react-icons';
export default function AdminCard({ icon, color, title, number }) {
  return (
    <div className='rounded-lg flex justify-between items-center bg-orange-300 p-4'>
      <div>
        <h2 className='text-2xl font-bold text-gray-900'>{number}</h2>
        <p className='text-sm  text-gray-900'>{title}</p>
      </div>
      <div>
        <IconContext.Provider value={{ size: '2.3rem', className: color }}>
          {icon}
        </IconContext.Provider>
      </div>
    </div>
  );
}
