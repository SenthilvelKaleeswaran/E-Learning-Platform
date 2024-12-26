import { FC } from "react";
import Module from "./module";
import Logo from "./logo";
import { IoLogOutOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaRegFile } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { IoIosArrowUp } from "react-icons/io";

const iconMap = {
  ArrowUp: IoIosArrowUp,
  ArrowDown : IoIosArrowDown,
  Dashboard : LuLayoutDashboard,
  File : FaRegFile,
  Logo,
  LogOut: IoLogOutOutline,
  Module,
  Tick :TiTick,
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
