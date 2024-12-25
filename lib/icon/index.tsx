import { FC } from "react";
import Logo from "./logo";

const iconMap = {
    Logo
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
