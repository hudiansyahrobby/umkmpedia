import React from 'react';

export default function TableHeader({ header }) {
  return (
    <thead>
      <tr>
        {header.map(({ title }) => {
          return (
            <th
              scope='col'
              className='px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
            >
              {title}
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
