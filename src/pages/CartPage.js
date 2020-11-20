import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, onChangeQuantity } from '../actions/cartActions';
import Button from '../components/Buttons/Button';
import Carts from '../components/Carts/Carts';
import CartSkeleton from '../components/Carts/CartSkeleton';
import CircleButton from '../components/Buttons/CircleButtons/CircleButton';
import Layout from '../components/Layout';
import Title from '../components/Title';
import { calculateTotalPrice } from '../utils/CalculateTotalPrice';
import { useHistory } from 'react-router-dom';
import { addToOrder } from '../actions/orderActions';

function CartPage() {
  const { carts, loading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderedItem, setOrderedItem] = useState([]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    const price = calculateTotalPrice(orderedItem);
    setTotalPrice(price);
  }, [orderedItem]);

  const onOrderHandler = () => {
    // const order = JSON.stringify(orderedItem);
    // localStorage.setItem('orderItem', order);
    // localStorage.setItem('totalPrice', totalPrice);
    dispatch(addToOrder(orderedItem, totalPrice, history));
  };

  const onChangeQuantityHandler = (id, quantity) => {
    dispatch(onChangeQuantity(id, quantity));
    setTotalPrice(0);
  };

  const onCheckHandler = (checked, name) => {
    if (checked) {
      const checkedItem = carts.filter((cart) => {
        return cart.name === name;
      });

      function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
          if (list[i]._id === obj._id) {
            // Delete Object
            list.splice(list[i], 1);
            return true;
          }
        }

        return false;
      }

      containsObject(checkedItem[0], orderedItem);
      setOrderedItem((orderedItem) => [...orderedItem, checkedItem[0]]);
    } else {
      const checkedItem = orderedItem.filter((item) => {
        return item.name !== name;
      });
      console.log('CHECKED', checkedItem);
      setOrderedItem(checkedItem);
    }
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

        {loading ? (
          <CartSkeleton />
        ) : (
          <Carts
            carts={carts}
            totalPrice={totalPrice}
            onCheck={(e) => onCheckHandler(e.target.checked, e.target.name)}
            onChangeQty={onChangeQuantityHandler}
          />
        )}

        {carts.length > 0 && (
          <Button
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
