import React from 'react';

import styles from './styles.module.css';

export const Button = ({buttonText, handleClick, 'data-testid': dataTestId}) => (
	<button onClick={handleClick} data-testid={dataTestId} className={styles.button}>{buttonText}</button>
);
