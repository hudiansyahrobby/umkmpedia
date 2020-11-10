import React from 'react';
import { useDispatch } from 'react-redux';
import { decreaseProductQty, deleteFromCart, increaseProductQty } from '../../actions/cartActions';
import CartImage from './CartImage';
import CartTitle from './CartTitle';
import CartPrice from './CartPrice';
import DeleteButton from '../Buttons/DeleteButton';
import QuantityButton from '../Buttons/QuantityButton';

function CartItem({ id, name, price, quantity, image, productId }) {
  const dispatch = useDispatch();

  const onDeleteFromCartHandler = (id) => {
    dispatch(deleteFromCart(id));
  };

  const onIncreaseQuantityHandler = (id) => {
    dispatch(increaseProductQty({ id }));
  };

  const onDecreaseQuantityHandler = (id) => {
    dispatch(decreaseProductQty({ id }));
  };

  return (
    <div className='flex justify-between items-center mt-4 p-4'>
      <div className='flex items-center'>
        <CartImage image={image} name={image} />
        <div>
          <CartTitle name={name} productId={productId} />
          <CartPrice price={price} />
          <DeleteButton onClick={() => onDeleteFromCartHandler(id)} />
        </div>
      </div>

      <QuantityButton
        onIncrease={() => onIncreaseQuantityHandler(productId)}
        onDecrease={() => onDecreaseQuantityHandler(productId)}
        quantity={quantity}
      />
    </div>
  );
}

export default CartItem;
