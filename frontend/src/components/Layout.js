import React, { useState } from "react";
import Drawer from "./Drawer/Drawer";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import { Helmet } from "react-helmet";

export default function Layout({ children }) {
  const [open, setOpen] = useState(false);

  const onOpenHandler = () => {
    setOpen(!open);
  };
  return (
    <div className="font-poppins min-h-screen flex flex-col w-full">
      <Helmet>
        <meta charSet="utf-8" />
        <title>UMKMPedia</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Navbar onOpen={onOpenHandler} open={open} />
      {open && <Drawer onOpen={onOpenHandler} open={open} />}
      <main
        style={{
          flex: "1 0 auto",
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
