import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import jwt from 'jsonwebtoken';

export default function UserRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = localStorage.getItem('token');
        console.log('USER ROUTE TOKEN LS', token);
        try {
          jwt.verify(token, 'uE9kTv=xcbasuAG!U^bgLf8^g6rn*_LJ_vJZ2BYDPLH#K5jp$dSNt_HjRBd_FRjS');
          console.log('VALID TOKEN USER ROUTE');
          return <Component {...props} />;
        } catch (error) {
          console.log('USER ROUTE EROR', error);
          localStorage.clear();
          return <Redirect to='/masuk' />;
        }
      }}
    />
  );
}
