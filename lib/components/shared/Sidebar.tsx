"use client";

import { MenuList } from "@/lib/constants";
import { Icon } from "@/lib/icon";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname.split("/").pop();
  return (
    <div className="p-2  border-r border-gray-300">
      <div className="space-y-4 w-48">
        {MenuList?.map((item: any) => {
          const isActivePath = currentPath === item?.id;
          return (
            <div
              className={`flex gap-2 items-center w-full p-2 text-sm cursor-pointer rounded-md ${
                isActivePath
                  ? "text-blue-500 bg-blue-100 font-semibold"
                  : "hover:text-blue-500 hover:bg-blue-200"
              }`}
              onClick={() => router.push(item?.id)}
            >
              <Icon name={item?.icon} />
              <p>{item?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
