import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import Header from '../components/Header';
import imageRegistration from '../images/registration.jpg';
import { setToken, setUserName } from '../slices/authSlice';
import { appPaths, apiRoutes } from '../routes';
import { getSignUpSchema } from '../validationSchema';
import { useToken } from '../context/authContext';

const Registration = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const [err, setErr] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { saveToken, saveUsername } = useToken();

  const addToken = (token) => dispatch(setToken(token));
  const addUserName = (name) => dispatch(setUserName(name));

  const inputRef = useRef(null);

  useEffect(() => {
    if (err) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [err]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: getSignUpSchema(t),
    onSubmit: async (values) => {
      try {
        await axios
          .post(apiRoutes.signup(), { username: values.username, password: values.password })
          .then((response) => {
            if (response.data.token) {
              saveToken(response.data.token);
              saveUsername(response.data.username);
              addToken(response.data.token);
              addUserName(response.data.username);
              navigate(appPaths.chat());
            }
          });
      } catch (error) {
        console.log(t('errors.networkErr'), error);
        setErr(true);
        rollbar.error(t('rollbar.registrationFailed'), error);
      }
    },
  });

  return (
    <>
      <Header />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img src={imageRegistration} className="rounded-circle" alt="Регистрация" />
                </div>
                <Form onSubmit={formik.handleSubmit} className="w-50">
                  <h1 className="text-center mb-4">{t('registration.signUp')}</h1>

                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      placeholder={t('errors.minMax')}
                      name="username"
                      ref={inputRef}
                      autoComplete="username"
                      id="username"
                      className="form-control"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                      isInvalid={
                        (formik.errors.username && formik.touched.username)
                        || err
                      }
                      autoFocus
                    />
                    <Form.Control.Feedback
                      className="invalid-tooltip"
                      style={{ width: 'unset' }}
                    >
                      {formik.errors.username}
                    </Form.Control.Feedback>
                    <label className="form-label" htmlFor="username">
                      {t('registration.nameUser')}
                    </label>
                  </Form.Group>

                  <Form.Group className="form-floating mb-3">
                    <Form.Control
                      placeholder="Не менее 6 символов"
                      name="password"
                      autoComplete="new-password"
                      type="password"
                      id="password"
                      className="form-control"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      disabled={formik.isSubmitting}
                      isInvalid={
                        (formik.errors.password && formik.touched.password)
                        || err
                      }
                    />
                    <Form.Control.Feedback
                      className="invalid-tooltip"
                      style={{ width: 'unset' }}
                    >
                      {formik.errors.password}
                    </Form.Control.Feedback>
                    <label className="form-label" htmlFor="password">
                      {t('registration.password')}
                    </label>
                  </Form.Group>

                  <Form.Group className="form-floating mb-4">
                    <Form.Control
                      placeholder={t('errors.matchPassword')}
                      name="confirmPassword"
                      type="password"
                      id="confirmPassword"
                      autoComplete="new-password"
                      className="form-control"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      disabled={formik.isSubmitting}
                      isInvalid={
                        (formik.errors.confirmPassword
                          && formik.touched.confirmPassword)
                        || err
                      }
                    />
                    <Form.Label
                      className="form-label"
                      htmlFor="confirmPassword"
                    >
                      {t('registration.confirmPassword')}
                    </Form.Label>
                    <Form.Control.Feedback
                      className="invalid-tooltip"
                      style={{ width: 'unset' }}
                    >
                      {formik.errors.confirmPassword
                        || t('errors.userExists')}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <button type="submit" className="w-100 btn btn-outline-primary">
                    {t('registration.submit')}
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
