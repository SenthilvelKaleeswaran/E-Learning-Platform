import React, { FC } from "react";
import { InputProps } from "@/types";

const Input: FC<InputProps> = ({
  label,
  id,
  className,
  labelClassName,
  inputClassName,
  ...rest
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="space-x-2">
        {label && (
          <label htmlFor={id} className={`text-sm ${labelClassName}`}>
            {label}
          </label>
        )}

        {rest?.required && <span className="text-red-500">*</span>}
      </div>

      <input
        id={id}
        className={` p-2 rounded-sm border border-gray-400 bg-white `}
        {...rest}
      />
    </div>
  );
};

export default Input;