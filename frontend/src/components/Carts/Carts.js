import React from 'react';
import Cart from './Cart';
import { numberWithDot } from '../../utils/numberWithDot';

export default function Carts({ carts, totalPrice = 0, onCheck, onChangeQty, onDelete }) {
  console.log(typeof totalPrice);
  return (
    <div className='mt-8 py-6 px-2 bg-red-lightest rounded-mammoth'>
      {carts?.map(({ _id, name, price, quantity, image, productId, stock, unit }) => {
        return (
          <Cart
            key={productId}
            id={_id}
            productId={productId}
            name={name}
            price={price}
            quantity={quantity}
            image={image}
            stock={stock}
            unit={unit}
            onCheck={onCheck}
            onChangeQty={onChangeQty}
            onDelete={onDelete}
          />
        );
      })}
      {carts.length !== 0 ? (
        <h2 className='text-sm md:text-xl mt-6 pr-6 text-right font-bold tracking-wide'>
          Harga Total : Rp{numberWithDot(totalPrice)}
        </h2>
      ) : (
        <h1 className='text-center'>Anda Belum Menambahkan Produk Pada Keranjang Belanja</h1>
      )}
    </div>
  );
}
