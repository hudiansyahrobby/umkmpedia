import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../actions/cartActions';
import ProductImage from './ProductImage';
import ProductTitle from './ProductTitle';
import ProductStar from './ProductStar';
import ProductPrice from './ProductPrice';
import ProductAdminButton from './ProductAdminButton';
import CartButton from '../Buttons/CartButton';

function Product({
  id,
  name,
  price,
  rating = 0,
  image,
  direction,
  onDelete,
  onUpdate,
  favorited,
  onWishlist,
}) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const onAddToCartHandler = (productId) => {
    dispatch(addToCart(productId));
  };

  let card;
  if (direction === 'vertical') {
    card = (
      <div className='rounded-mammoth overflow-hidden bg-white shadow-lg flex flex-col justify-between'>
        <ProductImage
          image={image}
          name={image}
          onClick={() => onWishlist(id)}
          favorited={favorited}
        />
        <div className='flex justify-between items-center px-4'>
          <div className='pb-4'>
            <ProductTitle name={name} id={id} />
            <ProductStar rating={5} color='text-red-600' size='1.6rem' />
            <ProductPrice price={price} />
          </div>

          <CartButton size='2rem' onClick={() => onAddToCartHandler(id)} />
        </div>
        {user?.role === 'admin' && <ProductAdminButton onDelete={onDelete} id={id} />}
      </div>
    );
  }

  // if (direction === 'horizontal') {
  //   card = (
  //     <div className='flex'>
  //       <div className='w-40 h-32 rounded-mammoth overflow-hidden'>
  //         <img className='w-full h-full object-cover' src={image} alt={name} />
  //       </div>
  //       <div className='ml-4 md:ml-3'>
  //         <h4 className='pt-2 text-gray-700 text-sm '>{name}</h4>
  //         <div className='rating flex mr-2 mt-1 -ml-1'>
  //           <StarIcon size='small' background='text-red-600' />
  //           <StarIcon size='small' background='text-red-600' />
  //           <StarIcon size='small' background='text-red-600' />
  //           <StarIcon size='small' background='text-red-600' />
  //           <StarIcon size='small' background='text-red-600' />
  //         </div>
  //         <h4 className='text-gray-600 mt-2 font-semibold text-sm'>${price}</h4>
  //         <div className='mt-2'>
  //           <Button background='bg-primary lg:text-tiny' size='small'>
  //             Add To Cart {<CartIcon size='small' />}
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  return card;
}

export default Product;
