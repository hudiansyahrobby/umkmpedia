import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import jwt from 'jsonwebtoken';

export default function AdminRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));
        try {
          const decoded = jwt.verify(token, process.env.REACT_APP_ACCESS_TOKEN_SECRET);
          if (decoded && user.role === 'admin') {
            return <Component {...props} />;
          } else {
            return <h1 className='p-4'>Anda Tidak Memiliki Akses Untuk Halaman Ini</h1>;
          }
        } catch (error) {
          localStorage.clear();
          return <Redirect to='/masuk' />;
        }
      }}
    />
  );
}
