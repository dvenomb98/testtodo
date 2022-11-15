import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { useModalContext } from '../Modal/ModalContext';
import { Formik, Form, Field } from 'formik';
import {
  errorPopper,
  formErrorText,
  inputStyles,
  pinkGradientButton,
} from '../Styles/CustomStyles';
import * as Yup from 'yup';
import { UserAuth } from '../../context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { LoginProps, NewUserValues, RegisterProps } from '../Utils/types';
import Loader from '../Atoms/Loader';
import { useRouter } from 'next/router';
import { ModalType } from '../Utils/enums';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const newUserAccount: NewUserValues = {
  tasks: [],
  coins: 100,
  rank: 'Newbie',
  classType: '',
  currentXp: 0,
  neededXp: 100,
  level: 1,
  folders: ['All'],
  img: '',
  completedTasks: 0,
  items: [],
  boosters: [],
};

const Login = () => {
  const { openLoginModal } = useModalContext();
  const [switchModals, setSwitchModals] = useState<boolean>(false);
  const { createUser, signIn } = UserAuth();
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>();
  const [registerSuccess, setRegisterSuccess] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | null>(null);
  const router = useRouter();

  // VALIDATION SCHEMA
  const LoginSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Too short!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  const switchFormik = () => {
    setRegisterSuccess(null);
    setLoginSuccess(null);
    setSwitchModals(!switchModals);
  };

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too short!').max(20, 'Too long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    surname: Yup.string().min(2, 'Too short!').max(20, 'Too long!').required('Required'),
    password: Yup.string().min(6, 'Too short!').required('Required'),
    repPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  // Create a new user
  const createNewUser = async ({ name, surname, email, password }: RegisterProps) => {
    try {
      const created = await createUser(email, password);
      const { user } = created;

      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        surname: surname,
        email: email,
        ...newUserAccount,
      });

      return true;
    } catch (error: any) {
      setRegisterError(error.message);
    }
  };

  // Sign in user
  const signInUser = async ({ password, email }: LoginProps) => {
    try {
      await signIn(email, password);

      return true;
    } catch (error: any) {
      setLoginError(error.message);
    }
  };

  // Login success ==== redirect to app
  const redirectAfterLogin = () => {
    setLoginSuccess('Login completed. Please wait, redirecting...');
    setTimeout(() => {
      router.push('/main');
    }, 1500);
  };

  return (
    <Modal
      cancelButton={!loginSuccess && !registerSuccess}
      openModal={openLoginModal}
      modalType={loginSuccess || registerSuccess ? ModalType.Success : ModalType.Default}
      onModalEnter={() => {
        setLoginError(null);
        setRegisterError(null);
        setLoginSuccess(null);
        setRegisterSuccess(null);
      }}
    >
      <div className="text-primary-black p-5">
        {switchModals ? (
          // DISPLAY LOGIN OR REGISTER MODAL
          <>
            {!loginSuccess && <h2 className="text-h2 font-bold mb-5">Log in</h2>}

            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={LoginSchema}
              onSubmit={async (values: LoginProps) => {
                const isSuccess = await signInUser(values);
                isSuccess && redirectAfterLogin();
              }}
              key={'loginFormik'}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="flex flex-col gap-5">
                  {loginSuccess ? (
                    <div className="flex gap-5 items-center">
                      <CheckCircleIcon className="w-8 h-8 text-white" />
                      <p className="text-white">{loginSuccess}</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1">
                        <p className="text-primary-gray">Email address:</p>
                        <Field name="email" placeholder="@" className={`${inputStyles}`} />
                        {errors.email && touched.email ? (
                          <p className={formErrorText}>{errors.email}</p>
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-1">
                        <p className="text-primary-gray">Password:</p>
                        <Field name="password" placeholder="******" className={`${inputStyles}`} />
                        {errors.password && touched.password && (
                          <p className={formErrorText}>{errors.password}</p>
                        )}
                      </div>

                      {loginError && <p className={errorPopper}>{loginError}</p>}

                      <button type="submit" className={`${pinkGradientButton} text-white w-full`}>
                        {isSubmitting ? <Loader loading={isSubmitting} /> : 'Login'}
                      </button>
                    </>
                  )}
                </Form>
              )}
            </Formik>
            {!loginSuccess && (
              <p className="mt-5 p-2 bg-slate-50 rounded-md">
                Have already account?{''}
                <span
                  onClick={switchFormik}
                  className="text-secondary-blue underline underline-offset-2 cursor-pointer"
                >
                  Sign up now{' '}
                </span>
              </p>
            )}
          </>
        ) : (
          <>
            {!registerSuccess && <h2 className="text-h2 font-bold mb-5">Create free account</h2>}
            <Formik
              initialValues={{
                email: '',
                name: '',
                surname: '',
                password: '',
                repPassword: '',
              }}
              validationSchema={RegisterSchema}
              onSubmit={async (values: RegisterProps) => {
                const isSuccess = await createNewUser(values);
                isSuccess && setRegisterSuccess('Registration completed. Please sign in.');
              }}
              key={'registerFormik'}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="flex flex-col gap-2">
                  {registerSuccess ? (
                    <div className="flex gap-5 items-center">
                      <CheckCircleIcon className="w-8 h-8 text-white" />
                      <p className="text-white">{registerSuccess}</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-1">
                        <p className="text-primary-gray">Email address:</p>
                        <Field name="email" placeholder="@" className={`${inputStyles}`} />
                        {errors.email && touched.email ? (
                          <p className={formErrorText}>{errors.email}</p>
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-1">
                        <p className="text-primary-gray">Name:</p>
                        <Field name="name" placeholder="John" className={`${inputStyles}`} />
                        {errors.name && touched.name ? (
                          <p className={formErrorText}>{errors.name}</p>
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-1">
                        <p className="text-primary-gray">Surname:</p>
                        <Field name="surname" placeholder="Deep" className={`${inputStyles}`} />
                        {errors.surname && touched.surname ? (
                          <p className={formErrorText}>{errors.surname}</p>
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-1">
                        <p className="text-primary-gray">Password:</p>
                        <Field name="password" placeholder="******" className={`${inputStyles}`} />
                        {errors.password && touched.password ? (
                          <p className={formErrorText}>{errors.password}</p>
                        ) : null}
                      </div>

                      <div className="flex flex-col gap-1">
                        <p className="text-primary-gray">Confirm password:</p>
                        <Field
                          name="repPassword"
                          placeholder="******"
                          className={`${inputStyles}`}
                        />
                        {errors.repPassword && touched.repPassword ? (
                          <p className={formErrorText}>{errors.repPassword}</p>
                        ) : null}
                      </div>
                      {registerError && <p className={errorPopper}>{registerError}</p>}
                      <button
                        type="submit"
                        className={`${pinkGradientButton} text-white w-full mt-5`}
                      >
                        {isSubmitting ? <Loader loading={isSubmitting} /> : 'Register'}
                      </button>
                    </>
                  )}
                </Form>
              )}
            </Formik>

            <p className="mt-5 p-2 bg-slate-50 rounded-md">
              {registerSuccess ? '' : 'Have already account? '}
              {''}
              <span
                onClick={switchFormik}
                className="text-secondary-blue underline underline-offset-2 cursor-pointer"
              >
                Sign in now{' '}
              </span>
            </p>
          </>
        )}
      </div>
    </Modal>
  );
};

export default Login;
