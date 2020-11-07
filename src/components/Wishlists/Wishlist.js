import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';
import { generatePublicPath } from '../../utils/generatePublicPath';
import StarIcon from '../icons/StarIcon';
import { AiFillHeart } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import CartIcon from '../icons/CartIcon';

export default function Wishlist({ image, name, price, id, favorited, onWishlist }) {
  const dispatch = useDispatch();

  const addToCartHandler = (productId) => {
    dispatch(addToCart(productId));
  };

  return (
    <div className='rounded-mammoth overflow-hidden bg-white shadow-lg flex flex-col justify-between'>
      <div className='h-48 max-w-sm relative'>
        <img className='w-full h-full rounded-mammoth' src={generatePublicPath(image)} alt={name} />

        <IconContext.Provider
          value={{
            className: `absolute top-0 right-0 mt-2 mr-2 bg-red-500 ${
              !favorited ? 'text-white hover:text-red-hell' : 'text-red-hell hover:text-white'
            } transition duration-300 ease-in-out cursor-pointer rounded-lg p-1`,
            size: '2rem',
          }}
        >
          <div onClick={() => onWishlist(id)}>
            <AiFillHeart />
          </div>
        </IconContext.Provider>
      </div>
      <div className='flex justify-between items-center px-4'>
        <div className='pb-4'>
          <Link to={`/product/${id}`}>
            <h4 className='text-gray-900 pt-4 font-bold hover:text-gray-600 transition duration-300 ease-in-out'>
              {name.toUpperCase()}
            </h4>
          </Link>
          <div className='rating flex mr-2 mt-2 -ml-1'>
            {Array(5)
              .fill()
              .map((_, index) => {
                return <StarIcon key={index} size='big' background='text-red-hell' />;
              })}
          </div>
          <h4 className='text-gray-600 mt-3 font-semibold'>${price}</h4>
        </div>

        <button onClick={() => addToCartHandler(id)}>
          {
            <CartIcon
              size='big'
              variant='p-2 rounded-lg bg-blue-sea hover:bg-white border-2 border-blue-sea hover:text-blue-sea transition duration-500 ease-in-out'
            />
          }
        </button>
      </div>
    </div>
  );
}
