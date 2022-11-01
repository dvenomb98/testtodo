import {
  AcademicCapIcon,
  ArrowUturnLeftIcon,
  BuildingOfficeIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React, { Dispatch, SetStateAction } from "react";
import { UserAuth } from "../../context/AuthContext";
import { bgLightSecondary } from "../Styles/CustomStyles";

interface NavMenuProps {
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
}

const NavMenu: React.FC<NavMenuProps> = ({ setToggleMenu }) => {
  const { logout } = UserAuth();
  const router = useRouter();

  const pushTo = (url: string) => {
    setToggleMenu(false)
    router.push(url)
  }

  const menuList = [
    {
      name: "Dashboard",
      icon: <PencilSquareIcon className="w-5 h-5" />,
      func: () => pushTo("/main"),
    },
    {
      name: "Account",
      icon: <UserCircleIcon className="w-5 h-5" />,
      func: () => pushTo("/account"),
    },
    {
      name: "Ranks",
      icon: <AcademicCapIcon className="w-5 h-5" />,
      func: () => pushTo("/ranks")
    },
    {
      name: "Market place",
      icon: <BuildingOfficeIcon className="w-5 h-5" />,
      func: () => pushTo("/marketplace")
    },
    {
      name: "Sign out",
      func: logout,
      icon: <ArrowUturnLeftIcon className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="mt-10 w-full">
      <h2 className=" text-primary-gray mb-2">Navigation</h2>
      <ul className={`${bgLightSecondary} flex flex-col rounded-md`}>
        {menuList.map((item, index) => (
          <li
            key={index}
            onClick={item.func && item.func}
            className="flex gap-2 ease-in-out cursor-pointer items-center p-3 dark:hover:bg-slate-700 hover:bg-slate-300 rounded-md"
          >
            {item.icon}
            {item.name}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;
