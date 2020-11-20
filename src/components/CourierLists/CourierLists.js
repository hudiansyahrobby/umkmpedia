import React from 'react';
import { numberWithDot } from '../../utils/numberWithDot';

export default function CourierLists({ courierList, onChange }) {
  console.log('CLIST', courierList);
  const _couriersList = courierList?.map((courier) => {
    return (
      <React.Fragment key={courier.code}>
        <div className='block w-full bg-primary p-4 mt-4'>{courier.name}</div>

        <div className='bg-orange-200 mx-2'>
          <div className='p-4 border-2 border-primary'>
            {courier.costs.length > 0 ? (
              courier.costs.map((service) => {
                return (
                  <React.Fragment key={courier.code + '-' + service.service}>
                    <div className='flex items-center mb-2'>
                      <input
                        type='radio'
                        name='kurir'
                        id={service.service}
                        className='mr-4'
                        value={service.cost[0].value}
                        onChange={onChange}
                      />
                      <label htmlFor={service.service}>
                        <h2 className='font-bold'>{service.service}</h2>
                        <h2 className='text-xs font-semibold'>
                          Estimasi : {service.cost[0].etd} Hari
                        </h2>
                        <h2 className='text-xs font-semibold'>
                          Ongkos : Rp{numberWithDot(service.cost[0].value)}
                        </h2>
                      </label>
                    </div>
                  </React.Fragment>
                );
              })
            ) : (
              <p>Tidak Didukung</p>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  });
  return _couriersList;
}
