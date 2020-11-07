import React from 'react';
import Tab from './Tab';

export default function Tabs({ data, onClick, onAll }) {
  return (
    <div className='mt-6 overflow-x-auto h-10 whitespace-no-wrap hide-scroll scrolling-touch'>
      <span
        className='mr-4 text-black border-b-4 border-red-hell pb-2 font-bold tracking-wider cursor-pointer'
        onClick={onAll}
      >
        All
      </span>
      {data?.map(({ _id, name }) => (
        <Tab key={_id} name={name} onClick={onClick} id={_id} />
      ))}
    </div>
  );
}
