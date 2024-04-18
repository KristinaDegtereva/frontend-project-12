import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import logo from '../components/logo.jpeg';

const formSchema = Yup.object({
	username: Yup
		.string()
		.required('Обязательное поле'),
	email: Yup
		.string()
		.required('Обязательное поле')
});

const LoginForm = () => {
	return (
		<Formik
			initialValues={{ username: '', password: '' }}
			validationSchema={formSchema}
			// onSubmit={(values) => {
			// }}
		>
			{({ errors, touched }) => (
				<Form className="col-12 col-md-8 col-xxl-6">
					<h1 className="text-center mb-4">Войти</h1>
					<div className="form-floating mb-3">
						<Field
							id="username"
							name="username"
							type="text"
							placeholder="Ваш ник"
							className="form-control"
						/>
						{errors.username && touched.username ? (
							<div>{errors.username}</div>
						) : null}
					</div>
					<div className="form-floating mb-4">
						<Field
							id="password"
							name="password"
							type="password"
							placeholder="Пароль"
							className="form-control"
						/>
						{errors.password && touched.password ? (
							<div>{errors.password}</div>
						) : null}
					</div>
					<button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
				</Form>
			)}
		</Formik>
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
	)
};

export default Login;
