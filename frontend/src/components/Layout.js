import React, { useState } from 'react';
import Drawer from './Drawer/Drawer';
import Footer from './Footer';
import Navbar from './Navbar/Navbar';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  const onOpenHandler = () => {
    setOpen(!open);
  };
  return (
    <div className='font-poppins'>
      <Navbar onOpen={onOpenHandler} open={open} />
      {open && <Drawer onOpen={onOpenHandler} open={open} />}
      <div className='max-w-screen-xl mx-auto'>{children}</div>
      <Footer />
    </div>
  );
}
