import React from 'react';
import { Link } from 'react-router-dom';

export default function TableBody({ row }) {
  return (
    <tbody className='bg-white divide-y divide-gray-200'>
      {row?.map(({ transaction_id, products, totalPrice }) => {
        return (
          <tr key={transaction_id}>
            <td className='px-6 py-4 whitespace-nowrap'>
              <h2 className='text-sm font-medium text-gray-900'>{transaction_id}</h2>
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
              <ul className='text-sm text-gray-900'>
                {products.map(({ _id, name, quantity, unit }) => {
                  return (
                    <li key={_id}>
                      {name} - {quantity} {unit}
                    </li>
                  );
                })}
              </ul>
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
              <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                Rp{totalPrice}
              </span>
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>
              <Link
                to={`/riwayat-pembelian/${transaction_id}`}
                className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'
              >
                Lihat Detail
              </Link>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
}
