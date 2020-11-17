import React from 'react';
import { generatePublicPath } from '../../utils/generatePublicPath';
import FavoriteButton from '../Buttons/FavoriteButton';

export default function ProductImage({ image, name, favorited, onClick, user }) {
  return (
    <div className='h-40 w-full relative'>
      <img className='w-full h-full' src={generatePublicPath(image)} alt={name} />
      {user?.role === 'user' && (
        <FavoriteButton onClick={onClick} favorited={favorited} absolute size='2rem' />
      )}
    </div>
  );
}
