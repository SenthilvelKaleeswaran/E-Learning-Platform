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
import { AiOutlineMenu } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuBookA } from "react-icons/lu";
const iconMap = {
  ArrowLeft : FaChevronLeft,
  ArrowUp: IoIosArrowUp,
  ArrowDown : IoIosArrowDown,
  Book :LuBookA,
  Calendar : LuCalendarDays,
  Close : IoClose,
  Dashboard : LuLayoutDashboard,
  File : FaRegFile,
  Logo,
  LogOut: IoLogOutOutline,
  Menu : AiOutlineMenu,
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
