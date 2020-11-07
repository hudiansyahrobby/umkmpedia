import React, { useEffect } from 'react';
import StarIcon from '../components/icons/StarIcon';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, resetStateProduct } from '../actions/productActions';
import { useParams } from 'react-router-dom';
// import Reviews from '../components/Reviews/Reviews';
import { generatePublicPath } from '../utils/generatePublicPath';
import { addToCart } from '../actions/cartActions';
import { addToWishlist, deleteFromWishlist, getWishlist } from '../actions/wishlistActions';
import Layout from '../components/Layout';
import { FaShoppingCart } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { AiFillHeart } from 'react-icons/ai';
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
  // };

  let productElement;

  if (product) {
    const { image, name, price, quantity, _id, description } = product;
    productElement = (
      <div className='p-6'>
        <div className='mx-auto w-64 h-64 rounded-mammoth overflow-hidden'>
          <img
            src={generatePublicPath(image)}
            alt={name}
            className='w-full h-full rounded-mammoth object-contain object-center'
          />
        </div>

        <div className='mt-5 flex items-center justify-between'>
          <div>
            <h2 className='font-bold text-2xl tracking-wide'>{name.toUpperCase()}</h2>
            <div className='rating flex mr-2 mt-2 -ml-1 items-center'>
              <StarIcon size='big' background='text-red-hell' />
              <StarIcon size='big' background='text-red-hell' />
              <StarIcon size='big' background='text-red-hell' />
              <StarIcon size='big' background='text-red-hell' />
              <StarIcon size='big' background='text-red-hell' />
              <h3 className='ml-2 text-xs font-semibold'>
                4.4 <span className='font-light'>( {5} reviews )</span>
              </h3>
            </div>
            <h3 className='mt-2 text-gray-darker font-semibold'>${price}</h3>
          </div>

          <div className='flex align-center'>
            <IconContext.Provider value={{ size: '1.6rem' }}>
              <button
                onClick={() => onAddToCartHandler(_id)}
                className='p-2 rounded-lg bg-blue-sea border-2 border-blue-sea mr-2 hover:bg-white transition duration-300 ease-in-out text-white hover:text-blue-sea'
              >
                <FaShoppingCart />
              </button>
            </IconContext.Provider>

            <IconContext.Provider value={{ size: '1.6rem' }}>
              <button
                onClick={() =>
                  `${favorited ? onRemoveFromWishlistHandler(_id) : onAddToWishlistHandler(_id)}`
                }
                className={`p-2 rounded-lg  bg-red-hell mr-2 transition duration-300 ease-in-out ${
                  favorited ? 'text-red-500 hover:text-white ' : 'text-white hover:text-red-500 '
                }`}
              >
                <AiFillHeart />
              </button>
            </IconContext.Provider>
          </div>
        </div>

        <div className='mt-4'>
          <h3 className='text-sm font-bold'>Quantity</h3>
          <p className='text-sm'>{quantity}</p>
        </div>

        <div className='mt-4'>
          <h3 className='text-base font-bold'>Item Information</h3>
          <p className='mt-2 text-xs leading-6 text-gray-darkest'>{description}</p>
        </div>

        {/* <div className='mt-8'>
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
