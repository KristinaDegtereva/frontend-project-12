import axios from 'axios';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form , useFormik} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUserName } from '../slices/authSlice';
import logo from '../images/logo.jpeg';

const formSchema = Yup.object({
  username: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});

const Login = () => {
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
        const { data } = await axios.post('/api/v1/login', 
        { username: 'admin', password: 'admin' });
        if (data.token) {
          localStorage.setItem('user', data);
          addToken(data.token);
          addUserName(data.username);
          navigate('/')
        } else {
          setError(true)
        }
      }
      catch (error) {
        console.error('Ошибка при отправке запроса:', error);
        setError(true)
      }
    },
  });

  return (
    <div className="h-100">
      <div className='h-100' id='chat'>
        <div className='d-flex flex-column h-100'>
          <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
            <div className="container">
              <a href="/" className="navbar-brand">
                Hexlet Chat
              </a>
            </div>
          </nav>
          <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
              <div className="col-12 col-md-8 col-xxl-6">
                <div className="card shadow-sm">
                  <div className="card-body row p-5">
                    <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                      <img src={logo} className="rounded-circle" alt="Войти"></img>
                    </div>
                    <form className='col-12 col-md-6 mt-3 mt-mb-0' onSubmit={formik.handleSubmit}>
                      <h1 className='text-center mb-4'>Войти</h1>
                      <div className="form-group form-floating mb-3">
                        <input
                          type="username"
                          name="username"
                          className={`form-control ${error ? 'is-invalid': ''}`}
                          onChange={formik.handleChange}
                          value={formik.values.username}
                          autoComplete='username'
                        />
                        <label htmlFor="email">Ваш ник</label>
                      </div>
                      <div className="form-group form-floating mb-4">
                        <input
                          type="password"
                          name="password"
                          className={`form-control ${error ? 'is-invalid': ''}`}
                          onChange={formik.handleChange}
                          value={formik.values.password}
                          autoComplete='password'
                        />
                        <label htmlFor="password">Пароль</label>
                        { error && (
                          <div class="invalid-tooltip">
                            Неверные имя пользователя или пароль
                          </div>
                        )}
                      </div>
                      <button type='submit' className='w-100 mb-3 btn btn-outline-primary'>Log in</button>
                    </form>
                  </div>

                  <div className="card-footer p-4">
                    <div className="text-center">
                      <span>Нет аккаунта? </span>
                      <a href='/signup'>Регистрация</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
