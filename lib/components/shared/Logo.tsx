import { Icon } from "@/lib/icon";
import React from "react";

const Logo = () => {
  return (
    <div className="flex gap-1 items-center h-8">
       <Icon name="Logo" className="w-6 h-6 mt-1" />
      <p className="text-2xl font-semibold">Edu Cat</p>
      <Icon name="LogoTail" className="w-4 h-4 rotate-90 mt-1.5" />
    </div>
  );
};

export default Logo;
