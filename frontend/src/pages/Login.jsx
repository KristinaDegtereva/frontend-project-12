import axios from 'axios';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { setToken, setUserName } from '../slices/authSlice';
import logo from '../images/logo.jpeg';
import Header from '../components/Header';
import FormInput from '../components/FormInput';

const formSchema = Yup.object({
  username: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});

const Login = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const addToken = (token) => dispatch(setToken(token));
  const addUserName = (name) => dispatch(setUserName(name));

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post('/api/v1/login', values);
        if (data.token) {
          localStorage.setItem('username', data.username);
          localStorage.setItem('token', data.token);
          addToken(data.token);
          addUserName(data.username);
          navigate('/');
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Ошибка при отправке запроса:', err);
        setError(true);
        rollbar.error('Login page', error);
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
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src={logo}
                    className="rounded-circle"
                    alt="Войти"
                  />
                </div>
                <form
                  className="col-12 col-md-6 mt-3 mt-mb-0"
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="text-center mb-4">{t('login.login')}</h1>
                  <div className="form-group form-floating mb-3">
                    <FormInput
                      name="username"
                      type="text"
                      autoComplete="username"
                      formik={formik}
                      err={error}
                      label={t('login.username')}
                    />

                    <FormInput
                      name="password"
                      type="password"
                      autoComplete="password"
                      formik={formik}
                      err={error}
                      label={t('login.password')}
                    />
                    {error && (
                      <div className="invalid-tooltip">
                        {t('errors.wrongLogin')}
                      </div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-100 mb-3 btn btn-outline-primary"
                  >
                    {t('login.login')}
                  </button>
                </form>
              </div>

              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('login.notAnAccount')}</span>
                  <a href="/signup">{t('login.linkToRegistration')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
