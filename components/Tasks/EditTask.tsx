import React, { useState } from "react";
import { useModalContext } from "../Modal/ModalContext";
import { Task } from "../Utils/types";
import * as Yup from "yup";
import { UserAuth } from "../../context/AuthContext";
import { Field, Form, Formik } from "formik";
import Modal from "../Modal/Modal";
import {
  errorPopper,
  formErrorText,
  inputStyles,
  pinkGradientButtonSecondary,
} from "../Styles/CustomStyles";
import { Difficulty, ModalType, Status } from "../Utils/enums";
import Loader from "../Atoms/Loader";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "../../firebase";
import { getCoins, getRanks, getXp } from "../Utils/getValues";
import { CheckCircleIcon} from "@heroicons/react/24/solid";

interface EditTaskProps {
  task: Task[];
}

const EditTask: React.FC<EditTaskProps> = ({ task }) => {
  const { openEditTaskModal } = useModalContext();
  const { user, getUserData, userData, xpMultipler, coinsMultipler } = UserAuth();
  const [sended, setSended] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>("");
  const userFolders = userData?.folders;


  if (!task.length) return null;

  // RETURN WHEN TASK WAS COMPELTED SO USER CANT EDIT IT AGAIN

  if (task[0].status === Status.Completed)
    return (
      <Modal openModal={openEditTaskModal} modalType={ModalType.Success} onModalEnter={() => {setSended(false);setFormError("")}}>
        <div className="p-6 flex flex-row items-center gap-5">
          <CheckCircleIcon className="w-8 h-8" />
          <p className="text-white">
            <span className="font-bold">Task was completed!{" "}</span>
            Completed tasks cannot be edited again.
          </p>
        </div>
      </Modal>
    );

  const { created_date, description, difficulty, id, name, status, folder } = task[0];

  // initial values
  const initialValues: Task = {
    id: id,
    name: name,
    description: description,
    created_date: created_date,
    difficulty: difficulty,
    status: status,
    folder: folder
  };
  // validation = dont need to valid other values
  const validSchema = Yup.object().shape({
    name: Yup.string().required("Required").max(40, "Too long!"),
    description: Yup.string().required("Required"),
  });

  // EDIT TASK / FINISH TASK - ONLY FUNCTION WHERE WE UPDATE USER STATS

  const editTask = async (values: Task) => {
    try {
      const ref = doc(db, "users", user.uid);

      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(ref);

        if (!sfDoc.exists()) {
          setFormError("Editting a task failed. Please, try it again.");
          return;
        }
        const data = sfDoc.data();

        // REMOVE CURRENT TASK AND ADD UPDATED TASK (firebase dont allow to update object in arrays)
        const newTasks = [
          ...data.tasks.filter((t: Task) => t.id !== values.id),
          values,
        ];

        // UPDATE STATS
        if (values.status === Status.Completed) {
          // CALC. NEW USER COINS AND XPS ON COMPLETED TASK
          const newCoins = data.coins + getCoins(values.difficulty, coinsMultipler);
          const newCurrentXp = data.currentXp + getXp(values.difficulty, xpMultipler);
          const newCompletedTasks = data.completedTasks + 1

          // LEVEL UP
          if (newCurrentXp >= data.neededXp) {
            
            const newLevel= data.level + 1;
            const newNeededXp = data.neededXp * 2;

            transaction.update(ref, {
              coins: newCoins,
              tasks: newTasks,
              currentXp: newCurrentXp,  
              level: newLevel,
              neededXp: newNeededXp,
              rank: getRanks(newLevel),
              completedTasks: newCompletedTasks
            });
          } else {
            // DONT LEVEL UP, JUST UPDATE STATS
            transaction.update(ref, {
              coins: newCoins,
              tasks: newTasks,
              currentXp: newCurrentXp,
              completedTasks: newCompletedTasks
            });
          }
        } else {
          // UPDATE ONLY TASK LIST ON EDIT
          transaction.update(ref, { tasks: newTasks });
        }
      });

      // REFETCH DATA AFTER UPDATE
      await getUserData();
      return true;
    } catch (e) {
      setFormError("Editting a task failed. Please, try it again.");
    }
  };

  return (
    <Modal openModal={openEditTaskModal} modalType={sended ? ModalType.Success : ModalType.Default} onModalEnter={() => {setSended(false);setFormError("")}}>
      <div className="text-primary-black p-5">
        {!sended && <h2 className="text-h2 mb-5 ">Edit a task</h2>}

        <Formik
          initialValues={initialValues}
          validationSchema={validSchema}
          onSubmit={async (values) => {
            const isSuccess = await editTask(values);
            isSuccess && setSended(true);
          }}
          key={"editTaskFormik"}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              {sended ? (
                 <div className="text-white flex gap-3 items-center">
                  <CheckCircleIcon className="w-8 h-8" />
                 <p>
                   Task was successfully edited!{" "}
                   <span
                     onClick={() => setSended(false)}
                     className="cursor-pointer font-bold underline underline-offset-2"
                   >
                     Click here to edit again
                   </span>{" "}
                   or close a modal.
                 </p>
               </div>
              ) : (
                <>
                  <div className="flex flex-col gap-1">
                    <p className="text-primary-gray">Title</p>
                    <Field name="name" className={`${inputStyles}`} />
                    {errors.name && touched.name ? (
                      <p className={formErrorText}>{errors.name}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-primary-gray">Description</p>
                    <Field
                      name="description"
                      className={`${inputStyles}`}
                      as="textarea"
                      rows="5"
                    />
                    {errors.description && touched.description ? (
                      <p className={formErrorText}>{errors.description}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-primary-gray">Difficulty</p>
                    <Field
                      name="difficulty"
                      className={`${inputStyles} cursor-pointer`}
                      as="select"
                    >
                      <option value={Difficulty.Hard}>Hard</option>
                      <option value={Difficulty.Medium}>Medium</option>
                      <option value={Difficulty.Low}>Low</option>
                    </Field>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-primary-gray">Change status</p>
                    <Field
                      name="status"
                      className={`${inputStyles} cursor-pointer`}
                      as="select"
                    >
                      <option value={Status.Active}>Active</option>
                      <option value={Status.Progress}>Progress</option>
                      <option value={Status.Completed}>Completed</option>
                    </Field>
                  </div>
                  {userFolders.length > 1 && (
                    <div className="flex flex-col gap-1">
                      <p className="text-primary-gray">Folder</p>

                      <Field
                        name={`folder[${1}]`}
                        className={`${inputStyles} cursor-pointer`}
                        as="select"
                      >
                        {userFolders.filter((fold: string) => fold !== "All").map((folder: string, index: number) => (
                          <option key={index} value={folder}>
                            {folder}
                          </option>
                        ))}
                      </Field>
                    </div>
                  )}
                  {formError && <p className={errorPopper}>{formError}</p>}
                  <button
                    type="submit"
                    className={`${pinkGradientButtonSecondary} text-white w-full`}
                  >
                    {isSubmitting ? <Loader loading={isSubmitting} /> : "Edit"}
                  </button>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EditTask;
