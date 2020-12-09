import React from 'react';
import Layout from '../components/Layout';

import Image from '../assets/images/404.svg';
import Title from '../components/Title';

export default function NotFound() {
  return (
    <Layout>
      <div className='mt-24 max-w-screen-xl'>
        <Title margin='mx-auto' align='text-center'>
          Halaman Tidak Ditemukan
        </Title>
        <div className='my-4 px-8 sm:my-16 sm:px-16 h-64'>
          <img src={Image} alt='404 Not Found' className='w-full h-full' />
        </div>
      </div>
    </Layout>
  );
}
