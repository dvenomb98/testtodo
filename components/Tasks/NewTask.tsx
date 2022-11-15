import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { useModalContext } from '../Modal/ModalContext';
import {
  errorPopper,
  formErrorText,
  inputStyles,
  pinkGradientButtonSecondary,
} from '../Styles/CustomStyles';
import { Task } from '../Utils/types';
import { nanoid } from 'nanoid';
import Loader from '../Atoms/Loader';
import * as Yup from 'yup';
import { doc, runTransaction } from 'firebase/firestore';
import { db } from '../../firebase';
import { UserAuth } from '../../context/AuthContext';
import { Difficulty, ModalType } from '../Utils/enums';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface NewTaskProps {
  refetch: any;
}

const NewTask: React.FC<NewTaskProps> = ({ refetch }) => {
  const { openNewTaskModal } = useModalContext();
  const today = new Date();
  const { user, userData } = UserAuth();
  const [sended, setSended] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const userFolders = userData?.folders;

  // initial values
  const initialValues: Task = {
    id: nanoid(),
    name: '',
    description: '',
    created_date: today.toISOString(),
    difficulty: Difficulty.Medium,
    status: 'ACTIVE',
    folder: ['All'],
  };
  // validation = dont need to valid other values
  const validSchema = Yup.object().shape({
    name: Yup.string().required('Required').max(30, 'Too long!'),
    description: Yup.string().required('Required'),
  });

  // get tasks from DB, create task and push it to array
  const addNewTask = async (values: Task) => {
    try {
      await runTransaction(db, async (transaction) => {
        const ref = doc(db, 'users', user.uid);

        const sfDoc = await transaction.get(ref);

        if (!sfDoc.exists()) {
          throw 'Document does not exist!';
        }

        const newTask = [...sfDoc.data().tasks, values];
        transaction.update(ref, { tasks: newTask });
      });
      await refetch();
      return true;
    } catch (e) {
      setFormError('Submitting a new task failed. Please, try it again.');
    }
  };

  return (
    <Modal
      openModal={openNewTaskModal}
      modalType={sended ? ModalType.Success : ModalType.Default}
      onModalEnter={() => {
        setSended(false);
        setFormError('');
      }}
      cancelButton
    >
      <div className="text-primary-black p-5">
        {!sended && <h2 className="text-h2 mb-5 ">Create a new task</h2>}

        <Formik
          initialValues={initialValues}
          validationSchema={validSchema}
          onSubmit={async (values) => {
            const isSuccess = await addNewTask(values);
            isSuccess && setSended(true);
          }}
          key={'newTaskFormik'}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              {sended ? (
                <div className="text-white flex gap-3 items-center">
                  <CheckCircleIcon className="w-8 h-8" />
                  <p>
                    Task was successfully created!{' '}
                    <span
                      onClick={() => setSended(false)}
                      className="cursor-pointer font-bold underline underline-offset-2"
                    >
                      Create a new one
                    </span>{' '}
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
                    <Field name="description" className={`${inputStyles}`} as="textarea" rows="5" />
                    {errors.description && touched.description ? (
                      <p className={formErrorText}>{errors.description}</p>
                    ) : null}
                    <a
                      href="https://www.markdownguide.org/basic-syntax/"
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-2 text-secondary-blue text-sm"
                    >
                      Use markdown to style your description
                    </a>
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
                  {userFolders.length > 1 && (
                    <div className="flex flex-col gap-1">
                      <p className="text-primary-gray">Folder</p>

                      <Field
                        name={`folder[${1}]`}
                        className={`${inputStyles} cursor-pointer`}
                        as="select"
                      >
                        {userFolders.map((folder: string, index: number) => (
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
                    {isSubmitting ? <Loader loading={isSubmitting} /> : 'Create'}
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

export default NewTask;
