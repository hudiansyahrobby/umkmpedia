import React from 'react';
import { IconContext } from 'react-icons/lib';
import { GiFrayedArrow } from 'react-icons/gi';
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter';
import { deleteCategoryById } from '../actions/categoryActions';
import { NavLink } from 'react-router-dom';
import Title from '../components/Title';
import { useDispatch } from 'react-redux';

export default function List({ lists, title }) {
  const dispatch = useDispatch();

  return (
    <div className='pt-6 shadow-md rounded px-4 pb-8 mb-4'>
      <Title align='text-center' margin='mx-auto'>
        {title}
      </Title>
      <ul className='mt-4'>
        {lists?.length > 0 ? (
          lists?.map((list) => {
            return (
              <li
                className='text-sm text-gray-700 mt-3 flex justify-between items-center'
                key={list._id}
              >
                <IconContext.Provider
                  value={{ className: 'text-primary inline-block mr-2', size: '1.6rem' }}
                >
                  <span>
                    <GiFrayedArrow />
                    <span className='font-semibold'>{capitalizeFirstLetter(list.name)}</span>
                  </span>
                </IconContext.Provider>
                <div>
                  <button
                    className='w-16 text-center inline-block mr-1 bg-red-600 p-1 text-white'
                    onClick={() => dispatch(deleteCategoryById(list._id))}
                  >
                    Hapus
                  </button>
                  <NavLink
                    className='w-16 text-center inline-block mr-1 bg-yellow-600 p-1 text-white'
                    to={`/admin/edit-kategori/${list._id}`}
                  >
                    Edit
                  </NavLink>
                </div>
              </li>
            );
          })
        ) : (
          <h2 className='mt-16 text-center'>Tidak Ada Data</h2>
        )}
      </ul>
    </div>
  );
}
