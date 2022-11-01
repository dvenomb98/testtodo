import { Bars4Icon, SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import Layout from "../Layout/Layout";
import { gradientText, gradientBgDown, bgLight } from "../Styles/CustomStyles";
import { UserDataValues } from "../Utils/types";
import MobileMenu from "./MobileMenu";

interface NavbarProps {
  userData?: UserDataValues;
}

const Navbar: React.FC<NavbarProps> = ({ userData }) => {
  const { user } = UserAuth();
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const router = useRouter()
  const { theme, setTheme} = useTheme()

  return user && userData ? (
    <div className={`${gradientBgDown}`}>
      <Layout customStyles="py-10">
        <div  className="flex items-center justify-between">
          <h1
            onClick={() => router.push("/main")}
            className={`${gradientText} font-headFamily text-h2 font-semibold w-fit  cursor-pointer`}
          >
            REAL LIFE MMORPG
          </h1>
          <div className="flex gap-10 items-center ">
          
          <Bars4Icon
            onClick={() => setToggleMenu(true)}
            className="w-7 h-7 cursor-pointer"
          />
          </div>
        </div>
      </Layout>
      {toggleMenu && (
        <div className="fixed h-screen inset-0 w-full bg-primary-black/50 z-50">
          <MobileMenu
            userData={userData}
            toggleMenu={toggleMenu}
            setToggleMenu={setToggleMenu}
          />
        </div>
      )}
    </div>
  ) : (
    <div className={`${bgLight}`}>
      <Layout customStyles="py-5">
        <div className="flex justify-between items-center">
          <h1
            className={`${gradientText} font-headFamily text-h2 font-semibold`}
          >
            REAL LIFE MMORPG
          </h1>
          { theme === "dark" ?
           <SunIcon onClick={() => setTheme("light")} className="w-7 h-7 cursor-pointer fill-white" />
            
            :
            <MoonIcon onClick={() => setTheme("dark")} className="w-7 h-7 cursor-pointer fill-black" />
          }
          
        </div>
      </Layout>
    </div>
  );
};

export default Navbar;
