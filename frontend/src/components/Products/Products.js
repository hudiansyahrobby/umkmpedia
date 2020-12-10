import React from 'react';
import Product from './Product';
export default function Products({
  products,
  onDelete,
  wishlists,
  onAddWishlist,
  onRemoveWishlist,
}) {
  const productEl =
    products?.length > 0 ? (
      products.map(({ _id, name, price, image, category, quantity }) => {
        const found = wishlists?.some((wishlist) => wishlist.productId === _id);
        if (found) {
          return (
            <Product
              key={_id}
              id={_id}
              name={name}
              quantity={quantity}
              price={price}
              image={image}
              favorited={true}
              category={category}
              onDelete={onDelete}
              onWishlist={onRemoveWishlist}
              direction='vertical'
            />
          );
        } else {
          return (
            <Product
              key={_id}
              id={_id}
              name={name}
              quantity={quantity}
              price={price}
              category={category}
              image={image}
              favorited={false}
              onDelete={onDelete}
              onWishlist={onAddWishlist}
              direction='vertical'
            />
          );
        }
      })
    ) : (
      <h1 className='text-center'>Produk Tidak Tersedia</h1>
    );

  return (
    <div className='mt-12'>
      {products?.length > 0 ? (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>{productEl}</div>
      ) : (
        productEl
      )}
    </div>
  );
}
