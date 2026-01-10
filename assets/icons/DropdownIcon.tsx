import React from "react";

interface DropdownIconProps {
  className?: string;
}

const DropdownIcon: React.FC<DropdownIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DropdownIcon;
