"use client";

import { Icon } from "@/lib/icon";
import { createContext, useContext, useState, useRef, useEffect } from "react";

const DrawerContext = createContext<any>({});

const useAccordion = () => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error("Drawer components must be used within a Drawer");
  }

  return context;
};

const Drawer = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      drawerRef.current &&
      !drawerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <DrawerContext.Provider value={{ isOpen, setIsOpen, drawerRef }}>
      {children}
    </DrawerContext.Provider>
  );
};

const DrawerTrigger = ({ children }: any) => {
  const { setIsOpen, isOpen } = useAccordion();
  return (
    <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
      {children}
    </div>
  );
};

const DrawerPanel = ({ children, header }: any) => {
  const { isOpen, setIsOpen, drawerRef } = useAccordion();
  return (
    <div
      ref={drawerRef}
      className={`z-50 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } fixed left-0 top-0 h-full w-64 bg-white shadow-lg`}
    >
      <div className="flex gap-2 justify-between items-center p-4 border-b">
        <p className="text-base font-semibold">{header || "Panel"}</p>
        <div
          onClick={() => setIsOpen(false)}
          className="p-2 rounded-full hover:bg-gray-200 cursor-pointer w-fit"
        >
          <Icon name="Close" />
        </div>
      </div>
      {children}
    </div>
  );
};

export { Drawer, DrawerTrigger, DrawerPanel };
