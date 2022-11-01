import { CheckCircleIcon } from "@heroicons/react/24/outline";
import ProgressBar from "@ramonak/react-progress-bar";
import { doc, runTransaction } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { db, storage } from "../../firebase";
import Loader from "../Atoms/Loader";
import Modal from "../Modal/Modal";
import { useModalContext } from "../Modal/ModalContext";
import {
    errorPopper,
  pinkGradientButtonSecondary,
} from "../Styles/CustomStyles";
import { ModalType } from "../Utils/enums";

interface InitialValues {
  file: any;
}

const UploadModal = () => {
  const { openUploadModal } = useModalContext();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [sended, setSended] = useState<boolean>(false);
  const [error, setError] = useState("");
  const { user, getUserData} = UserAuth();

  const initialValues: InitialValues = {
    file: [],
  };

  const uploadFile = (values: InitialValues) => {
      const { file } = values;
      const userRef = ref(storage, `${user.uid}`);
      const uploadTask = uploadBytesResumable(userRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setUploadProgress(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          setError("Uploading file failed. Please try it again later.");
          setUploadProgress(0)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              runTransaction(db, async (transaction) => {
                const ref = doc(db, "users", user.uid);
                const sfDoc = await transaction.get(ref);
                transaction.update(ref, { ...sfDoc.data(), img: downloadURL });
              });
              getUserData();
            })
            .then(() => {
              setUploadProgress(0)
              setSended(true)
            });
        }
      );
      
  };
  return (
    <Modal
      openModal={openUploadModal}
      onModalEnter={() => setSended(false)}
      modalType={sended ? ModalType.Success : ModalType.Default}
    >
      <div className="text-primary-black p-5">
        {sended ? (
          <div className="text-white flex gap-3 items-center">
            <CheckCircleIcon className="w-8 h-8" />
            <p>
              Image was successfully uploaded!{" "}
              <span
                onClick={() => setSended(false)}
                className="cursor-pointer font-bold underline underline-offset-2"
              >
                Upload a new one
              </span>{" "}
              or close a modal.
            </p>
          </div>
        ) : (
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) =>  await uploadFile(values) }
            key="newFolderModal"
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className="text-primary-gray text-h4 mb-2">Select or drag a file</p>
                  {uploadProgress ? (
                    <ProgressBar completed={uploadProgress} />
                  ) : (
                    <input
                      name="file"
                      type="file"
                      className="file:bg-slate-800 file:p-4 text-primary-gray cursor-pointer file:cursor-pointer focus:outline-none file:text-white file:border-none file:rounded-md file:text-sm"
                      onChange={(event) => {
                        setFieldValue("file", event.currentTarget.files?.[0]);
                      }}
                    />
                  )}
                </div>
                {error && <p className={errorPopper}>{error}</p>}

                <button
                  type="submit"
                  className={`${pinkGradientButtonSecondary} text-white w-full`}
                >
                  {isSubmitting ? <Loader loading={isSubmitting} /> : "Upload"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </Modal>
  );
};

export default UploadModal;
