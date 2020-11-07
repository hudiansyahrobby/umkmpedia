import React from 'react';
import Category from './Category';
import Nike from '../../assets/images/shoe-1.png';
import Adidas from '../../assets/images/shoe-2.jpg';
import Puma from '../../assets/images/shoe-3.jpg';
import Reebok from '../../assets/images/shoe-4.jpg';

export default function Categories() {
  return (
    <div className='mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 justify-center border-orange-700'>
      <Category image={Nike} id='5f9790ca59a1df1bcc745c85'>
        NIKE
      </Category>
      <Category image={Adidas} id='5f9790e559a1df1bcc745c86'>
        ADIDAS
      </Category>
      <Category image={Puma} id='5f9790ed59a1df1bcc745c87'>
        PUMA
      </Category>
      <Category image={Reebok} id='5f97914e59a1df1bcc745c89'>
        REEBOK
      </Category>
    </div>
  );
}
