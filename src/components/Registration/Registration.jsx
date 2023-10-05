import { Link, useNavigate } from 'react-router-dom';

import { Button, Input } from '../../common';
import {
	EMAIL,
	EMAIL_PLACEHOLDER,
	NAME,
	NAME_PLACEHOLDER,
	PASSWORD,
	PASSWORD_PLACEHOLDER,
	REGISTRATION,
} from './constants';
import { useState } from 'react';
import { createUser } from '../../services';

import styles from './styles.module.css';

export const Registration = () => {
	const navigate = useNavigate();

	const [name, changeName] = useState('');
	const [email, changeEmail] = useState('');
	const [password, changePassword] = useState('');
	const [emailError, setemailError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [nameError, setnameError] = useState(false);

	const setEmail = (value) => {
		changeEmail(value);
		setemailError(false);
	};
	const setPassword = (value) => {
		changePassword(value);
		setPasswordError(false);
	};
	const setName = (value) => {
		changeName(value);
		setnameError(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!email || !password || !name) {
			if (!email) {
				setemailError(true);
			}
			if (!password) {
				setPasswordError(true);
			}
			if (!name) {
				setnameError(true);
			}
			return;
		}
		const data = {
			name,
			email,
			password,
		};

		createUser(data).then(() => navigate('/login'));
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit}>
				<h1>Registration</h1>
				<Input
					placeholderText={NAME_PLACEHOLDER}
					labelText={NAME}
					onChange={({ target }) => setName(target.value)}
					value={name}
				/>
				{nameError && <span>Name is required.</span>}
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
				<Button
					type='submit'
					buttonText={REGISTRATION}
					className={styles.button}
				/>
			</form>
			<p>
				If you have an account you can&nbsp;
				<Link to={'/login'}>Login</Link>
			</p>
		</div>
	);
};
