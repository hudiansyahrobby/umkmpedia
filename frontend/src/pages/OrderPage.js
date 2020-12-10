import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addToOrder, getCost, getPayment, resetOrder } from '../actions/orderActions';
import { numberWithDot } from '../utils/numberWithDot';
import CourierLists from '../components/CourierLists/CourierLists';
import AddressName from '../components/AddressName';
import OrderItem from '../components/OrderItem';
import Layout from '../components/Layout';
import Title from '../components/Title';
import Button from '../components/Buttons/Button';
import { useCallback } from 'react';
import { calculateTotalPrice } from '../utils/CalculateTotalPrice';
import Modal from '../components/Modal';

import CITIES from '../data/cities.json';

export default function OrderPage() {
  const { couriers, token, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const [courierCost, setCourierCost] = useState(0);
  const [orderItemPrice, setOrderItemPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderItem, setOrderItem] = useState([]);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const courierList = ['jne', 'tiki'];

  const filteredCity = CITIES.cities?.filter((city, index) => city.city_id === user.city);

  let userAddress;
  if (filteredCity?.length > 0) {
    userAddress = `${user.fullAddress}, ${filteredCity[0].type} ${filteredCity[0].city_name} , Provinsi ${filteredCity[0].province}, Kode Pos ${filteredCity[0].postal_code}`;
  }

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
    return window.snap.pay(token, {
      onSuccess: ({ gross_amount, transaction_id }) => {
        const orderData = {
          products: orderItem,
          transaction_id,
          totalPrice: gross_amount,
          shipping_address: userAddress,
        };
        setModal(false);
        return dispatch(addToOrder(orderData));
      },
      onPending: ({ gross_amount, transaction_id }) => {
        setModal(false);
        return dispatch(addToOrder(orderItem, transaction_id, gross_amount));
      },
      onError: () => {
        return alert('Mohon Maaf Terjadi Error');
      },
    });
  };

  const onChangeCourier = (e) => {
    setCourierCost(+e.target.value);
    const totalPrice = +orderItemPrice + +e.target.value;
    setTotalPrice(totalPrice);
  };

  const onGetTokenPayment = () => {
    const paymentData = {
      courierCost,
      orderItem,
    };
    dispatch(getPayment(paymentData));
  };

  const onOpenModal = () => {
    if (courierCost === 0) return alert('Mohon Pilih Kurir Pengiriman');
    onGetTokenPayment();
    setModal(true);
  };

  const getInitialPrice = useCallback(() => {
    const orderItem = JSON.parse(localStorage.getItem('orderItem'));
    const totalPriceWithoutCourier = calculateTotalPrice(orderItem);
    setOrderItem(orderItem);
    setOrderItemPrice(totalPriceWithoutCourier);
    setTotalPrice(totalPriceWithoutCourier);
  }, []);

  useEffect(() => {
    getInitialPrice();
    getAllCourierCost();

    return () => {
      resetOrder();
    };
  }, []);

  if (!user?.fullAddress || !user?.city || !user?.province || !user?.telephone) {
    return <Redirect to='/profil/update' />;
  }
  return (
    <Layout>
      <div className='mt-24 mx-4'>
        <Title margin='mx-auto' align='text-center'>
          Order
        </Title>
        {modal && <Modal hideModal={() => setModal(false)} onProcess={onPayHandler} />}

        <h2 className='mt-4 font-semibold'>Barang Pesanan</h2>
        <OrderItem items={orderItem} />

        <h2 className='mt-8 text-center font-semibold'>Alamat Tujuan</h2>
        <AddressName address={userAddress} />

        <h2 className='mt-8 text-center font-semibold'>Plih Kurir Pengiriman</h2>
        <CourierLists courierList={couriers} onChange={onChangeCourier} loading={loading} />

        <h2 className='mt-8 text-right font-bold'>Harga Total : Rp {numberWithDot(totalPrice)}</h2>
        <Button
          background='bg-primary hover:bg-orange-400'
          size='big'
          variant='mx-auto w-32 mt-12 block font-bold'
          onClick={onOpenModal}
        >
          Bayar
        </Button>
      </div>
    </Layout>
  );
}
