import React from 'react';
import s from './LoginPage.module.css';
import LoginForm from './LoginForm/LoginForm.jsx';

const LoginPage = (props) => {
	return (
		<div className={s.LoginPage}>
			<LoginForm/>
		</div>
	);
}

export default LoginPage;