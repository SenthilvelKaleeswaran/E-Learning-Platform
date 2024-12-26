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
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) => {
  const { allowMultiple } = useAccordionContext();
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    if (!allowMultiple) setIsActive(!isActive);
    else setIsActive((prev) => !prev);
  };

  return (
    <div className="border mb-2 rounded-md">
      <div
        className={`flex gap-4 justify-between items-center cursor-pointer py-2 px-4  ${
          isActive ? "bg-gray-200 text-blue-500" : ""
        }`}
        onClick={handleToggle}
      >
        <div>
          <div className="font-semibold">{title}</div>
          {description && (
            <div className={`text-sm ${isActive ? "" : "text-gray-600"} mt-1`}>
              {description}
            </div>
          )}
        </div>

        <Icon name={isActive ? "ArrowUp" : "ArrowDown"} />
      </div>

      {isActive && (
        <div className=" bg-gray-100 p-4 border-t">
          {children}
        </div>
      )}
    </div>
  );
};

export { Accordion, AccordionItem };
