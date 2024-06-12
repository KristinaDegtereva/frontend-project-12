import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRollbar } from '@rollbar/react';
import { setToken, setUserName } from '../slices/authSlice';
import logo from '../images/logo.jpeg';
import Header from '../components/Header';
import { apiRoutes, appPaths } from '../routes';
import { useToken } from '../context/authContext';

const Login = () => {
  const { t } = useTranslation();
  const rollbar = useRollbar();

  const navigate = useNavigate();
  const [err, setError] = useState(null);
  const dispatch = useDispatch();

  const addToken = (token) => dispatch(setToken(token));
  const addUserName = (name) => dispatch(setUserName(name));
  const { saveToken, saveUsername } = useToken();

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
    },
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(apiRoutes.login(), values);
        if (data.token) {
          localStorage.setItem('username', data.username);
          localStorage.setItem('token', data.token);
          saveToken(data.token);
          saveUsername(data.username);
          addToken(data.token);
          addUserName(data.username);
          navigate(appPaths.chat());
        } else {
          setError(true);
        }
      } catch (error) {
        console.error(t('errors.requestSendErr'), error);
        setError(true);
        rollbar.error(t('rollbar.loginPage'), error);
        console.log(error);
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
                <Form
                  className="col-12 col-md-6 mt-3 mt-mb-0"
                  onSubmit={formik.handleSubmit}
                >
                  <h1 className="text-center mb-4">{t('login.login')}</h1>
                  <Form.Group className="form-group form-floating mb-3">
                    <Form.Control
                      type="username"
                      name="username"
                      className={`form-control ${err ? 'is-invalid' : ''}`}
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      autoComplete="username"
                      required
                      id="username"
                      placeholder="Ваш ник"
                      ref={inputRef}
                      autoFocus
                    />
                    <Form.Label htmlFor="email">{t('login.username')}</Form.Label>
                  </Form.Group>

                  <Form.Group className="form-group form-floating mb-4">
                    <Form.Control
                      type="password"
                      name="password"
                      id="password"
                      className={`form-control ${err ? 'is-invalid' : ''}`}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      autoComplete="current-password"
                      placeholder="Пароль"
                      required
                    />
                    <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                    {err && (
                      <Form.Control.Feedback className="invalid-tooltip" style={{ width: 'unset' }}>
                        {t('errors.wrongLogin')}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <button
                    type="submit"
                    className="w-100 mb-3 btn btn-outline-primary"
                  >
                    {t('login.login')}
                  </button>
                </Form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t('login.notAnAccount')}</span>
                  &nbsp;
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
