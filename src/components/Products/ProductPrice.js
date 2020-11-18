import React from 'react';
import { numberWithDot } from '../../utils/numberWithDot';

export default function ProductPrice({ price }) {
  return <h4 className='text-gray-600 mt-3 font-semibold'>Rp{numberWithDot(price)}</h4>;
}
