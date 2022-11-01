import React, { Dispatch, SetStateAction } from "react";
import { bgDark } from "../Styles/CustomStyles";
import { UserDataValues } from "../Utils/types";
import NavMenu from "./NavMenu";
import { Switch } from "@headlessui/react";
import { useTheme } from "next-themes";

interface MobileMenuProps {
  toggleMenu: boolean;
  userData: UserDataValues;
  setToggleMenu: Dispatch<SetStateAction<boolean>>;
}
const statisticsStyles =
  "flex justify-between w-full border-b border-primary-gray pb-2";

const MobileMenu: React.FC<MobileMenuProps> = ({
  toggleMenu,
  userData,
  setToggleMenu,
}) => {
  const { name, surname, email, currentXp, neededXp, level, rank, coins, img } =
    userData;
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`${bgDark} fixed top-0  h-screen right-0 w-3/4 lg:w-1/3 z-30 ease-in-out py-5 overflow-y-scroll ${
        toggleMenu ? "translate-x-100" : "translate-x-0"
      }`}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center flex-col gap-1">
          {img ? (
            <img
              src={img}
              className="w-20 h-20 rounded-full object-cover border border-primary-gray"
            />
          ) : (
            <div className="w-[125px] h-[125px] rounded-full bg-white" />
          )}
          <h2 className="font-semibold mt-1">
            {name} {surname}
          </h2>
          <p className="text-small text-primary-gray font-light">{email}</p>
        </div>

        <div className="flex flex-col items-start mx-5 md:mx-16 gap-2">
          <div className={statisticsStyles}>
            <p className=" text-primary-gray">Rank:</p>
            <p className="text-primary-amber font-bold">{rank}</p>
          </div>
          <div className={statisticsStyles}>
            <p className="text-primary-gray">Level:</p>
            <p>{level}</p>
          </div>
          <div className={statisticsStyles}>
            <p className="text-primary-gray">Coins:</p>
            <p>{coins}</p>
          </div>
          <div className={statisticsStyles}>
            <p className="text-primary-gray">XP:</p>
            <p>
              {currentXp}/{neededXp}
            </p>
          </div>

          <NavMenu setToggleMenu={setToggleMenu} />

          <div className="flex items-center justify-between w-full text-primary-gray mt-10">
            <p>Switch theme</p>
            <Switch
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`${
                theme === "dark" ? "bg-slate-700" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
              <span className="sr-only">Switch theme</span>
              <span
                className={`${
                  theme === "dark"
                    ? "translate-x-6 bg-secondary-blue"
                    : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
        </div>
      </div>
      <button
        onClick={() => setToggleMenu(false)}
        className="absolute top-5 left-5 text-primary-gray text-h2 hover:text-white ease-in-out"
      >
        X
      </button>
    </div>
  );
};

export default MobileMenu;
