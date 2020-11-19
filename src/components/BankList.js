import React from 'react';

export default function BankList({ onChange }) {
  return (
    <>
      <div className='mt-4 p-4 border-2 border-primary flex items-center'>
        <input type='radio' name='bank' id='bni' className='mr-4' value='bni' onChange={onChange} />
        <label htmlFor='bni'>
          <h2 className='font-bold'>BNI</h2>
        </label>
      </div>

      <div className='p-4 border-2 border-primary flex items-center'>
        <input
          type='radio'
          name='bank'
          id='mandiri'
          className='mr-4'
          value='mandiri'
          onChange={onChange}
        />
        <label htmlFor='mandiri'>
          <h2 className='font-bold'>Mandiri</h2>
        </label>
      </div>
    </>
  );
}
