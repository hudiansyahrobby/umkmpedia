import React from 'react';
import { useDispatch } from 'react-redux';
import { decreaseProductQty, deleteFromCart, increaseProductQty } from '../../actions/cartActions';
import { generatePublicPath } from '../../utils/generatePublicPath';
import { IconContext } from 'react-icons';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';

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
        <div className='w-32 h-32 rounded-mammoth overflow-hidden mr-3'>
          <img
            src={generatePublicPath(image)}
            alt={name}
            className='w-full h-full object-cover object-center'
          />
        </div>
        <div>
          <Link to={`/product/${productId}`} className='uppercase font-bold text-lg'>
            {name}
          </Link>
          <h3 className='mt-2 text-gray-darker font-semibold'>${price}</h3>
          <button
            className='bg-red-hell text-white p-2 mt-2 rounded-lg hover:bg-white border-2 border-red-hell transition duration-300 ease-in-out hover:text-red-hell font-semibold tracking-wider text-sm'
            onClick={() => onDeleteFromCartHandler(id)}
          >
            Delete
            <IconContext.Provider
              value={{ color: 'text-white', size: '1.2rem', className: 'ml-1 inline-block' }}
            >
              <span>
                <MdDelete />
              </span>
            </IconContext.Provider>
          </button>
        </div>
      </div>

      <div className='text-center'>
        <p
          className='text-gray-lighter text-xl cursor-pointer'
          onClick={() => onIncreaseQuantityHandler(productId)}
        >
          +
        </p>
        <p className='text-gray-darkest'>{quantity}</p>
        <p
          className='text-gray-lighter text-xl cursor-pointer'
          onClick={() => onDecreaseQuantityHandler(productId)}
        >
          -
        </p>
      </div>
    </div>
  );
}

export default CartItem;
