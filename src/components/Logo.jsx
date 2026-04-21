import React from 'react';

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* SVG Icon matching the geometric 'S' shape */}
      <svg width="48" height="56" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Left Side (Darker Purple) */}
        <path d="M50 35 L50 65 L25 80 L25 50 Z" fill="#8B5CF6" />
        <path d="M25 50 L25 80 L0 65 L0 35 Z" fill="#7C3AED" />
        
        {/* Right Side (Lighter Purple) */}
        <path d="M50 65 L50 95 L75 110 L75 80 Z" fill="#C4B5FD" />
        <path d="M75 80 L75 110 L100 95 L100 65 Z" fill="#A78BFA" />

        {/* Top Dot (Diamond) */}
        <path d="M75 20 L75 40 L50 25 L50 5 Z" fill="#6D28D9" />
      </svg>
      
      {/* Text matching "BLOG SPACE" */}
      <div className="flex flex-col justify-center leading-none mt-1">
        <span className="font-extrabold text-[28px] tracking-normal text-black m-0 p-0" style={{ fontFamily: 'Inter, sans-serif' }}>
          BLOG
        </span>
        <span className="font-normal text-[13px] tracking-[0.2em] text-[#7C3AED] uppercase -mt-1 ml-0.5">
          SPACE
        </span>
      </div>
    </div>
  );
}
