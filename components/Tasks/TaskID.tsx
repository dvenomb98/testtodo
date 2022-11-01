import React from "react";
import FullPageLoader from "../Layout/FullPageLoader";
import Layout from "../Layout/Layout";
import { bgDark, bgLight, bgLightSecondary2 } from "../Styles/CustomStyles";
import {
  getCoins,
  getDifficultyTextColor,
  getStatusColor,
  getXp,
} from "../Utils/getValues";
import { Task } from "../Utils/types";
import ReactMarkdown from "react-markdown"


interface TaskIDProps {
  task: Task[];
}

const descriptionStyles = "text-sm text-primary-gray";
const boxStyles = "flex flex-col gap-2";

const TaskID: React.FC<TaskIDProps> = ({ task }) => {
  if (!task.length) return <FullPageLoader />;

  const { created_date, description, difficulty, id, name, status } = task[0];

  return (
    <div className={`${bgDark} min-h-screen`}>
      <Layout>
        <div className="flex flex-col gap-5 lg:w-2/3">
          <div>
            <p
              className={` ${bgLightSecondary2} text-center p-2 w-full rounded-t-md`}
            >
              Informations
            </p>

            <div
              className={` ${bgLight} rounded-b-md p-8 dark:shadow-black/20 shadow-xl flex flex-col gap-5`}
            >
              <div className={`${boxStyles}`}>
                <p className={descriptionStyles}>Title:</p>
                <p className="text-h3 underline underline-offset-4 font-bold">{name}</p>
              </div>
              <div className={`${boxStyles}`}>
                <p className={descriptionStyles}>Description:</p>
                <ReactMarkdown className="prose dark:prose-invert " children={description} /> 
              </div>
            </div>
          </div>
          <div>
            <p
              className={` ${bgLightSecondary2} text-center p-2 w-full rounded-t-md`}
            >
              Details
            </p>
            <div
              className={` ${bgLight} rounded-md p-8 dark:shadow-black/20 shadow-xl flex flex-col gap-5 md:grid md:grid-cols-2 `}
            >
              <div className={`${boxStyles}`}>
                <p className={descriptionStyles}>ID:</p>
                <p>{id}</p>
              </div>

              <div className={`${boxStyles}`}>
                <p className={descriptionStyles}>Difficulty:</p>
                <p className={`${getDifficultyTextColor(difficulty)} text-h3`}>
                  {difficulty}
                </p>
              </div>
              <div className={`${boxStyles}`}>
                <p className={descriptionStyles}>Status:</p>
                <p className={`${getStatusColor(status)} text-h3`}>{status}</p>
              </div>
              <div className={`${boxStyles}`}>
                <p className={descriptionStyles}>Created:</p>
                <p>{created_date.substring(0, 10)}</p>
              </div>
            </div>
          </div>
          <div>
            <p
              className={` ${bgLightSecondary2} text-center p-2 w-full rounded-t-md`}
            >
              Reward
            </p>
            <div
              className={`${bgLight} dark:shadow-black/20 shadow-xl p-8 flex flex-col items-center gap-5 rounded-md`}
            >
              <div className="flex justify-between w-full md:justify-evenly">
                <p className="text-secondary-blue font-bold text-h2">
                  {getXp(difficulty)} XP
                </p>
                <p className="text-primary-amber font-bold text-h2">
                  {getCoins(difficulty)} Coins
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default TaskID;
