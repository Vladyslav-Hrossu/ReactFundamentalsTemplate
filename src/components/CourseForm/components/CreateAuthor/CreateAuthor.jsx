import React, { useState } from 'react';

import { Button, Input } from '../../../../common';
import {
	AUTHOR_NAME,
	AUTHOR_NAME_PLACEHOLDER,
	CREATE_AUTHOR_BUTTON_TEXT,
} from './constants';

import styles from './styles.module.css';

export const CreateAuthor = ({ createAuthor }) => {
	const [name, setName] = useState('');

	const handleCreateAuthor = () => {
		const newAuthor = {
			id: Date.now(),
			name,
		};
		createAuthor(newAuthor);
		setName('');
	};

	return (
		<div className={styles.newAuthorContainer}>
			<Input
				inputClassName={styles.input}
				labelClassName={styles.label}
				labelText={AUTHOR_NAME}
				value={name}
				onChange={({ target }) => setName(target.value)}
				placeholderText={AUTHOR_NAME_PLACEHOLDER}
				data-testid='createAuthorInput'
			/>
			<Button
				buttonText={CREATE_AUTHOR_BUTTON_TEXT}
				handleClick={handleCreateAuthor}
				data-testid='createAuthorButton'
			/>
		</div>
	);
};
