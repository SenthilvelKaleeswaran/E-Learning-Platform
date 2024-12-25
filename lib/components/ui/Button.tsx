import React, { FC } from 'react';
import { ButtonProps } from '@/types';

const Button: FC<ButtonProps> = ({ children,className = "", type = 'button', ...rest }) => {
  return (
    <button
      type={type}
      className={` p-2 bg-blue-600 text-white rounded-sm w-full ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
