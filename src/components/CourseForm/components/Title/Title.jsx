import React from 'react';

import { Button, Input } from '../../../../common';
import {
	CREATE_COURSE_BUTTON_TEXT,
	TITLE,
	TITLE_PLACEHOLDER,
} from './constants';

export const Title = ({ addTitle, value, handleSubmit }) => {
	return (
		<div>
			<Input
				value={value}
				labelText={TITLE}
				placeholderText={TITLE_PLACEHOLDER}
				onChange={({ target }) => addTitle('title', target.value)}
				data-testid='titleInput'
			/>
			<Button
				buttonText={CREATE_COURSE_BUTTON_TEXT}
				handleClick={handleSubmit}
				data-testid='createCourseButton'
			/>
		</div>
	);
};
