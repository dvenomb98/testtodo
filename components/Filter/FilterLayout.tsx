import { Menu, Transition } from "@headlessui/react";
import { ArrowDownIcon, Bars2Icon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import React, { Dispatch, SetStateAction } from "react";
import Layout from "../Layout/Layout";
import { bgDark, bgLightSecondary, bgLightSecondary2, bgLightSecondary3 } from "../Styles/CustomStyles";
import { Difficulty, Status } from "../Utils/enums";

const headerClass = ` flex gap-2 items-center hover:text-primary-amber ${bgLightSecondary} ease-in-out p-4 rounded-md md:rounded-none md:rounded-l-md cursor-pointer w-[200px] `;

const linksDifficulty = [
  { value: Difficulty.Hard, label: "Hard" },
  { value: Difficulty.Medium, label: "Medium" },
  { value: Difficulty.Low, label: "Low" },
];

const linksStatus = [
  { value: Status.Completed, label: "Completed" },
  { value: Status.Progress, label: "Progress" },
  { value: Status.Active, label: "Active" },
];

interface FilterLayoutProps {
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}

const FilterLayout: React.FC<FilterLayoutProps> = ({
  searchValue,
  setSearchValue,
}) => {
  return (
    <div className={bgDark}>
      <Layout customStyles="p-0">
        <>
          <div className="flex flex-col gap-5 md:flex-row md:gap-0">
            <Menu>
              {({ open }) => (
                <div className="relative">
                  <Menu.Button className={headerClass}>
                    <ArrowDownIcon
                      className={`w-5 h-5 ${
                        open && "rotate-180"
                      } duration-300 transform`}
                    />
                    Filter by
                  </Menu.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Menu.Items
                      className={`absolute left-0 top-2 w-72 lg:w-96 origin-top-right shadow-lg ${bgLightSecondary} focus:outline-none rounded-md`}
                    >
                      <p className={`p-3 text-center border-b border-primary-gray ${bgLightSecondary3} text-primary-gray rounded-t-md`}>
                        Difficulty
                      </p>
                      {linksDifficulty.map((link) => (
                        <Menu.Item key={link.value}>
                          <div
                            className="flex gap-2 items-center p-3  cursor-pointer dark:hover:bg-slate-700 hover:bg-slate-300 rounded-md"
                            onClick={() => setSearchValue(link.value)}
                          >
                            <Bars2Icon className="w-3 h-3" />
                            <p>{link.label}</p>
                          </div>
                        </Menu.Item>
                      ))}
                      <p className={`p-3 text-center border-b border-primary-gray ${bgLightSecondary3} text-primary-gray rounded-t-md`}>
                        Status
                      </p>
                      {linksStatus.map((link) => (
                        <Menu.Item key={link.value}>
                          <div
                            className="flex gap-2 items-center p-3  cursor-pointer dark:hover:bg-slate-700 hover:bg-slate-300 rounded-md"
                            onClick={() => setSearchValue(link.value)}
                          >
                            <Bars2Icon className="w-3 h-3" />
                            <p>{link.label}</p>
                          </div>
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </div>
              )}
            </Menu>
            <input
              className={`dark:bg-slate-700 bg-slate-150 p-4 rounded-md md:rounded-none md:rounded-r-md  w-full md:w-1/2 xl:w-1/3`}
              placeholder="Quick search.."
              onChange={(event) => setSearchValue(event.target.value)}
              value={searchValue}
            />
          </div>
          {searchValue && (
            <div className="flex gap-1 items-center mt-2 text-primary-gray cursor-pointer dark:hover:text-white hover:text-black w-fit">
              <XMarkIcon className="w-4 h-4" />
              <p onClick={() => setSearchValue("")}>Reset filter</p>
            </div>
          )}
        </>
      </Layout>
    </div>
  );
};

export default FilterLayout;
