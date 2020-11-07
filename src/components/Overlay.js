import React from 'react';

export default function overlay({ onOpen }) {
  return (
    <div
      style={{ background: 'rgba(0,0,0,0.6)' }}
      id='overlay'
      className='fixed z-30 inset-0 transition duration-300'
      onClick={onOpen}
    ></div>
  );
}
