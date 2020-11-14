import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCity, getProvince, updateProfile } from '../actions/userActions';
import Button from '../components/Buttons/Button';
import Layout from '../components/Layout';
import Title from '../components/Title';

export default function AddressPage() {
  const { provinces, cities, user } = useSelector((state) => state.user);
  const [name, setName] = useState(user.name);
  const [telephone, setTelephone] = useState(user.telephone);
  const [fullAddress, setFullAddress] = useState(user.fullAddress);
  const [myCity, setMyCity] = useState('');
  const [myProvince, setMyProvince] = useState('');
  const [city, setCity] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getProvince());
    dispatch(getCity());
  }, [dispatch, user.province]);

  const onChangeProvinceHandler = (e) => {
    const provinceId = e.target.value;
    setMyProvince(provinceId);
    const filteredCity = cities.filter((city) => city.province_id === provinceId);
    setCity(filteredCity);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const updatedProfile = {
      name,
      telephone,
      city: myCity,
      province: myProvince,
      fullAddress,
    };
    dispatch(updateProfile(updatedProfile, history));
  };

  return (
    <Layout>
      <div className='mt-24 mb-4 px-6 w-full'>
        <Title margin='mx-auto' align='text-center'>
          Update Profil
        </Title>
        {provinces.length > 0 && cities.length > 0 && user ? (
          <>
            {console.log(user)}

            <form onSubmit={onSubmitHandler}>
              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='nama'>
                  Nama
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
                  id='nama'
                  name='nama'
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Masukkan Nama'
                />
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='telepon'>
                  No.Telepon
                </label>
                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
                  id='telepon'
                  name='telepon'
                  type='tel'
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  placeholder='Masukkan No.Telepon'
                />
              </div>

              <label className='mt-4 block text-gray-700 text-sm font-bold mb-2' htmlFor='provinsi'>
                Provinsi
              </label>
              <div className='relative'>
                <select
                  name='provinsi'
                  id='provinsi'
                  value={myProvince}
                  onChange={onChangeProvinceHandler}
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

              <label className='mt-4 block text-gray-700 text-sm font-bold mb-2' htmlFor='kota'>
                Kota/Kabupaten
              </label>
              <div className='relative'>
                <select
                  name='kota'
                  id='kota'
                  value={myCity}
                  onChange={(e) => setMyCity(e.target.value)}
                  className='block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                >
                  <option>Pilih Kota/Kabupaten Tujuan Pengiriman</option>
                  {city?.map(({ city_id, city_name }) => {
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

              <label className='mt-4 block text-gray-700 text-sm font-bold mb-2' htmlFor='kota'>
                Alamat Lengkap
              </label>
              <input
                type='text'
                value={fullAddress}
                onChange={(e) => setFullAddress(e.target.value)}
                className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
                placeholder='Masukkan Alamat Lengkap'
              />
              <div className='text-center'>
                <Button
                  background='mt-8 bg-primary hover:bg-orange-400'
                  variant='font-bold transition duration-300 mx-auto'
                  size='extraBig'
                  type='submit'
                >
                  Update Profil
                </Button>
              </div>
            </form>
          </>
        ) : null}
      </div>
    </Layout>
  );
}
