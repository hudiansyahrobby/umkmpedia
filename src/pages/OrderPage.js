/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Title from '../components/Title';
import { GiFrayedArrow } from 'react-icons/gi';
import { HiLocationMarker } from 'react-icons/hi';
import { IconContext } from 'react-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getCost, resetOrder } from '../actions/orderActions';
import { getCity, getProvince } from '../actions/userActions';
import { getCart } from '../actions/cartActions';
import Button from '../components/Buttons/Button';
import { Redirect, useHistory } from 'react-router-dom';

export default function OrderPage() {
  const { couriers } = useSelector((state) => state.order);
  const { carts, totalPrice } = useSelector((state) => state.cart);
  const { user, cities } = useSelector((state) => state.user);
  const [courier, setCourier] = useState('');
  const [courierCost, setCourierCost] = useState(0);
  const [bank, setBank] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const courierList = ['jne', 'pos', 'tiki'];

  const getAllCourierCost = () => {
    if (user.city) {
      const orderData = {
        destination: user.city,
        courier: '',
      };
      courierList.map((courier) => {
        orderData.courier = courier;
        dispatch(getCost(orderData));
      });
    }
  };

  const onPayHandler = () => {
    if (courierCost !== 0) {
      // history.push('/pembayaran');
      alert('Terimakasih Telah Berbelanja');
    }
  };

  useEffect(() => {
    dispatch(getCart());
    dispatch(getCity());
    dispatch(getProvince());
    getAllCourierCost();

    return () => {
      dispatch(resetOrder());
    };
  }, []);

  if (!user.fullAddress || !user.city || !user.province || !user.telephone) {
    return <Redirect to='/profil/update' />;
  }
  const addressName = cities?.map((city, index) => {
    if (city.city_id === user.city) {
      return (
        <React.Fragment key={index}>
          <IconContext.Provider
            value={{ className: 'text-primary inline-block mr-2', size: '1.6rem' }}
          >
            <span>
              <HiLocationMarker />
            </span>
          </IconContext.Provider>
          <h2 className='font-semibold text-sm'>
            {user.fullAddress}, {city.type} {city.city_name} , Provinsi {city.province}, Kode Pos{' '}
            {city.postal_code}{' '}
          </h2>
        </React.Fragment>
      );
    }
  });

  const allCouriers = couriers?.map((_courier) => {
    return (
      <React.Fragment key={_courier.code}>
        <button
          className='block w-full bg-primary p-4 mt-4'
          onClick={() => setCourier(_courier.code)}
        >
          {_courier.name}
        </button>
        {_courier.code === courier && (
          <div className='bg-orange-200 mx-2'>
            {_courier.costs.map((service) => {
              return (
                <React.Fragment key={service.service}>
                  <div className='p-4 border-2 border-primary flex items-center'>
                    <input
                      type='radio'
                      name='kurir'
                      id={service.service}
                      className='mr-4'
                      value={service.cost[0].value}
                      onChange={(e) => setCourierCost(e.target.value)}
                    />
                    <label htmlFor={service.service}>
                      <h2 className='font-bold'>{service.service}</h2>
                      <h2 className='text-xs font-semibold'>
                        Estimasi : {service.cost[0].etd} Hari
                      </h2>
                      <h2 className='text-xs font-semibold'>Ongkos : Rp.{service.cost[0].value}</h2>
                    </label>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        )}
      </React.Fragment>
    );
  });

  return (
    <Layout>
      <div className='mt-24 mx-4'>
        <Title margin='mx-auto' align='text-center'>
          Order
        </Title>
        <h2 className='mt-4 font-semibold'>Barang Pesanan</h2>
        <ul className='mt-4'>
          {carts?.map((cart) => {
            console.log(cart);
            return (
              <li className='text-sm text-gray-700 mt-3' key={cart._id}>
                <IconContext.Provider
                  value={{ className: 'text-primary inline-block mr-2', size: '1.6rem' }}
                >
                  <span>
                    <GiFrayedArrow />
                  </span>
                </IconContext.Provider>
                <span className='font-semibold'>
                  {cart.name} - {cart.quantity} {cart.unit}
                </span>
              </li>
            );
          })}
        </ul>

        <h2 className='mt-8 text-center font-semibold'>Alamat Tujuan</h2>
        <div className='mt-4 flex items-center border-2 border-primary p-4'>{addressName}</div>

        <h2 className='mt-8 text-center font-semibold'>Plih Kurir Pengiriman</h2>
        {allCouriers}

        <h2 className='mt-8 text-center font-semibold'>Plih Bank Pembayaran</h2>

        <div className='mt-4 p-4 border-2 border-primary flex items-center'>
          <input
            type='radio'
            name='bank'
            id='bni'
            className='mr-4'
            value='bni'
            onChange={(e) => setBank(e.target.value)}
          />
          <label htmlFor='bni'>
            <h2 className='font-bold'>BNI</h2>
          </label>
        </div>

        <div className='p-4 border-2 border-primary flex items-center'>
          <input
            type='radio'
            name='bank'
            id='mandiri'
            className='mr-4'
            value='mandiri'
            onChange={(e) => setBank(e.target.value)}
          />
          <label htmlFor='mandiri'>
            <h2 className='font-bold'>Mandiri</h2>
          </label>
        </div>

        <h2 className='mt-8 text-right font-bold'>Harga Total : Rp {totalPrice + +courierCost}</h2>
        <Button
          background='bg-primary hover:bg-orange-400'
          size='big'
          variant='mx-auto w-32 mt-12 block font-bold'
          onClick={onPayHandler}
        >
          Bayar
        </Button>
      </div>
    </Layout>
  );
}
