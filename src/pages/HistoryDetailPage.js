import React from 'react';
import Layout from '../components/Layout';
import TableBody from '../components/Table/TableBody';
import TableHeader from '../components/Table/TableHeader';

export default function HistoryDetailPage() {
  return (
    <Layout>
      <div className='mt-24 max-w-screen-xl mx-5'>
        <div className='flex flex-col'>
          <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
            <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
              <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                <table className='min-w-full divide-y divide-gray-200'>
                  <TableHeader />
                  <TableBody />
                </table>
              </div>
            </div>
          </div>
        </div>
        <h2 className='mt-4 text-right'>Total : Rp50.000</h2>
      </div>
    </Layout>
  );
}
