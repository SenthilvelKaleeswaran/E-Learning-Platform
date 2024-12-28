import React, { FC } from "react";
import { ButtonProps } from "@/types";

const Button: FC<ButtonProps> = ({
  children,
  className = "",
  disabled,
  type = "button",
  ...rest
}) => {
  return (
    <button
      type={type}
      className={` p-2 bg-blue-600 text-white rounded-md w-fit px-2 ${
        disabled ? "opacity-60" : ""
      } ${className}`}
      disabled={disabled}
      {...rest}

    >
      {children}
    </button>
  );
};

export default Button;
