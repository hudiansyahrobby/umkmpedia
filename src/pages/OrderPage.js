import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Title from '../components/Title';
import { GiFrayedArrow } from 'react-icons/gi';
import { IconContext } from 'react-icons';
import Button from '../components/Buttons/Button';
import { useDispatch, useSelector } from 'react-redux';
import { getCity, getProvince } from '../actions/orderActions';

export default function OrderPage() {
  const { totalPrice, loading, provinces, cities } = useSelector((state) => state.order);
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProvince());
  }, [dispatch]);

  useEffect(() => {
    console.log('terpanggil');
    dispatch(getCity(province));
  }, [dispatch, province]);

  return (
    <Layout>
      <div className='mt-24 mx-4'>
        <Title margin='mx-auto' align='text-center'>
          Order
        </Title>
        <h2 className='mt-4 font-semibold'>Barang Pesanan</h2>
        <ul className='mt-4'>
          <li className='text-sm text-gray-700 mt-3'>
            <IconContext.Provider
              value={{ className: 'text-primary inline-block mr-2', size: '1.6rem' }}
            >
              <span>
                <GiFrayedArrow />
              </span>
            </IconContext.Provider>
            <span className='font-semibold'>Kopi Expresso 2 kg</span>
          </li>
          <li className='text-sm text-gray-700 mt-3'>
            <IconContext.Provider
              value={{ className: 'text-primary inline-block mr-2', size: '1.6rem' }}
            >
              <span>
                <GiFrayedArrow />
              </span>
            </IconContext.Provider>
            <span className='font-semibold'>Sepatu 5 buah</span>
          </li>
        </ul>

        <h2 className='mt-8 text-center font-semibold'>Alamat Tujuan</h2>

        <div className='mb-4 w-full'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='provinsi'>
            Provinsi
          </label>
          <div className='relative'>
            <select
              name='provinsi'
              id='provinsi'
              onChange={(e) => setProvince(e.target.value)}
              className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
            >
              <option>Pilih Provinsi Tujuan Pengiriman</option>
              {provinces?.map(({ province_id, province }) => {
                return (
                  <option key={province_id} value={province_id}>
                    {province}
                  </option>
                );
              })}
            </select>

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

          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='provinsi'>
            Kota/Kabupaten
          </label>
          <div className='relative'>
            <select
              name='provinsi'
              id='provinsi'
              onChange={(e) => setCity(e.target.value)}
              className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
            >
              <option>Pilih Kota/Kabupaten Tujuan Pengiriman</option>
              {cities?.map(({ city_id, city_name }) => {
                console.log('summon');
                return (
                  <option key={city_id} value={city_id}>
                    {city_name}
                  </option>
                );
              })}
            </select>

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
          <Button
            background='bg-primary hover:bg-orange-400'
            variant='font-bold transition duration-300 mx-auto'
            size='extraBig'
            type='submit'
          >
            Pesan Sekarang
          </Button>
        </div>
      </div>
    </Layout>
  );
}
