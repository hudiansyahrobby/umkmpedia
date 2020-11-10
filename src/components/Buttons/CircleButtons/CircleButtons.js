import React from 'react';
import CircleButton from './CircleButton';

export default function CircleButtons({ color, datas }) {
  return (
    <div className='mt-2 flex items-center'>
      {datas.map((data, index) => {
        return <CircleButton key={index} border={color} data={data} />;
      })}
    </div>
  );
}
