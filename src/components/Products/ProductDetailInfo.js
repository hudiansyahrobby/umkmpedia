import React from 'react';
import DOMPurify from 'dompurify';

export default function ProductDetailInfo({ description }) {
  const createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };
  return (
    <div className='mt-4'>
      <h3 className='text-base font-bold'>Informasi Barang</h3>
      <div
        className='mt-2 text-xs leading-6 text-gray-darkest'
        dangerouslySetInnerHTML={createMarkup(description)}
      ></div>
    </div>
  );
}
