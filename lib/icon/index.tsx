import { FC } from "react";
import Module from "./module";
import Logo from "./logo";
import { IoLogOutOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegFile } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
import { LuCalendarDays } from "react-icons/lu";
import { FaChevronLeft } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
const iconMap = {
  ArrowLeft : FaChevronLeft,
  ArrowUp: IoIosArrowUp,
  ArrowDown : IoIosArrowDown,
  Calendar : LuCalendarDays,
  Dashboard : LuLayoutDashboard,
  File : FaRegFile,
  Logo,
  LogOut: IoLogOutOutline,
  Module,
  Tick :FaCheck,
  User: FaRegUser,
} as const;

type IconName = keyof typeof iconMap;

interface IconProps {
  name: IconName;
  [key: string]: any;
}

export const Icon: FC<IconProps> = ({ name, ...rest }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className="h-4 w-4" {...rest} />;
};
