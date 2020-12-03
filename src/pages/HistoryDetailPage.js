import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrderById, getTransactionStatus } from '../actions/orderActions';
import Button from '../components/Buttons/Button';
import Layout from '../components/Layout';
import TableHeader from '../components/Table/TableHeader';
import { generatePublicPath } from '../utils/generatePublicPath';
import { numberWithDot } from '../utils/numberWithDot';

export default function HistoryDetailPage() {
  const header = [
    {
      title: 'Produk Pembelian',
    },
    {
      title: 'Jumlah Pembelian',
    },
    {
      title: 'Harga',
    },
  ];

  const dispatch = useDispatch();
  const { id } = useParams();
  const { order, status } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrderById(id));
    dispatch(getTransactionStatus(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <div className='mt-24 max-w-screen-xl mx-5'>
        <div className='ml-4 space-y-1'>
          <h2 className=' text-xs font-medium text-gray-700 tracking-wider'>
            ID Transaksi : <span>{order[0]?.transaction_id}</span>
          </h2>
          <h2 className=' text-xs font-medium text-gray-700 tracking-wider'>
            Status Pembayaran : <span>{status?.fraud_status}</span>
          </h2>
          <h2 className=' text-xs font-medium text-gray-700 tracking-wider'>
            Alamat Pengiriman : <span>{order[0]?.shipping_address}</span>
          </h2>
          <h2 className=' text-xs font-medium text-gray-700 tracking-wider'>
            Nomer Resi: <span>{order[0]?.resiNumber || 'Resi Belum Ditambakn'}</span>
          </h2>
          <h2 className=' text-xs font-medium text-gray-700 tracking-wider'>
            Total Harga : <span>Rp {numberWithDot(order[0]?.totalPrice)}</span>
          </h2>
        </div>

        {user.role === 'admin' && (
          <div className='text-right mt-4'>
            <Button
              link={`/admin/tambah-resi/${id}`}
              background='bg-primary hover:bg-orange-400'
              variant='mr-2 text-black font-bold transition duration-300'
              size='small'
            >
              Tambah Resi
            </Button>
          </div>
        )}

        <div className='flex flex-col'>
          <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                <table className='mt-4 min-w-full divide-y divide-gray-200'>
                  <TableHeader header={header} />
                  <tbody className='bg-white divide-y divide-gray-200'>
                    {order[0]?.products?.map(
                      ({ _id, image, name, price, category, quantity, unit }) => {
                        return (
                          <tr key={_id}>
                            <td className='px-6 py-4 whitespace-nowrap'>
                              <div className='flex items-center'>
                                <div className='flex-shrink-0 h-10 w-10'>
                                  <img
                                    className='h-10 w-10 rounded-full'
                                    src={generatePublicPath(image)}
                                    alt=''
                                  />
                                </div>
                                <div className='ml-4'>
                                  <div className='text-sm font-medium text-gray-900'>{name}</div>
                                  <div className='text-sm text-gray-500'>{category.name}</div>
                                </div>
                              </div>
                            </td>

                            <td className='px-6 py-4 whitespace-nowrap'>
                              <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800'>
                                {quantity} {unit}
                              </span>
                            </td>

                            <td className='px-6 py-4 whitespace-nowrap'>
                              <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                Rp{price}
                              </span>
                            </td>
                          </tr>
                        );
                      },
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
