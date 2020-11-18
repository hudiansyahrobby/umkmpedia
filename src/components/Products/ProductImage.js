import React from 'react';
import { generatePublicPath } from '../../utils/generatePublicPath';
import FavoriteButton from '../Buttons/FavoriteButton';

export default function ProductImage({ image, name, favorited, onClick, user }) {
  return (
    <div className='h-48 md:h-40 relative'>
      <img className='w-full h-full' src={generatePublicPath(image)} alt={name} />
      {user?.role === 'user' && (
        <FavoriteButton onClick={onClick} favorited={favorited} absolute size='2rem' />
      )}
    </div>
  );
}
