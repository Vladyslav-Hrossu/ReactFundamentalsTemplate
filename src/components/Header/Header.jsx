import React from 'react';

import { Button } from '../../common';
import { LOGOUT } from './constants';
import { Logo } from './components';

import styles from './styles.module.css';
import { useNavigate } from 'react-router';

export const Header = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};

	return (
		<div className={styles.headerContainer}>
			<Logo />
			<div className={styles.userContainer}>
				{token && <Button buttonText={LOGOUT} handleClick={handleLogout} />}
			</div>
		</div>
	);
};
