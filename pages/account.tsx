import {
  ChevronLeftIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/outline";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

import Navbar from "../components/Header/Navbar";
import SubNavbar from "../components/Header/SubNavbar";
import Layout from "../components/Layout/Layout";
import {
  bgDark,
  bgLight,
  iconClassesSubNav,
} from "../components/Styles/CustomStyles";
import { UserAuth } from "../context/AuthContext";
import ProgressBar from "@ramonak/react-progress-bar";
import { useModalContext } from "../components/Modal/ModalContext";
import UploadModal from "../components/Account/UploadModal";
import InnerFooter from "../components/Footers/InnerFooter";
import { boxClasses, itemsContainer } from "./marketplace";
import Item from "../components/Market/Item";
import { Boosters, Items } from "../components/Utils/types";

const boxStyles = "flex flex-col gap-2";
const boxHeaderStyles = "text-primary-gray";
const boxValueStyles = "font-semibold text-h4";

const Account: NextPage = () => {
  const { userData } = UserAuth();
  const router = useRouter();
  const { showUploadModal } = useModalContext();

  const pushToDashboard = () => {
    router.push("/main");
  };

  const titles = [
    {
      title: "Dashboard",
      func: pushToDashboard,
      icon: <ChevronLeftIcon className={iconClassesSubNav} />,
    },
    {
      title: "Upload photo",
      func: showUploadModal,
      icon: <DocumentArrowUpIcon className={iconClassesSubNav} />,
    },
  ];

  if (!userData) return;

  const {
    name,
    surname,
    classType,
    coins,
    neededXp,
    currentXp,
    tasks,
    email,
    rank,
    img,
    completedTasks,
    level,
  } = userData;

  return (
    userData && (
      <>
        <Navbar userData={userData} />
        <SubNavbar titles={titles} />

        <div className={`${bgDark}`}>
          <Layout>
            <>
            <div className="flex flex-col gap-10 xl:w-1/2">
              <div className="flex items-center gap-5 border-b-[0.25px] border-primary-gray pb-5">
                {img ? (
                  <img
                    src={img}
                    className="w-[125px] h-[125px] rounded-full object-cover border border-primary-gray"
                  />
                ) : (
                  <div className="w-[125px] h-[125px] rounded-full bg-white" />
                )}

                <div className="basis-1/3">
                  <h2 className="text-h2">{name}</h2>
                  <h2 className="text-h2">{surname}</h2>
                  <p className="text-primary-amber text-h1 mt-2 font-bold">
                    {rank}
                  </p>
                </div>
              </div>
              <div className={`${bgLight} rounded-md p-10 flex flex-col gap-5`}>
                <div className={boxStyles}>
                  <p className={boxHeaderStyles}>Display name:</p>
                  <p className={boxValueStyles}>
                    {name} {surname}
                  </p>
                </div>
                <div className={boxStyles}>
                  <p className={boxHeaderStyles}>Email:</p>
                  <p className={boxValueStyles}>{email}</p>
                </div>
              </div>

              <div className={`${bgLight} rounded-md p-10 flex flex-col gap-5`}>
                <div className={boxStyles}>
                  <p className={boxHeaderStyles}>Current tasks:</p>
                  <p className={boxValueStyles}>{tasks?.length}</p>
                </div>

                <div className={boxStyles}>
                  <p className={boxHeaderStyles}>Completed tasks:</p>
                  <p className={boxValueStyles}>{completedTasks}</p>
                </div>

                <div className={boxStyles}>
                  <p className={boxHeaderStyles}>Next level</p>

                  <ProgressBar
                    completed={currentXp}
                    maxCompleted={neededXp}
                    isLabelVisible={false}
                    bgColor={"#FFA500"}
                    labelAlignment={"right"}
                  />
                  <p className="self-end text-secondary-blue md:self-start">{`${currentXp}/${neededXp} XP`}</p>
                </div>
              </div>
              
            </div>
            <div className="flex flex-col gap-5 mt-10">
                <p className="text-h2">Inventory</p>
                {userData.boosters?.length ? (
                  <div className={boxClasses}>
                    <div className={itemsContainer}>
                      {userData.boosters?.map(
                        (item: Boosters, index: number) => (
                          <Item booster={item} key={index} hideButton />
                        )
                      )}
                    </div>
                  </div>
                ) : null}
                {userData.items?.length ? (
                  <div className={boxClasses}>
                    <div className={itemsContainer}>
                      {userData.items?.map((item: Items, index: number) => (
                        <Item item={item} key={index} hideButton />
                      ))}
                    </div>
                  </div>
                ) : null}

                {!userData?.boosters?.length && !userData?.items?.length && (
                  <p>
                    You dont have any items avaible. You can buy them at market
                    place.
                  </p>
                )}
              </div>
              </>
          </Layout>
        </div>
        <UploadModal />
        <InnerFooter />
      </>
    )
  );
};

export default Account;
