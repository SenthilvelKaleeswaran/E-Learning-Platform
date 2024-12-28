"use client";
import { Icon } from "@/lib/icon";
import { useState, useEffect, useCallback, useRef } from "react";

const OptionsSelector = ({ handleEdit, handleDelete, handleView, deleteLoading }: {
  handleEdit: () => void;
  handleDelete: () => void;
  handleView: () => void;
  deleteLoading?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const toggleMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleOptionClick = (callback: () => void) => (e: React.MouseEvent) => {
    e.stopPropagation();
    callback();
  };

  const options = [
    { name: "View", icon: "View", action: handleView },
    { name: "Edit", icon: "Edit", action: handleEdit },
    { name: "Delete", icon: "Trash", action: handleDelete, isLoading: deleteLoading },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={toggleMenu} className="rounded-full p-1 border border-gray-400 bg-white w-fit">
        <Icon name="Options" />
      </div>
      {open && (
        <div className="absolute mt-2 right-0 border border-gray-300 p-2 rounded-md bg-white shadow-md z-50 space-y-2 w-52">
          {options.map(({ name, icon, action, isLoading }, index) => (
            <div 
              key={index} 
              className={`space-x-2 flex items-center cursor-pointer ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={isLoading ? undefined : handleOptionClick(action)}
            >
              <Icon name={isLoading ? 'Loading' : icon as any} className={`w-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptionsSelector;