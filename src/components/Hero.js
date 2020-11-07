import React from 'react';
import { Link } from 'react-router-dom';
import HeroImage from '../assets/images/shoe-1.png';

function Hero() {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient( to bottom, #05000000 , #000000), url('https://images.unsplash.com/photo-1501946623428-b301146b83af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80')`,
      }}
      className='h-screen bg-cover bg-center flex items-center justify-center flex-col'
    >
      <h1 className='text-white text-5xl font-bold tracking-wide'>
        UMKM<span className='text-red-hell'>Pedia</span>
      </h1>
      <p className='w-56 mt-2 text-base tracking-wide text-white text-center'>
        Tempat Jual Beli Dagang Produk UMKM Online
      </p>
      <div className='mt-5'>
        <Link
          to='/produk'
          className='text-sm py-2 px-3 tracking-widest uppercase bg-red-hell text-white rounded-md border-2 border-red-hell hover:text-red-hell hover:bg-white transition duration-300 ease-in-out font-semibold'
        >
          Lihat Daftar Produk
        </Link>
      </div>
    </div>
  );
}

export default Hero;
