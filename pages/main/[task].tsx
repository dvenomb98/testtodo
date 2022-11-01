import { ChevronLeftIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import InnerFooter from "../../components/Footers/InnerFooter";
import Navbar from "../../components/Header/Navbar";
import SubNavbar from "../../components/Header/SubNavbar";
import { useModalContext } from "../../components/Modal/ModalContext";
import { iconClassesSubNav } from "../../components/Styles/CustomStyles";
import DeleteTask from "../../components/Tasks/DeleteTask";
import EditTask from "../../components/Tasks/EditTask";

import TaskID from "../../components/Tasks/TaskID";
import { Task } from "../../components/Utils/types";
import { UserAuth } from "../../context/AuthContext";

const SingleTask: NextPage = () => {
  const { userData } = UserAuth();
  const router = useRouter();
  const { task } = router.query;
  const { showEditTaskModal, showDeleteTaskModal } = useModalContext();

  const filteredTask =
    userData?.tasks?.filter((t: Task) => t.id === task) || [];

  const pushToDashboard = () => {
    router.push("/main")
  }

  const titles = [
    {
      title: "Dashboard",
      func: pushToDashboard,
      icon: <ChevronLeftIcon className={iconClassesSubNav} />
    },
    {
      title: "Edit task",
      func: showEditTaskModal,
      icon: <PencilIcon className={iconClassesSubNav} />,
    },
    {
      title: "Delete task",
      func: showDeleteTaskModal,
      icon: <TrashIcon className={iconClassesSubNav} />,
    }
  ];

  return (
    <>
      <Navbar userData={userData} />
      <SubNavbar titles={titles} />
      <TaskID task={filteredTask} />
      <EditTask task={filteredTask} />
      <DeleteTask task={filteredTask} />
      <InnerFooter />
    </>
  );
};

export default SingleTask;
