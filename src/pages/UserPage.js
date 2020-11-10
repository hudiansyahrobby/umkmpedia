import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../actions/cartActions';
import { getOrder } from '../actions/orderActions';
import { getWishlist } from '../actions/wishlistActions';
import UserCards from '../components/Cards/UserCards';
import Layout from '../components/Layout';
import Title from '../components/Title';
import UserBiodata from '../components/UserBiodata';
import UserImage from '../components/UserImage';

function UserPage() {
  const { user } = useSelector((state) => state.user);
  const { carts } = useSelector((state) => state.cart);
  const { orders } = useSelector((state) => state.order);
  const { wishlists } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlist());
    dispatch(getCart());
    dispatch(getOrder());
  }, [dispatch]);

  return (
    <Layout>
      <div className='mt-24'>
        <Title align='text-center' margin='mx-auto'>
          Profil Saya
        </Title>
        <UserImage title='Profil' data={user?.profilPic} />

        <div className='mt-8'>
          <UserBiodata name={user?.name} email={user?.mail} />
          <UserCards wishlists={wishlists} carts={carts} orders={orders} />
        </div>
      </div>
    </Layout>
  );
}

export default UserPage;
