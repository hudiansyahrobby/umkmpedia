import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, resetStateProduct } from '../actions/productActions';

import { useParams } from 'react-router-dom';
// import Reviews from '../components/Reviews/Reviews';
import { addToCart } from '../actions/cartActions';
import { addToWishlist, deleteFromWishlist, getWishlist } from '../actions/wishlistActions';
import Layout from '../components/Layout';
import ProductStar from '../components/Products/ProductStar';
import ProductDetailImage from '../components/Products/ProductDetailImage';
// import ProductDetailReview from '../components/Products/ProductDetailReview'
import ProductPrice from '../components/Products/ProductPrice';
import CartButton from '../components/Buttons/CartButton';
import FavoriteButton from '../components/Buttons/FavoriteButton';
import ProductDetailQuantity from '../components/Products/ProductDetailQuantity';
import ProductDetailInfo from '../components/Products/ProductDetailInfo';
import ProductDetailTitle from '../components/Products/ProductDetailTitle';
// import { addReview } from '../actions/reviewActions';

function ProductDetailPage() {
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.product);
  const { wishlists } = useSelector((state) => state.wishlist);
  const { id } = useParams();
  // const [isOpen, setOpen] = useState(false);
  // const [rating, setRating] = useState(5);
  // const [content, setContent] = useState('');
  const favorited = wishlists?.some((wishlist) => wishlist.productId === id);

  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getWishlist(id));

    return function cleanup() {
      dispatch(resetStateProduct());
    };
  }, [dispatch, id]);

  const onAddToCartHandler = (id) => {
    dispatch(addToCart(id));
  };

  const onAddToWishlistHandler = (id) => {
    dispatch(addToWishlist(id));
  };

  const onRemoveFromWishlistHandler = (id) => {
    dispatch(deleteFromWishlist(id));
  };

  // const onReviewHandler = () => {
  //   setOpen(!isOpen);
  // };

  // const onAddReviewHandler = () => {
  //   dispatch(addReview(id, rating, content));
  // }

  let productElement;

  if (product?.length > 0) {
    const { image, name, price, quantity, _id, description, unit } = product[0];

    productElement = (
      <div className='p-6'>
        <ProductDetailImage name={name} image={image} />

        <div className='mt-5 flex items-center justify-between'>
          <div>
            <ProductDetailTitle name={name} />
            <div className='mt-2 flex items-center'>
              <ProductStar rating={5} size='1.3rem' color='text-red-600' />
              {/* <ProductDetailReview score={4.4} number={5} /> */}
            </div>
            <ProductPrice price={price} />
          </div>

          <div className='flex align-center'>
            <CartButton size='2.7rem' styling='mr-2' onClick={() => onAddToCartHandler(_id)} />

            <FavoriteButton
              favorited={favorited}
              onClick={() =>
                `${favorited ? onRemoveFromWishlistHandler(_id) : onAddToWishlistHandler(_id)}`
              }
              size='2.7rem'
            />
          </div>
        </div>

        <ProductDetailQuantity quantity={quantity} unit={unit} />
        <ProductDetailInfo description={description} />
        {/* 
        <div className='mt-8'>
          <div className='flex justify-between'>
            <h3 className='text-base font-bold'>Reviews</h3>
            <button onClick={onReviewHandler}>{!isOpen ? 'Add Review' : 'Close Review'}</button>
          </div>
          {isOpen && (
            <>
              <textarea
                name='review'
                id='review'
                onChange={(e) => setContent(e.target.value)}
                className='w-full h-64 border border-gray-normal'
              ></textarea>
              <button onClick={onAddReviewHandler}>Add Review</button>
            </>
          )}
          <Reviews reviews={review} />
        </div> */}
      </div>
    );
  }

  return (
    <Layout>
      <div className='w-full h-screen max-w-xl mx-auto mt-20'>{productElement}</div>
    </Layout>
  );
}

export default ProductDetailPage;
