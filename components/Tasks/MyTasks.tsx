import React from "react";

import Layout from "../Layout/Layout";
import { bgDark } from "../Styles/CustomStyles";

import { getEditedString } from "../Utils/getValues";
import { Task as TaskType } from "../Utils/types";
import Task from "./Task";

interface TasksProps {
  userTasks: TaskType[];
  searchValue: string;
  selectedFolder: string;
}

const MyTasks: React.FC<TasksProps> = ({
  userTasks,
  searchValue,
  selectedFolder,
}) => {
  if (!userTasks.length)
    return (
      <div className={`${bgDark} min-h-screen`}>
        <Layout>
          <div className="flex flex-col gap-2">
            <h2 className="text-h2 font-headFamily">
              You dont have any available tasks.
            </h2>
          </div>
        </Layout>
      </div>
    );

  // allow to reverse an array so newest todos will be at the top, need rework maybe
  const reversedArray: TaskType[] = Object.assign([], userTasks).reverse();
  const filteredByPage = reversedArray?.filter((v) =>
    v?.folder?.includes(selectedFolder)
  );
  const searchValueEdit = getEditedString(searchValue);

  return (
    <div className={`${bgDark} min-h-screen`}>
      <Layout>
        <div>
          <h2 className="text-h1 uppercase font-headFamily">My tasks</h2>

          <div className="flex flex-col mt-5 lg:gap-x-5 lg:grid lg:grid-cols-2 lg:auto-rows-fr">
            {filteredByPage.length ? (
              filteredByPage
                .filter((task: any) => {
                  if (!searchValue) return task
                  if (
                    task?.difficulty?.toLowerCase().includes(searchValueEdit) ||
                    task?.status?.toLowerCase().includes(searchValueEdit)
                  )
                    return task;
                  if (getEditedString(task?.name).includes(searchValueEdit))
                    return task;
                  if (
                    getEditedString(task?.description).includes(searchValueEdit)
                  )
                    return task;
                })
                .map((task) => {
                  
                  return <Task userTasks={task} />
                })
            ) : (
              <div>
                You dont have any tasks in page:{" "}
                <span className="text-primary-gray">{selectedFolder}</span>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default MyTasks;
