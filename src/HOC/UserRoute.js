import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import jwt from 'jsonwebtoken';

export default function UserRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = localStorage.getItem('token');
        try {
          jwt.verify(token, process.env.REACT_APP_ACCESS_TOKEN_SECRET);
          return <Component {...props} />;
        } catch (error) {
          localStorage.clear();
          return <Redirect to='/masuk' />;
        }
      }}
    />
  );
}
