import React from 'react';
import Wishlist from './Wishlist';
export default function Wishlists({ wishlists, onDelete, onRemoveWishlist }) {
  const wishlistEl =
    wishlists?.length > 0 ? (
      wishlists.map((product) => {
        return (
          <Wishlist
            key={product._id}
            id={product.productId}
            name={product.name}
            favorited={true}
            price={product.price}
            image={product.image}
            onWishlist={onRemoveWishlist}
          />
        );
      })
    ) : (
      <h1>Anda Belum Menambahkan Produk dalam Daftar Keinginan</h1>
    );
  return (
    <div className='mt-12'>
      {wishlists?.length > 0 ? (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>{wishlistEl}</div>
      ) : (
        wishlistEl
      )}
    </div>
  );
}
