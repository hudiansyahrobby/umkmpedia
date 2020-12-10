import React from 'react';
import { Link } from 'react-router-dom';
import HeroImage from '../assets/images/hero.jpg';

function Hero() {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient( to bottom, #05000000 , #000000), url(${HeroImage})`,
        minHeight: '600px',
        maxHeight: '800px',
      }}
      className='h-screen bg-cover bg-center flex items-center justify-center flex-col -mx-4'
    >
      <h1 className='text-white text-5xl font-bold tracking-wide'>
        UMKM
        <span className='text-primary'>Pedia</span>
      </h1>
      <p className='w-56 mt-2 text-base tracking-wide text-white text-center'>
        Tempat Jual Beli Dagang Produk UMKM Online
      </p>
      <div className='mt-5'>
        <Link
          to='/produk'
          className='text-sm py-2 px-3 tracking-widest uppercase bg-primary text-black rounded-md border-2 border-primary hover:bg-white transition duration-300 ease-in-out font-semibold'
        >
          Lihat Daftar Produk
        </Link>
      </div>
    </div>
  );
}

export default Hero;
