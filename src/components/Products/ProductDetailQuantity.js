import React from 'react';

export default function ProductDetailQuantity({ quantity, unit }) {
  return (
    <div className='mt-4'>
      <h3 className='text-sm font-bold'>Jumlah Barang</h3>
      <p className='text-sm'>
        {quantity} {unit}
      </p>
    </div>
  );
}
