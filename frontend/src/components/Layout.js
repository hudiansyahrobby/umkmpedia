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
    <div className='font-poppins min-h-screen flex flex-col w-full'>
      <Navbar onOpen={onOpenHandler} open={open} />
      {open && <Drawer onOpen={onOpenHandler} open={open} />}
      <main
        className='max-w-screen-xl mx-4'
        style={{
          flex: '1 0 auto',
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
