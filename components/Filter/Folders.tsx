import { Menu, Transition } from "@headlessui/react";
import { Bars2Icon, FolderIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import Layout from "../Layout/Layout";
import { useModalContext } from "../Modal/ModalContext";
import { bgDark, bgLightSecondary, iconClassesSubNav } from "../Styles/CustomStyles";


interface FoldersProps {
  folders: string[];
  setSelectedFolder: React.Dispatch<React.SetStateAction<string>>;
  selectedFolder: string;
}

const Folders: React.FC<FoldersProps> = ({
  folders,
  setSelectedFolder,
  selectedFolder,
}) => {

 const {showCreateFolderModal} = useModalContext()



  return (
    <div className={bgDark}>
      <Layout customStyles="pb-5">
        <>
          <div className="flex flex-col">
            <Menu>
              <Menu.Button
                className={`flex gap-2 items-center hover:text-primary-amber ${bgLightSecondary} ease-in-out p-4 rounded-md cursor-pointer w-[200px]`}
              >
                <FolderIcon className={iconClassesSubNav} />
                {selectedFolder}
              </Menu.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                className="z-50"
              >
                <Menu.Items className={`absolute left-0 top-2 w-56 origin-top-right ${bgLightSecondary} shadow-lg focus:outline-none rounded-md`}>
                  {folders?.map((label: string, index: number) => (
                    <Menu.Item key={index}>
                      <div
                        key={index}
                        onClick={() => setSelectedFolder(label)}
                        className={`flex gap-2 items-center p-3 cursor-pointer hover:text-primary-amber rounded-md ${
                          selectedFolder === label
                            ? "dark:bg-slate-700 bg-slate-300"
                            : "dark:bg-slate-800 bg-slate-200"
                        }`}
                      >
                        <Bars2Icon  className="w-3 h-3"  />
                        <p>{label}</p>
                      </div>
                    </Menu.Item>
                  ))}

                  <Menu.Item >
                    <div onClick={showCreateFolderModal} className="flex items-center justify-center group hover:cursor-pointer cursor-pointer ease-in-out transform">
                      <PlusCircleIcon className="w-5 h-5 text-primary-gray self-center m-3 group-hover:text-primary-amber " />
                    </div>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </>
      </Layout>
    </div>
  );
};

export default Folders;
