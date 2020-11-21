import React from 'react';

export default function InputLabel({ id, label }) {
  return (
    <label className='block text-gray-700 text-sm font-bold my-2' htmlFor={id}>
      {label}
    </label>
  );
}
