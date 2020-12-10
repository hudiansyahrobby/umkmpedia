import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import jwt from 'jsonwebtoken';

export default function UserRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = localStorage.getItem('token');
        if (token) {
          return <Component {...props} />;
        } else {
          return <h1>hahhaa</h1>;
        }
      }}
    />
  );
}
