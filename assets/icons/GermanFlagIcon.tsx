import React from "react";

interface GermanFlagIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const GermanFlagIcon: React.FC<GermanFlagIconProps> = ({
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
        <clipPath id="germanFlagClip">
          <circle cx="12" cy="12" r="10" />
        </clipPath>
      </defs>
      {/* Flag background with clip */}
      <g clipPath="url(#germanFlagClip)">
        {/* Black stripe */}
        <rect x="2" y="2" width="20" height="6.67" fill="#000000" />
        {/* Red stripe */}
        <rect x="2" y="8.67" width="20" height="6.67" fill="#DD0000" />
        {/* Gold stripe */}
        <rect x="2" y="15.33" width="20" height="6.67" fill="#FFCC00" />
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

export default GermanFlagIcon;
