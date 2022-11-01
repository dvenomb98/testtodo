import type { NextPage } from "next";
import { useRouter } from "next/router";
import Navbar from "../components/Header/Navbar";
import SubNavbar from "../components/Header/SubNavbar";
import { UserAuth } from "../context/AuthContext";
import React, { useState } from "react";
import MyTasks from "../components/Tasks/MyTasks";
import NewTask from "../components/Tasks/NewTask";
import { useModalContext } from "../components/Modal/ModalContext";
import InnerFooter from "../components/Footers/InnerFooter";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { iconClassesSubNav } from "../components/Styles/CustomStyles";
import FilterLayout from "../components/Filter/FilterLayout";
import Folders from "../components/Filter/Folders";
import CreateFolder from "../components/Filter/CreateFolder";



const Main: NextPage = () => {
  const { user, userData, getUserData } = UserAuth();
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("")
  const [selectedFolder, setSelectedFolder] = useState<string>("All")
  const { showNewTaskModal } = useModalContext()

  if (!user) {
    router.push("/");
  }

  const titles = [
  {title: "Create a new task", func: showNewTaskModal, icon: <WrenchScrewdriverIcon className={iconClassesSubNav} /> }
  ]

  return (
    <>
      <Navbar userData={userData} />
      <SubNavbar titles={titles} />
      <Folders folders={userData.folders} setSelectedFolder={setSelectedFolder} selectedFolder={selectedFolder} />
      <FilterLayout searchValue={searchValue} setSearchValue={setSearchValue} />
      <MyTasks userTasks={userData.tasks || []} searchValue={searchValue} selectedFolder={selectedFolder} />
      <NewTask refetch={getUserData} />
      <InnerFooter />
      <CreateFolder />
    </>
  );
};

export default Main;
