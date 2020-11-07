import React from 'react';

function Title({ children, align, margin }) {
  return (
    <div>
      <h2 className={`uppercase text-2xl font-bold ${align}`}>{children}</h2>
      <hr className={`h-2 w-24 mt-3 bg-red-hell border-0 ${margin}`} />
    </div>
  );
}

export default Title;
