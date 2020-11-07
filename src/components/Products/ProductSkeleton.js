import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function ProductSkeleton() {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12'>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
        <div
          className='rounded-mammoth overflow-hidden bg-white shadow-lg flex flex-col justify-between'
          key={index}
        >
          <SkeletonTheme color='#ddd' highlightColor='#ccc'>
            <p>
              <Skeleton height={150} />
            </p>
            <p className='mx-4 pt-3 pb-6'>
              <Skeleton count={3} height={20} className='mt-3' />
            </p>
          </SkeletonTheme>
        </div>
      ))}
    </div>
  );
}
