import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../../actions/cartActions';
import CartImage from './CartImage';
import CartTitle from './CartTitle';
import CartPrice from './CartPrice';
import DeleteButton from '../Buttons/DeleteButton';
import QuantityButton from '../Buttons/QuantityButton';

function CartItem({ id, name, price, quantity, image, productId, stock, onCheck, onChangeQty }) {
  const dispatch = useDispatch();
  const onDeleteFromCartHandler = (id) => {
    dispatch(deleteFromCart(id));
  };

  return (
    <div className='flex justify-between items-center mt-4 p-4'>
      <div className='flex items-center'>
        <input
          type='checkbox'
          name={name}
          id={name}
          onChange={onCheck}
          className='mr-3 text-red-600 checked:text-primary'
        />
        <label className='flex items-center'>
          <CartImage image={image} name={image} />
          <div>
            <CartTitle name={name} productId={productId} />
            <CartPrice price={price} />
            <DeleteButton onClick={() => onDeleteFromCartHandler(id)} />
          </div>
        </label>
      </div>

      <QuantityButton onChangeQty={onChangeQty} quantity={quantity} stock={stock} id={id} />
    </div>
  );
}

export default CartItem;
