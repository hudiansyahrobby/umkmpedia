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
        // try {
        //   jwt.verify(token, process.env.REACT_APP_ACCESS_TOKEN_SECRET);
        // } catch (error) {
        //   console.log(error);
        //   // localStorage.clear();
        //   // return <Redirect to='/masuk' />;
        // }
      }}
    />
  );
}
