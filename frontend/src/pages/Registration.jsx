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

  const inputRef = useRef(null);

  useEffect(() => {
    if (err) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [err]);

  const registerUser = async (values) => {
    try {
      const response = await axios.post(apiRoutes.signup(), {
        username: values.username,
        password: values.password,
      });

      if (response.data.token) {
        saveToken(response.data.token);
        saveUsername(response.data.username);
        dispatch(setToken(response.data.token));
        dispatch(setUserName(response.data.username));
        navigate(appPaths.chat());
      }
    } catch (error) {
      console.log(t('errors.networkErr'), error);
      setErr(true);
      rollbar.error(t('rollbar.registrationFailed'), error);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: getSignUpSchema(t),
    onSubmit: registerUser,
  });

  const renderField = (name, label, placeholder, autoComplete, type = 'text') => (
    <Form.Group className="form-floating mb-3">
      <Form.Control
        placeholder={placeholder}
        name={name}
        type={type}
        autoComplete={autoComplete}
        id={name}
        className="form-control"
        value={formik.values[name]}
        onChange={formik.handleChange}
        disabled={formik.isSubmitting}
        isInvalid={(formik.errors[name] && formik.touched[name]) || err}
        ref={name === 'username' ? inputRef : null}
        autoFocus={name === 'username'}
      />
      <Form.Control.Feedback className="invalid-tooltip" style={{ width: 'unset' }}>
        {formik.errors[name]}
      </Form.Control.Feedback>
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
    </Form.Group>
  );

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
                  {renderField('username', t('registration.nameUser'), t('errors.minMax'), 'username')}
                  {renderField('password', t('registration.password'), 'Не менее 6 символов', 'new-password', 'password')}
                  {renderField('confirmPassword', t('registration.confirmPassword'), t('errors.matchPassword'), 'new-password', 'password')}
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
