import React, { useState } from 'react';

import { Button, Input } from '../../../../common';

import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { saveAuthor } from '../../../../store/slices/authorsSlice';

export const CreateAuthor = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState('');

	const handleCreateAuthor = () => {
		const newAuthor = {
			id: Date.now(),
			name,
		};
		dispatch(saveAuthor(newAuthor));
		setName('');
	};

	return (
		<div className={styles.newAuthorContainer}>
			<Input
				inputClassName={styles.input}
				labelClassName={styles.label}
				labelText={'Author name'}
				value={name}
				onChange={({ target }) => setName(target.value)}
				placeholderText={'Enter author name'}
			/>
			<Button buttonText={'Create author'} handleClick={handleCreateAuthor} />
		</div>
	);
};
