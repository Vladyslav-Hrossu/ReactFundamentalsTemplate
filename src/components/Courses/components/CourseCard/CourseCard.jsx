import React from 'react';

import { Button } from '../../../../common';
import { SHOW_COURSE } from './constants';
import { getCourseDuration, formatCreationDate } from '../../../../helpers';

import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorsSelector } from '../../../../store/selectors';
import { deleteCourse } from '../../../../store/slices/coursesSlice';

export const CourseCard = ({ course }) => {
	const { title, description, authors, duration, creationDate, id } = course;
	const dispatch = useDispatch();
	const allAuthors = useSelector(getAuthorsSelector);
	const getAuthors = () => {
		return allAuthors
			.filter((author) => authors.includes(author.id))
			.map((item) => item.name)
			.join(', ');
	};
	return (
		<div className={styles.cardContainer} data-testid='courseCard'>
			<div className={styles.cardText}>
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
			<div className={styles.cardDetails}>
				<p>
					<b>Authors: </b>
					{getAuthors()}
				</p>
				<p>
					<b>Duration:</b>
					<span>{getCourseDuration(duration)}</span>
				</p>
				<p>
					<b>Created: </b>
					<span>{formatCreationDate(creationDate)}</span>
				</p>
				<Link to={`/courses/${id}`}>
					<Button buttonText={SHOW_COURSE} />
				</Link>
				<Button
					buttonText='Delete'
					handleClick={() => dispatch(deleteCourse(id))}
					data-testid='deleteCourse'
				/>
				<Button buttonText='Update' data-testid='updateCourse' />
			</div>
		</div>
	);
};
