"use client";
import { Icon } from "@/lib/icon";
import React, { createContext, useContext, ReactNode, useState } from "react";

const AccordionContext = createContext({
  allowMultiple: false,
});

const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

const Accordion = ({
  allowMultiple = false,
  children,
}: {
  allowMultiple?: boolean;
  children: ReactNode;
}) => {
  return (
    <AccordionContext.Provider value={{ allowMultiple }}>
      {children}
    </AccordionContext.Provider>
  );
};

const AccordionItem = ({
  title,
  description,
  children,
  className,
  renderProp,
  renderPropStyle,
  isActive,
  isHighlight = true,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  renderProp?: ReactNode;
  renderPropStyle?: string;
  isActive?: boolean;
  isHighlight?: boolean;
}) => {
  const { allowMultiple } = useAccordionContext();
  const [isItemActive, setIsActive] = useState(isActive || false);

  const handleToggle = () => {
    if (!allowMultiple) setIsActive(!isActive);
    else setIsActive((prev) => !prev);
  };

  return (
    <div className="border">
      <div
        className={`flex gap-4 w-full justify-between cursor-pointer py-2 px-4 ${
          isActive ? `bg-gray-200 ${isHighlight ? "text-blue-500" : ""} ` : ""
        } ${className}`}
        onClick={handleToggle}
      >
        <div className="w-full" >
          <div className="font-semibold  overflow-hidden whitespace-nowrap text-ellipsis">{title}</div>
          {description && (
            <div className={`text-sm overflow-hidden whitespace-nowrap text-ellipsis ${isActive ? "" : "text-gray-600"}  mt-1`}>
              {description}
            </div>
          )}
        </div>
        <div className={`flex gap-2 items-center  justify-end w-full ${renderPropStyle}`}>
          {renderProp ? renderProp : null}
          <Icon name={isActive ? "ArrowUp" : "ArrowDown"} />
        </div>
      </div>

      {isItemActive && (
        <div className="bg-gray-50 p-4 border drop-shadow-md rounded-md">
          {children}
        </div>
      )}
    </div>
  );
};

export { Accordion, AccordionItem };
