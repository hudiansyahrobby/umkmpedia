import React from 'react';
import Skeleton from 'react-loading-skeleton';

export default function CartSkeleton() {
  return (
    <div className='mt-8 py-6 bg-red-lightest rounded-mammoth px-2'>
      {[1, 2, 3, 4].map((_, index) => (
        <div className='mb-2 flex items-center p-4 rounded-lg' key={index}>
          <div className='rounded-lg'>
            <Skeleton height={120} width={150} />
          </div>
          <div className='w-full ml-4'>
            <Skeleton height={30} className='mt-3' />
            <Skeleton height={30} className='mt-3' />
            <Skeleton height={30} className='mt-3' />
          </div>
        </div>
      ))}
    </div>
  );
}
