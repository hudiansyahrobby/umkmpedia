import React from 'react';

export default function ProductDetailInfo({ description }) {
  return (
    <div className='mt-4'>
      <h3 className='text-base font-bold'>Informasi Barang</h3>
      <p className='mt-2 text-xs leading-6 text-gray-darkest'>{description}</p>
    </div>
  );
}
