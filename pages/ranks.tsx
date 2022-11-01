import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import InnerFooter from "../components/Footers/InnerFooter";
import Navbar from "../components/Header/Navbar";
import SubNavbar from "../components/Header/SubNavbar";
import Layout from "../components/Layout/Layout";
import { bgDark, bgLightSecondary, iconClassesSubNav } from "../components/Styles/CustomStyles";
import { levelsForRank } from "../components/Utils/getValues";
import { UserAuth } from "../context/AuthContext";

const Ranks: NextPage = () => {
  const { userData } = UserAuth();
  const router = useRouter();

  const pushToDashboard = () => {
    router.push("/main");
  };

  const titles = [
    {
      title: "Dashboard",
      func: pushToDashboard,
      icon: <ChevronLeftIcon className={iconClassesSubNav} />,
    },
  ];

  return (
    userData && (
      <>
        <Navbar userData={userData} />
        <SubNavbar titles={titles} />

        <div className={`${bgDark}`}>
          <Layout>
            <div className="flex flex-col gap-5 lg:w-2/3">
            <h2 className="text-h1 uppercase font-headFamily">Rank list</h2>
            <div className={`${bgLightSecondary}  rounded-md p-10 text-primary-black dark:text-primary-gray flex flex-col gap-2`}>
            <p>Your current rank: <span className="text-primary-amber font-bold">{userData.rank}</span></p>
            <p>Your current level: <span className="text-black dark:text-white font-bold">{userData.level}</span></p>
            </div>
            <div className="flex flex-col gap-2">
            {levelsForRank?.map(({ level, rank }, index) => (
              <Disclosure key={rank}>
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={`${bgLightSecondary} p-4 rounded-md text-left flex items-center justify-between ${userData.rank === rank && " border border-primary-amber"}`}
                    >
                      <p><span className="text-primary-gray">{index}:</span> {rank}</p>
                      <ChevronDownIcon
                        className={`${open && "rotate-180 transform"} h-5 w-5`}
                      />
                    </Disclosure.Button>    
                    <Disclosure.Panel className={`text-primary-gray p-2`}>
                      Required level: {level}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>


            </div>
          </Layout>
        </div>
        <InnerFooter />
      </>
    )
  );
};

export default Ranks;
