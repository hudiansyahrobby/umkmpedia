import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../actions/cartActions';
import { addToOrder } from '../actions/orderActions';
import Button from '../components/Buttons/Button';
import Carts from '../components/Carts/Carts';
import CartSkeleton from '../components/Carts/CartSkeleton';
import CircleButton from '../components/Buttons/CircleButtons/CircleButton';
import Layout from '../components/Layout';
import Title from '../components/Title';
import { calculateTotalPrice } from '../utils/CalculateTotalPrice';

function CartPage() {
  const { carts, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    const price = calculateTotalPrice(carts);
    setTotalPrice(price);
    console.log('JALANNI');
  }, [carts]);

  const onOrderHandler = () => {
    dispatch(addToOrder());
  };

  return (
    <Layout>
      <div className='mt-24 max-w-screen-xl'>
        <div className='px-6'>
          <div className='flex justify-between items-center'>
            <Title>Keranjang Belanja</Title>
            <CircleButton />
          </div>
        </div>

        {loading ? <CartSkeleton /> : <Carts carts={carts} totalPrice={totalPrice} />}

        {carts.length > 0 && (
          <Button
            link='/order'
            background='bg-primary hover:bg-orange-400'
            size='big'
            variant='mx-auto w-32 mt-12 block font-bold'
            onClick={onOrderHandler}
          >
            Pesan
          </Button>
        )}
      </div>
    </Layout>
  );
}

export default CartPage;
