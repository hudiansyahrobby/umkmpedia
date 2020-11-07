import React from 'react';

function Button({ background, children, size, variant, onClick }) {
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
  return (
    <button
      className={`text-white rounded-md transition duration-300 ease-in-out ${variant} ${style} ${
        background && background
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
