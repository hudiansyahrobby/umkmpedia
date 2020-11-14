import React from 'react';
import { NavLink } from 'react-router-dom';

function Button({ background, children, size, variant, onClick, link, type }) {
  let style;

  if (size === 'extraBig') {
    style = 'w-48 text-sm p-3 tracking-widest uppercase';
  }

  if (size === 'big') {
    style = 'text-sm py-2 px-3 tracking-widest uppercase';
  }

  if (size === 'small') {
    style = 'text-xs py-2 px-3';
  }

  if (link) {
    return (
      <NavLink
        to={link}
        className={`rounded-md transition duration-300 ease-in-out text-center ${variant} ${style} ${
          background && background
        }`}
      >
        {children}
      </NavLink>
    );
  }
  return (
    <button
      className={`rounded-md transition duration-300 ease-in-out ${variant} ${style} ${
        background && background
      }`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
