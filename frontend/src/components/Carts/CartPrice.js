import React from 'react';
import { numberWithDot } from '../../utils/numberWithDot';

export default function CartPrice({ price }) {
  return <h3 className='mt-2 text-sm text-gray-darker font-semibold'>Rp{numberWithDot(price)}</h3>;
}
