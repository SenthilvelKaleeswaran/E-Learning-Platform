"use client";
import { Drawer, DrawerPanel, DrawerTrigger } from "@/lib/components/ui";
import Logo from "./Logo";
import ProfileMenu from "./ProfileMenu";
import { Icon } from "@/lib/icon";
import RenderSpace from "./RenderSpace";

const Header = ({ user, drawerContent, header }: any) => {
  return (
    <div className="flex justify-between items-center py-2 px-4 md:px-8  border-b border-gray-300">
      <div className="flex gap-4">
        <RenderSpace condition={drawerContent}>
          <div className="block md:hidden">
            <Drawer>
              <DrawerTrigger>
                <div className="border p-2 rounded-md h-fit ">
                  <Icon name="Menu" />
                </div>
              </DrawerTrigger>
              <DrawerPanel header={header}>{drawerContent}</DrawerPanel>
            </Drawer>
          </div>
        </RenderSpace>

        <Logo />
      </div>
      <ProfileMenu user={user} />
    </div>
  );
};

export default Header;
