import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button, Input } from '../../common';
import { login } from '../../services';
import {
	EMAIL,
	EMAIL_PLACEHOLDER,
	PASSWORD,
	PASSWORD_PLACEHOLDER,
} from '../Registration/constants';
import { LOGIN } from './constants';

import styles from './styles.module.css';

export const Login = ({ setName }) => {
	const [email, changeEmail] = useState('');
	const [password, changePassword] = useState('');
	const [emailError, setemailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const navigate = useNavigate();

	const setEmail = (value) => {
		changeEmail(value);
		setemailError(false);
	};

	const setPassword = (value) => {
		changePassword(value);
		setPasswordError(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!email || !password) {
			if (!email) {
				setemailError(true);
			}
			if (!password) {
				setPasswordError(true);
			}
			return;
		}
		const data = {
			email,
			password,
		};

		login(data).then((result) => {
			console.log(result.user.name);
			setName(result.user.name);
			navigate('/courses');
			localStorage.setItem('token', result.result);
		});
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit}>
				<h1>Login</h1>
				<Input
					placeholderText={EMAIL_PLACEHOLDER}
					labelText={EMAIL}
					onChange={({ target }) => setEmail(target.value)}
					value={email}
				/>
				{emailError && <span>Email is required.</span>}
				<Input
					placeholderText={PASSWORD_PLACEHOLDER}
					labelText={PASSWORD}
					onChange={({ target }) => setPassword(target.value)}
					value={password}
					type='password'
				/>
				{passwordError && <span>Password is required.</span>}
				<Button type='submit' buttonText={LOGIN} className={styles.button} />
			</form>
			<p>
				If you don't have an account you can&nbsp;
				<Link to={'/registration'}>Registration</Link>
			</p>
		</div>
	);
};
