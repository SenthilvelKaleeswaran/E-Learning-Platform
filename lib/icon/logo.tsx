import * as React from "react";
const Logo = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="31"
    viewBox="0 0 24 31"
    fill="black"
    {...props}
  >
    <path
      d="M13.4 5.15002V0.900024H0V30.1H13.4V25.85C10.655 25.85 8.0224 24.7595 6.08144 22.8185C4.14044 20.8775 3.05 18.245 3.05 15.5C3.05 12.755 4.14044 10.1224 6.08144 8.18147C8.0224 6.24047 10.655 5.15002 13.4 5.15002Z"
      fill="#272937"
    />
    <path
      d="M13.3999 5.15002V25.85C16.1449 25.85 18.7775 24.7595 20.7185 22.8185C22.6595 20.8775 23.7499 18.245 23.7499 15.5C23.7499 12.755 22.6595 10.1224 20.7185 8.18147C18.7775 6.24047 16.1449 5.15002 13.3999 5.15002Z"
      fill="#272937"
    />
  </svg>
);
export default Logo;

