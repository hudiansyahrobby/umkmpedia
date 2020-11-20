/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { getCost, getOrder, getOrderById } from '../actions/orderActions';
import { getCity } from '../actions/userActions';
import { calculateTotalPrice } from '../utils/CalculateTotalPrice';
import { numberWithDot } from '../utils/numberWithDot';
import CourierLists from '../components/CourierLists/CourierLists';
import AddressName from '../components/AddressName';
// import BankList from '../components/BankList';
import OrderItem from '../components/OrderItem';
import Layout from '../components/Layout';
import Title from '../components/Title';
import Button from '../components/Buttons/Button';

export default function OrderPage() {
  const { couriers, order } = useSelector((state) => state.order);
  const { user, cities: address } = useSelector((state) => state.user);
  const [courierCost, setCourierCost] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [bank, setBank] = useState('');
  // const [orderedItem, setOrderedItem] = useState([]);
  console.log('ORDER', order);
  console.log('couriers', couriers);
  const dispatch = useDispatch();
  // const history = useHistory();
  const { id } = useParams();
  console.log('ID', id);
  const courierList = ['jne', 'pos', 'tiki'];

  const getAllCourierCost = () => {
    if (user.city) {
      const orderData = {
        destination: user.city,
        courier: '',
      };
      courierList.map((courier) => {
        orderData.courier = courier;
        // dispatch(getCost(orderData));
      });
    }
  };
  const onPayHandler = () => {
    // if (courierCost !== 0) {
    //   window.snap.pay(order?.token); // Replace it with your transaction token
    // }
    window.snap.pay(order?.token); // Replace it with your transaction token
    // return alert('Mohon Pilih Salah satu Bank dan Kurir Pengiriman');
  };

  useEffect(() => {
    dispatch(getCity());
    getAllCourierCost();
    dispatch(getOrderById(id));
    // const orderItem = localStorage.getItem('orderItem');
    // const parsedItem = JSON.parse(orderItem);
    // setOrderedItem(parsedItem);
    return () => {
      // localStorage.removeItem('orderItem');
    };
  }, []);

  useEffect(() => {
    const cartPrice = calculateTotalPrice(order?.products);
    const totalPrice = cartPrice + +courierCost;
    setTotalPrice(totalPrice);
  }, [order, courierCost]);

  if (!user?.fullAddress || !user?.city || !user?.province || !user?.telephone) {
    return <Redirect to='/profil/update' />;
  }
  if (localStorage.getItem('orderItem') === null) {
    return <Redirect to='/keranjang' />;
  }

  return (
    <Layout>
      <div className='mt-24 mx-4'>
        <Title margin='mx-auto' align='text-center'>
          Order
        </Title>
        <h2 className='mt-4 font-semibold'>Barang Pesanan</h2>
        <OrderItem items={order?.products} />

        <h2 className='mt-8 text-center font-semibold'>Alamat Tujuan</h2>
        <AddressName address={address} user={user} />

        <h2 className='mt-8 text-center font-semibold'>Plih Kurir Pengiriman</h2>
        <CourierLists courierList={couriers} onChange={(e) => setCourierCost(e.target.value)} />

        {/* <h2 className='mt-8 text-center font-semibold'>Plih Bank Pembayaran</h2>
        <BankList onChange={(e) => setBank(e.target.value)} /> */}

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
