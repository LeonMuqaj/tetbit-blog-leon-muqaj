import React from "react";

interface EnglishFlagIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const EnglishFlagIcon: React.FC<EnglishFlagIconProps> = ({
  className = "",
  width = 24,
  height = 24,
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circular clip path for rounded flag */}
      <defs>
        <clipPath id="englishFlagClip">
          <circle cx="12" cy="12" r="10" />
        </clipPath>
      </defs>
      {/* UK Flag (Union Jack) */}
      <g clipPath="url(#englishFlagClip)">
        {/* Blue background */}
        <rect x="2" y="2" width="20" height="20" fill="#012169" />
        {/* White diagonal stripes */}
        <path d="M2 2 L22 22 M22 2 L2 22" stroke="white" strokeWidth="4" />
        {/* Red diagonal stripes */}
        <path d="M2 2 L22 22 M22 2 L2 22" stroke="#C8102E" strokeWidth="2" />
        {/* White cross */}
        <rect x="10" y="2" width="4" height="20" fill="white" />
        <rect x="2" y="10" width="20" height="4" fill="white" />
        {/* Red cross */}
        <rect x="11" y="2" width="2" height="20" fill="#C8102E" />
        <rect x="2" y="11" width="20" height="2" fill="#C8102E" />
      </g>
      {/* Circle border */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="#E5E7EB"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
};

export default EnglishFlagIcon;
