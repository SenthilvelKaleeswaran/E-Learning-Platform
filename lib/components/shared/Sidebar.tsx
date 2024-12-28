"use client";

import { MenuList } from "@/lib/constants";
import { Icon } from "@/lib/icon";
import { usePathname, useRouter } from "next/navigation";
import { Button, LinkButton } from "@/lib/components/ui";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname.split("/").pop();
  console.log({pathname : pathname.split('/')})
  return (
    <div className="p-2 border-r border-gray-300 w-full h-full ">
      <div className="space-y-4 w-full">
        <Button
          onClick={() => router.push("/create")}
          className="flex items-center justify-center gap-2 w-full"
          disabled={pathname.split('/').includes("create")}
        >
          <span>
            <Icon name="Add" />
          </span>
          <span>Create Your Course</span>
        </Button>
        {MenuList?.map((item: any) => {
          const isActivePath = currentPath === item?.id;
          return (
            <div
              key={item?.id}
              className={`flex gap-2 items-center w-full p-2 text-sm cursor-pointer rounded-md ${
                isActivePath
                  ? "text-blue-500 bg-blue-100 font-semibold"
                  : "hover:text-blue-500 hover:bg-blue-200"
              }`}
              onClick={() => router.push(`/${item?.id}`)}
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
