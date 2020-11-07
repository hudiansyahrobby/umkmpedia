import React from 'react';
import CircleButton from '../CircleButtons/CircleButton';
import StarIcon from '../icons/StarIcon';

import Shoe1 from '../../assets/images/shoe-1.png';

function Review({ name, image, rating, content, reply }) {
  return (
    <div className='flex justify-between'>
      <div className='flex'>
        <div className='mr-4'>
          <CircleButton>
            <img src={Shoe1} alt='' className='w-full h-full' />
          </CircleButton>
        </div>

        <div>
          <h3 className='text-sm font-bold'>Albert John</h3>
          <h3 className='text-xs font-semibold text-gray-darkest'>Texas, USA</h3>
        </div>
      </div>

      <div className='w-64'>
        <div className='flex'>
          <StarIcon size='small' background='text-yellow-dark' />
          <StarIcon size='small' background='text-yellow-dark' />
          <StarIcon size='small' background='text-yellow-dark' />
          <StarIcon size='small' background='text-yellow-dark' />
          <StarIcon size='small' background='text-yellow-dark' />
        </div>

        <h3 className='mt-2 text-sm font-bold'>Highly Recommended</h3>
        <p className='mt-2 text-xs text-gray-darkest'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio magnam beatae hic
          obcaecati exercitationem cum quos quaerat reprehenderit qui culpa nulla, odio quae
          mollitia incidunt aut. Dolor ea quos beatae necessitatibus corrupti quae, nisi a quis
          voluptate. Animi sapiente in, porro nostrum, vero ratione inventore commodi delectus
          eveniet nulla nihil?
        </p>
      </div>
    </div>
  );
}

export default Review;
