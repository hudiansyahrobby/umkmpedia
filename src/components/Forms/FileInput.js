import React from 'react';
import InputLabel from './InputLabel';
import { IoMdClose } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { generatePublicPath } from '../../utils/generatePublicPath';

export default function FileInput({ id, label, onChange, onDelete, name, accept, image }) {
  return (
    <>
      <InputLabel id={id} label={label} />
      <div className='relative w-64 h-48 mx-auto'>
        <div className='mb-4 w-full'>
          <div className='flex items-center bg-grey-lighter'>
            <label
              className='w-full h-48 flex flex-col justify-center items-center px-4 py-6 bg-white text-info rounded-lg shadow-lg tracking-wide uppercase border border-info cursor-pointer transition duration-300 hover:bg-primary'
              onChange={onChange}
            >
              <svg
                className='w-8 h-8'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z' />
              </svg>
              <span className='mt-2 text-base leading-normal'>Pilih Gambar</span>
              <input type='file' className='hidden' name={name} accept={accept} />
            </label>
          </div>
        </div>

        {image && (
          <>
            <img
              src={generatePublicPath(image)}
              alt='preview'
              className='w-64 h-48 rounded-lg absolute inset-0'
            />
            {/* <img
              src={URL.createObjectURL(image)}
              alt='preview'
              className='w-64 h-48 rounded-lg absolute inset-0'
            /> */}
            <IconContext.Provider
              value={{
                color: 'text-white',
                size: '1.2rem',
                className: 'absolute top-0 right-0 mt-2 mr-2',
              }}
            >
              <button onClick={onDelete}>
                <IoMdClose />
              </button>
            </IconContext.Provider>
          </>
        )}
      </div>
    </>
  );
}
