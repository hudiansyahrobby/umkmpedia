import React from 'react';
import CartImage from './CartImage';
import CartTitle from './CartTitle';
import CartPrice from './CartPrice';
import DeleteButton from '../Buttons/DeleteButton';
import QuantityButton from '../Buttons/QuantityButton';

function CartItem({
  id,
  name,
  price,
  quantity,
  image,
  productId,
  stock,
  onCheck,
  onChangeQty,
  unit,
  onDelete,
}) {
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
            <DeleteButton onClick={() => onDelete(id)} />
          </div>
        </label>
      </div>

      <QuantityButton
        onChangeQty={onChangeQty}
        quantity={quantity}
        stock={stock}
        id={id}
        unit={unit}
      />
    </div>
  );
}

export default CartItem;
