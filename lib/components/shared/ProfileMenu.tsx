"use client";

import { useLogout } from "@/lib/hooks";
import { Icon } from "@/lib/icon";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const ProfileMenu = ({ user }: any) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { mutate } = useLogout(setIsLoading);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getProfileCardLetter = () => {
    const source = user?.name || user?.email || "?";
    return source.charAt(0).toUpperCase();
  };

  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={() => setOpen(!open)}
        className="flex gap-2 border border-gray-300 items-center justify-between cursor-pointer p-2 rounded-md"
      >
        <div className="rounded-full bg-blue-600 text-white w-6 h-6 flex items-center justify-center">
          {getProfileCardLetter()}
        </div>
        <Icon name="ArrowDown" />
      </div>
      {open && (
        <div className="absolute mt-2 right-0 border border-gray-300 p-2 rounded-md bg-white shadow-md z-50 space-y-2 w-52">
          <div className="space-x-2 flex items-center">
            <Icon name="User" />
            <span className="truncate text-ellipsis w-48">
              {user?.name || user?.email}
            </span>
          </div>
          <div
            className={ `space-x-1 flex items-center ${isLoading ? 'opacity-60' : 'cursor-pointer'}`}
            onClick={() => {
              if (!isLoading) mutate();
            }}
          >
            <Icon name="LogOut" className="w-6 h-6" />
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
