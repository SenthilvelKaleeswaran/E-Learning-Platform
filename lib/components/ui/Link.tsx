import React, { FC, ReactNode } from "react";
import Link, { LinkProps } from "next/link";

interface LinkButtonProps extends LinkProps {
  children: ReactNode; 
  className?: string;
}

const LinkButton: FC<LinkButtonProps> = ({ children, className = "", ...rest }) => {
  return (
    <Link
      {...rest}
      className={`px-4 py-2 bg-blue-600 rounded-md text-white ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
