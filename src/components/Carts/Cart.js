import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteFromCart, onChangeQuantity } from '../../actions/cartActions';
import CartImage from './CartImage';
import CartTitle from './CartTitle';
import CartPrice from './CartPrice';
import DeleteButton from '../Buttons/DeleteButton';
import QuantityButton from '../Buttons/QuantityButton';

function CartItem({ id, name, price, quantity, image, productId, stock }) {
  const dispatch = useDispatch();

  const onDeleteFromCartHandler = (id) => {
    dispatch(deleteFromCart(id));
  };

  const onChangeQuantityHandler = (id, quantity) => {
    dispatch(onChangeQuantity(id, quantity));
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
        onChangeQty={(e) => onChangeQuantityHandler(productId, e.target.value)}
        quantity={quantity}
        stock={stock}
      />
    </div>
  );
}

export default CartItem;
