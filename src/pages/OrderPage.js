import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getCost, getPayment, resetOrder } from '../actions/orderActions';
import { getCity } from '../actions/userActions';
import { numberWithDot } from '../utils/numberWithDot';
import CourierLists from '../components/CourierLists/CourierLists';
import AddressName from '../components/AddressName';
import OrderItem from '../components/OrderItem';
import Layout from '../components/Layout';
import Title from '../components/Title';
import Button from '../components/Buttons/Button';
import { useCallback } from 'react';

export default function OrderPage() {
  const { couriers, token } = useSelector((state) => state.order);
  const { user, cities: address } = useSelector((state) => state.user);
  const [courierCost, setCourierCost] = useState(0);
  const [orderItemPrice, setOrderItemPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderItem, setOrderItem] = useState([]);

  const dispatch = useDispatch();
  const courierList = ['jne', 'pos', 'tiki'];

  const getAllCourierCost = useCallback(() => {
    if (user.city) {
      const orderData = {
        destination: user.city,
        courier: '',
      };
      courierList.map((courier) => {
        orderData.courier = courier;
        return dispatch(getCost(orderData));
      });
    }
  }, [courierList, dispatch, user.city]);

  const onPayHandler = () => {
    if (courierCost !== 0) {
      return window.snap.pay(token); // Replace it with your transaction token
    }
    // window.snap.pay(order?.token); // Replace it with your transaction token
    return alert('Mohon Pilih Salah satu Bank dan Kurir Pengiriman');
  };

  const onChangeCourier = (e) => {
    setCourierCost(+e.target.value);

    const totalPrice = +orderItemPrice + +e.target.value;

    setTotalPrice(totalPrice);
    const price = {
      totalPrice,
    };
    dispatch(getPayment(price));
  };

  useEffect(() => {
    const orderItem = JSON.parse(localStorage.getItem('orderItem'));
    const totalPriceWithoutCourier = +localStorage.getItem('totalPrice');
    setOrderItem(orderItem);
    setOrderItemPrice(totalPriceWithoutCourier);
    setTotalPrice(totalPriceWithoutCourier);

    getAllCourierCost();
  }, []);

  useEffect(() => {
    dispatch(getCity());
    return () => {
      resetOrder();
    };
  }, [dispatch]);

  if (!user?.fullAddress || !user?.city || !user?.province || !user?.telephone) {
    return <Redirect to='/profil/update' />;
  }
  return (
    <Layout>
      <div className='mt-24 mx-4'>
        <Title margin='mx-auto' align='text-center'>
          Order
        </Title>
        <h2 className='mt-4 font-semibold'>Barang Pesanan</h2>
        <OrderItem items={orderItem} />

        <h2 className='mt-8 text-center font-semibold'>Alamat Tujuan</h2>
        <AddressName address={address} user={user} />

        <h2 className='mt-8 text-center font-semibold'>Plih Kurir Pengiriman</h2>
        <CourierLists courierList={couriers} onChange={onChangeCourier} />

        <h2 className='mt-8 text-right font-bold'>Harga Total : Rp {numberWithDot(totalPrice)}</h2>
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
