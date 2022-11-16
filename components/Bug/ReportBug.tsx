import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { UserAuth } from '../../context/AuthContext';
import Modal from '../Modal/Modal';
import { useModalContext } from '../Modal/ModalContext';
import { ModalType } from '../Utils/enums';
import * as Yup from 'yup';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import {
  errorPopper,
  formErrorText,
  inputStyles,
  pinkGradientButtonSecondary,
} from '../Styles/CustomStyles';
import Loader from '../Atoms/Loader';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

interface InitialValuesProps {
  email: string;
  message: string;
}

const ReportBug = () => {
  const { openReportModal } = useModalContext();
  const [sended, setSended] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const { userData } = UserAuth();

  const initialValues: InitialValuesProps = {
    email: userData?.email || '',
    message: '',
  };

  const validSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    message: Yup.string().required('Required'),
  });

  const handleReport = async (values: InitialValuesProps) => {
    try {
      setFormError('');
      await addDoc(collection(db, 'reports'), {
        email: values.email,
        message: values.message,
      });

      return true;
    } catch (e) {
      setFormError('There was an error. Please, try it later.');
    }
  };

  return (
    <Modal
      openModal={openReportModal}
      modalType={sended ? ModalType.Success : ModalType.Default}
      onModalEnter={() => {
        setSended(false);
        setFormError('');
      }}
    >
      <>
        {!sended && <h2 className="text-h2 pt-5 px-5 text-black">Report bug</h2>}

        <Formik
          initialValues={initialValues}
          validationSchema={validSchema}
          onSubmit={async (values) => {
            const res = await handleReport(values);
            res && setSended(true);
          }}
          key={'editTaskFormik'}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form className="flex flex-col gap-4 p-5">
              {sended ? (
                <div className="text-white flex gap-3 items-center">
                  <CheckCircleIcon className="w-8 h-8" />
                  <p>Report was successfully sended!</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-1 text-black">
                    <p className="text-primary-gray">Email</p>
                    <Field name="email" className={`${inputStyles}`} />
                    {errors.email && touched.email ? (
                      <p className={formErrorText}>{errors.email}</p>
                    ) : null}
                  </div>
                  <div className="flex flex-col gap-1 text-black">
                    <p className="text-primary-gray">Message</p>
                    <Field name="message" className={`${inputStyles}`} as="textarea" rows="5" />
                    {errors.message && touched.message ? (
                      <p className={formErrorText}>{errors.message}</p>
                    ) : null}
                  </div>

                  {formError && <p className={errorPopper}>{formError}</p>}
                  <button
                    type="submit"
                    className={`${pinkGradientButtonSecondary} text-white w-full`}
                  >
                    {isSubmitting ? <Loader loading={isSubmitting} /> : 'Submit'}
                  </button>
                </>
              )}
            </Form>
          )}
        </Formik>
      </>
    </Modal>
  );
};

export default ReportBug;
