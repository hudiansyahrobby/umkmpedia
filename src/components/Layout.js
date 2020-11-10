import React, { useState } from 'react';
import Drawer from './Drawer/Drawer';
import Navbar from './Navbar/Navbar';
import Overlay from './Overlay';

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  const onOpenHandler = () => {
    setOpen(!open);
  };
  return (
    <div className='font-poppins min-h-screen container'>
      <Navbar onOpen={onOpenHandler} />
      {open && <Drawer onOpen={onOpenHandler} open={open} />}
      {open && <Overlay onOpen={onOpenHandler} />}

      {children}
    </div>
  );
}
