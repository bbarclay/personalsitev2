import { SVGProps } from 'react';

export const TeddyBear = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* Head */}
    <circle cx="12" cy="9" r="5" />
    {/* Ears */}
    <circle cx="8" cy="6" r="2" />
    <circle cx="16" cy="6" r="2" />
    {/* Body */}
    <path d="M8 14 L16 14 Q18 14 18 16 L18 19 Q18 21 16 21 L8 21 Q6 21 6 19 L6 16 Q6 14 8 14" />
    {/* Arms */}
    <path d="M6 16 L4 18" />
    <path d="M18 16 L20 18" />
    {/* Face */}
    <circle cx="10" cy="9" r="1" />
    <circle cx="14" cy="9" r="1" />
    <path d="M10 11 Q12 13 14 11" />
  </svg>
);