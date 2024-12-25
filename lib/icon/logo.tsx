import * as React from "react"
const Logo = (props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={31}
    fill="none"
    {...props}
  >
    <path
      fill="#272937"
      d="M13.4 5.15V.9H0v29.2h13.4v-4.25a10.35 10.35 0 0 1 0-20.7ZM13.4 5.15v20.7a10.35 10.35 0 0 0 0-20.7Z"
    />
  </svg>
)
export default Logo
