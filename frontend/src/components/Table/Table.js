import React from 'react';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

export default function Table({ header, row }) {
  return (
    <div className='mt-8 flex flex-col'>
      <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
            <table className='min-w-full divide-y divide-gray-200'>
              <TableHeader header={header} />
              <TableBody row={row} />
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
