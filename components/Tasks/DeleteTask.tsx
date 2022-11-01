import React, { useState } from "react";
import { useModalContext } from "../Modal/ModalContext";
import { Task } from "../Utils/types";
import { UserAuth } from "../../context/AuthContext";
import Modal from "../Modal/Modal";
import {
  errorPopper,
  pinkGradientButton,
  pinkGradientButtonSecondary,
  successPopper,
  warningPopper,
} from "../Styles/CustomStyles";
import Loader from "../Atoms/Loader";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import { ModalType } from "../Utils/enums";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

interface DeleteTaskProps {
  task: Task[];
}

const DeleteTask: React.FC<DeleteTaskProps> = ({ task }) => {
  const { openDeleteTaskModal, hideAllModals } = useModalContext();
  const { user, getUserData } = UserAuth();
  const [deleted, setDeleted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
  const router = useRouter()

  if (!task.length) return null;

  const { id } = task[0];

  // DELETE TASK

  const taskDeleted = () => {
      setDeleted(true)
      setTimeout(() => {
        setLoadingDelete(false)
        hideAllModals()
        router.push("/main")
      },500)
  }

  const deleteTask = async (id: string) => {
    try {
     setLoadingDelete(true)
      const ref = doc(db, "users", user.uid);
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(ref);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }
        // get tasks and remove current task
        const newTasks = [
          ...sfDoc.data().tasks.filter((t: Task) => t.id !== id),
        ];
        transaction.update(ref, { tasks: newTasks });
      });
      await getUserData();
      return true

    } catch (e) {
      setFormError("Deleting task failed. Please, try it again.");
      setLoadingDelete(false)
    }
  };

  return (
    <Modal openModal={openDeleteTaskModal} modalType={!deleted ? ModalType.Dark : ModalType.Success} onModalEnter={() => setFormError("")}>
      <div className="p-5 text-white">

        {deleted ? (
          <div className="flex gap-2 items-center">
            <CheckCircleIcon className="w-8 h-8" />
            <p >
            <span className="font-bold">Task was successfully deleted!{" "}</span>
              Redirecting...
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p>
              Are you sure you want delete this task? Action cannot be returned!
            </p>
            {formError && <p className={errorPopper}>{formError}</p>}
            <button
              className={`${pinkGradientButtonSecondary} text-white w-full mt-2 outline-none`}
              onClick={async () => {
                const result = await deleteTask(id)
                result && taskDeleted()
            }}
            >
              {loadingDelete ? (
                      <Loader loading={loadingDelete} />
                    ) : (
                      "Confirm"
                    )}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default DeleteTask;
