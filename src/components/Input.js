import { ErrorMessage, Field } from 'formik';
import React from 'react';
import InputLabel from './Forms/InputLabel';
export default function Input({ label, id, placeholder, type, name }) {
  return (
    <div className='mb-4'>
      <InputLabel id={id} label={label} />

      <Field
        className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      <p className='mt-2 text-red-600 text-sm'>
        <ErrorMessage name={name} />
      </p>
    </div>
  );
}
