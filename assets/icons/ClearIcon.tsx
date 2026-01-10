import React from "react";

interface ClearIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const ClearIcon: React.FC<ClearIconProps> = ({
  className = "",
  width = 16,
  height = 16,
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};

export default ClearIcon;
