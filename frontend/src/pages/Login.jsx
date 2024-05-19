import axios from 'axios';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo from '../components/logo.jpeg';

const formSchema = Yup.object({
  username: Yup.string().required('Обязательное поле'),
  password: Yup.string().required('Обязательное поле'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      setError(null);
      console.log('Submitting form', values); // Отладка
      try {
        const responce = await axios.post('/api/v1/login', values);
        console.log('Response from server:', responce.data); // Отладка
        const { token } = responce.data;
        console.log('Token:', token); // Отладка
        localStorage.setItem('token', token);
        navigate('/');
      } catch (err) {
        console.error('Error:', err); // Отладка
        setError('Неправильное имя пользователя или пароль');
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-8 col-xxl-6">
      <h1 className="text-center mb-4">Войти</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form.Group controlId="username" className="form-floating mb-3">
        <Form.Label>Имя пользователя</Form.Label>
        <Form.Control
          type="text"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={formik.touched.username && !!formik.errors.username}
          placeholder="Ваш ник"
        />
        {formik.errors.username && formik.touched.username && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group controlId="password" className="form-floating mb-4">
        <Form.Label>Пароль</Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={formik.touched.password && !!formik.errors.password}
          placeholder="Пароль"
        />
        {formik.errors.password && formik.touched.password && (
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</Button>
    </Form>
  );
};

const Login = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={logo} className="rounded-circle" alt="Войти" />
              </div>
              <LoginForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span> <a href="/">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
