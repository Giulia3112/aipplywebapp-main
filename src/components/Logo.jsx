import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <rect
          x="2"
          y="8"
          width="28"
          height="16"
          rx="8"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
      <span className="text-2xl font-bold text-primary" style={{ fontFamily: 'serif' }}>
        AIpply
      </span>
    </div>
  );
};

export default Logo;