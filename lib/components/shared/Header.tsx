"use client";
import Logo from "./Logo";
import ProfileMenu from "./ProfileMenu";

const Header = ({user} : any) => {
  return (
    <div className="flex justify-between items-center py-2 px-8  border-b border-gray-300">
      <Logo />
      <ProfileMenu user={user} />
    </div>
  );
};

export default Header;
