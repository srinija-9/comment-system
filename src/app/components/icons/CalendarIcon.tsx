import type { SVGProps } from "react";

const CalendarIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect x="3" y="5" width="18" height="16" rx="2" ry="2" />
    <line x1="16" y1="3" x2="16" y2="7" />
    <line x1="8" y1="3" x2="8" y2="7" />
    <line x1="3" y1="11" x2="21" y2="11" />
    <line x1="7" y1="15" x2="7.01" y2="15" />
    <line x1="12" y1="15" x2="12.01" y2="15" />
    <line x1="17" y1="15" x2="17.01" y2="15" />
  </svg>
);

export default CalendarIcon;
