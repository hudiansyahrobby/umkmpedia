import { ErrorMessage, Field } from 'formik';
import React from 'react';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';

export default function Input({
  label,
  id,
  placeholder,
  type,
  as,
  onChange,
  data,
  option,
  value,
  name,
  accept,
}) {
  if (as === 'select') {
    let options;
    switch (id) {
      case 'brand':
        options = data?.map(({ _id, name }) => (
          <option key={_id} value={_id}>
            {capitalizeFirstLetter(name)}
          </option>
        ));
        break;
      default:
        break;
    }
    return (
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={id}>
          {label}
        </label>
        <div className='relative'>
          <Field
            name={name}
            as='select'
            className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
          >
            <option>{option}</option>

            {options}
          </Field>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <svg
              className='fill-current h-4 w-4'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
            >
              <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
            </svg>
          </div>
        </div>
        <p className='mt-2 text-red-hell'>
          <ErrorMessage name={name} />
        </p>
      </div>
    );
  } else if (as === 'textarea') {
    return (
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={id}>
          {label}
        </label>
        <Field
          id={id}
          name={name}
          component='textarea'
          placeholder={placeholder}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline h-48'
        ></Field>
        <p className='mt-2 text-red-hell'>
          <ErrorMessage name={name} />
        </p>
      </div>
    );
  } else if (as === 'file') {
    return (
      <div className='mb-4 w-full'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={id}>
          {label}
        </label>

        <div className='flex items-center bg-grey-lighter'>
          <label
            className='w-full flex flex-col items-center px-4 py-6 bg-white text-info rounded-lg shadow-lg tracking-wide uppercase border border-info cursor-pointer hover:bg-info hover:text-gray-200'
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
    );
  } else {
    return (
      <div className='mb-4'>
        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor={id}>
          {label}
        </label>
        <Field
          className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
        />
        <p className='mt-2 text-red-hell'>
          <ErrorMessage name={name} />
        </p>
      </div>
    );
  }
}
