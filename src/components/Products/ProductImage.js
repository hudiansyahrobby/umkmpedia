import React from 'react';
import { generatePublicPath } from '../../utils/generatePublicPath';
import FavoriteButton from '../Buttons/FavoriteButton';

export default function ProductImage({ image, name, favorited, onClick }) {
  return (
    <div className='h-48 max-w-sm relative'>
      <img className='w-full h-full' src={generatePublicPath(image)} alt={name} />
      <FavoriteButton onClick={onClick} favorited={favorited} absolute size='2rem' />
    </div>
  );
}
