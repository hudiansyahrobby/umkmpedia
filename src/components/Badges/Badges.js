import React from 'react';
import Badge from './Badge';

export default function Badges({ badgeData }) {
  return (
    <div className='mt-5 flex'>
      {badgeData.map(({ data }, index) => {
        return <Badge key={index} data={data} />;
      })}
    </div>
  );
}
