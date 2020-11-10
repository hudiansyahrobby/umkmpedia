import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductAdminButton({ onDelete, id }) {
  return (
    <div className='flex justify-between'>
      <button
        onClick={() => onDelete(id)}
        className='bg-red-600 text-center py-2 text-white w-full font-semibold tracking-wide hover:bg-red-800 transition duration-300 ease-in-out'
      >
        Hapus
      </button>

      <Link
        to={`/admin/edit-produk/${id}`}
        className='bg-yellow-dark text-center py-2 text-black w-full font-semibold tracking-wide hover:bg-yellow-600 transition duration-300 ease-in-out'
      >
        EDIT
      </Link>
    </div>
  );
}
