import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import { useModalContext } from "../Modal/ModalContext";
import { doc, runTransaction } from "firebase/firestore";
import { db } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import { ModalType } from "../Utils/enums";
import * as Yup from "yup";
import {
  errorPopper,
  formErrorText,
  inputStyles,
  pinkGradientButtonSecondary,
} from "../Styles/CustomStyles";
import Loader from "../Atoms/Loader";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface InitialValues {
  name: string;
}

const CreateFolder = () => {
  const { openCreateFolderModal, showCreateFolderModal } = useModalContext();
  const { user, getUserData} = UserAuth();
  const [sended, setSended] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const initialValues: InitialValues = {
    name: "",
  };

  const validSchema = Yup.object().shape({
    name: Yup.string().required("Required").max(15, "Too long!"),
  });

  const createNewFolder = async (values: InitialValues) => {
    const ref = doc(db, "users", user.uid);
    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(ref);
        if (!sfDoc.exists()) {
          setError("Creating a new folder failed. Please, try it again...");
          throw "Document does not exist!";
        }

        const newFolders = [...sfDoc.data().folders, values.name]
        transaction.update(ref, { folders: newFolders});
      });
      await getUserData()
      return true
    } catch (e) {
        setError("Creating a new folder failed. Please, try it again...");
    }
  };

  return (
    <Modal
      openModal={openCreateFolderModal}
      modalType={sended ? ModalType.Success : ModalType.Default}
      onModalEnter={() => setSended(false)}
      
    >
      <div className="text-primary-black p-5">
        {sended ? (
          <div className="text-white flex gap-3 items-center">
            <CheckCircleIcon className="w-8 h-8" />
            <p>
              Folder was successfully created!{" "}
              <span
                onClick={() => setSended(false)}
                className="cursor-pointer font-bold underline underline-offset-2"
              >
                Create a new one
              </span>{" "}
              or close a modal.
            </p>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            validationSchema={validSchema}
            onSubmit={async (values) => {
              const isSuccess = await createNewFolder(values)
              isSuccess && setSended(true)
            }}
            key="newFolderModal"
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-primary-gray">New folder name</p>
                  <Field name="name" className={`${inputStyles}`} />
                  {errors.name && touched.name ? (
                    <p className={formErrorText}>{errors.name}</p>
                  ) : null}
                </div>
                {error && <p className={errorPopper}>{error}</p>}
                <button
                  type="submit"
                  className={`${pinkGradientButtonSecondary} text-white w-full`}
                >
                  {isSubmitting ? <Loader loading={isSubmitting} /> : "Create"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </Modal>
  );
};

export default CreateFolder;
