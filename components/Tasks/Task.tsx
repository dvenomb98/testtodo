import { useRouter } from "next/router";
import React from "react";
import { bgLight, bgLightSecondary2 } from "../Styles/CustomStyles";
import {
  getCoins,
  getDifficultyColor,
  getStatusColor,
  getXp,
} from "../Utils/getValues";
import { Task } from "../Utils/types";
import ReactMarkdown from "react-markdown";
import { UserAuth } from "../../context/AuthContext";

interface TaskProps {
  userTasks: Task;
}

const Task: React.FC<TaskProps> = ({ userTasks }) => {
  const { xpMultipler, coinsMultipler } = UserAuth();

  const { created_date, difficulty, id, name, status } = userTasks;
  const router = useRouter();

  const getSingleTask = () => {
    router.push(`/main/${id}`);
  };

  return (
    <div key={id} >
      <div
        className={`text-center text-white w-full rounded-t-md ${getDifficultyColor(
          difficulty
        )} py-1`}
      >
        {difficulty}
      </div>
      <div className={`${bgLight} p-2 px-4`}>
        <div className="flex flex-col">
          <div className="flex  justify-between">
            <p className={`${getStatusColor(status)} text-sm font-light`}>
              {status}
            </p>
            <p className="text-primary-gray text-sm font-light">
              {created_date.substring(0, 10)}
            </p>
          </div>
          <h2 className="font-semibold underline underline-offset-4 text-h4 py-12 px-4">
            {name}
          </h2>
        </div>
      </div>

      <div
        onClick={getSingleTask}
        className={`${bgLightSecondary2} shadow-md rounded-b-md flex justify-between p-4 text-primary-gray group cursor-pointer `}
      >
        <p className="dark:text-primary-gray text-black hover:underline underline-offset-2 cursor-pointer group-hover:text-primary-amber">
          View more
        </p>
        <div className="flex flex-row gap-5">
          <p className="text-secondary-blue font-bold">
            {getXp(difficulty, xpMultipler)} Xp
          </p>

          <p className="text-primary-amber font-bold">
            {getCoins(difficulty, coinsMultipler)} Coins
          </p>
        </div>
      </div>
    </div>
  );
};

export default Task;
