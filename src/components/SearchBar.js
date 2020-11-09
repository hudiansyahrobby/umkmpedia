import React from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ onSearch, onSubmit, value }) {
  return (
    <form onSubmit={onSubmit} className='mt-4 flex justify-center'>
      <div className='bg-primary py-2 px-3 flex justify-between items-center w-full rounded-md'>
        <input
          type='text'
          className='bg-transparent focus:outline-none tracking-wider w-full placeholder-gray-900'
          placeholder='Search Products...'
          value={value}
          onChange={onSearch}
        />
        <button type='submit'>
          <FaSearch />
        </button>
      </div>
    </form>
  );
}
