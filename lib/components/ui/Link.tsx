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
      className={`p-4 bg-blue-600 rounded-md text-white ${className}`}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
