import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import Header from './Header';
import imageRegistration from '../images/registration.jpg';
import { setToken, setUserName } from '../slices/authSlice';

const Registration = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const [err, setErr] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToken = (token) => dispatch(setToken(token));
  const addUserName = (name) => dispatch(setUserName(name));

  const inputRef = useRef(null);

  useEffect(() => {
    if (err) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [err]);

  const getSchema = () => yup.object().shape({
    username: yup
      .string()
      .trim()
      .required(t('errors.required'))
      .min(3, t('errors.minMax'))
      .max(20, t('errors.minMax')),
    password: yup
      .string()
      .min(6, t('errors.minSymbols'))
      .required(t('errors.required')),
    confirmPassword: yup
      .string()
      .label('confirmPassword')
      .required(t('errors.required'))
      .oneOf([yup.ref('password'), null], t('errors.matchPassword')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: getSchema(),
    onSubmit: async (values) => {
      try {
        await axios
          .post('/api/v1/signup', { username: values.username, password: values.password })
          .then((response) => {
            if (response.data.token) {
              localStorage.setItem('username', response.data.username);
              localStorage.setItem('token', response.data.token);
              addToken(response.data.token);
              addUserName(response.data.username);
              navigate('/');
            }
          });
      } catch (error) {
        console.log(t('errors.networkErr'), error);
        setErr(true);
        rollbar.error('Registration failed', error);
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
                      placeholder="От 3 до 20 символов"
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
                      placeholder="Пароли должны совпадать"
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
                        || 'Такой пользователь уже существует'}
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
