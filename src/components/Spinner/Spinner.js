import React from 'react';
import './Spinner.css';
export default function Spinner() {
  return (
    <div className='h-screen w-screen grid place-items-center'>
      <div className='loader'>Loading...</div>
    </div>
  );
}
