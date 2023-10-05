import React, { useEffect, useState } from 'react';

import {
	AuthorItem,
	CreateAuthor,
	Description,
	Duration,
	Title,
} from './components';
import { ADD_BUTTON_TYPE, DELETE_BUTTON_TYPE } from './constants';
import { getCreationDate } from '../../helpers';

import styles from './styles.module.css';

// TODO: will be removed after API calls be added
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveCourse } from '../../store/slices/coursesSlice';
import { getAuthorsSelector } from '../../store/selectors';

export const CourseForm = ({ createAuthor, createCourse }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const authors = useSelector(getAuthorsSelector);

	const [authorsList, setAuthorsList] = useState(authors);
	const [courseAuthors, setCourseAuthors] = useState([]);
	const [courseInfo, setCourseInfo] = useState({
		id: String(Date.now()),
		title: '',
		description: '',
		duration: '',
	});

	const addCourseData = (type, data) => {
		setCourseInfo({ ...courseInfo, [type]: data });
	};

	const addAuthor = (author) => {
		setCourseAuthors([...courseAuthors, author]);

		const newAllAuthorsList = authorsList.filter(
			(item) => author.id !== item.id
		);

		setAuthorsList(newAllAuthorsList);
	};

	const deleteAuthor = (author) => {
		setAuthorsList([...authorsList, author]);

		const newCourseAuthorsList = courseAuthors.filter(
			(item) => author.id !== item.id
		);

		setCourseAuthors(newCourseAuthorsList);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const authorsIds = courseAuthors.map((item) => item.id);

		const newCourse = {
			...courseInfo,
			creationDate: getCreationDate(),
			authors: authorsIds,
			duration: +courseInfo.duration,
		};

		if (
			newCourse.title.length === 0 ||
			newCourse.description.length === 0 ||
			newCourse.duration === 0 ||
			newCourse.authors.length === 0
		) {
			alert('Please, fill in all fields');
			return;
		}

		if (newCourse.description.length < 2) {
			alert('Description should has at least 2 symbols');
			return;
		}
		dispatch(saveCourse(newCourse));
		navigate('/courses');
	};

	useEffect(() => {
		setAuthorsList(authors);
	}, [authors]);

	return (
		<form>
			<Title
				addTitle={addCourseData}
				value={courseInfo.title}
				handleSubmit={handleSubmit}
			/>
			<Description
				addDescription={addCourseData}
				value={courseInfo.description}
			/>
			<div className={styles.infoWrapper}>
				<div>
					<CreateAuthor />
					<Duration addDuration={addCourseData} value={courseInfo.duration} />
				</div>
				<div className={styles.authorsContainer}>
					<strong>Authors</strong>
					{authors.length &&
						authors.map((author) => (
							<AuthorItem
								handleClick={addAuthor}
								key={author.id}
								{...author}
								type={ADD_BUTTON_TYPE}
							/>
						))}
					<strong>Course authors</strong>
					{courseAuthors.length ? (
						courseAuthors.map((author) => (
							<AuthorItem
								handleClick={deleteAuthor}
								key={author.id}
								{...author}
								type={DELETE_BUTTON_TYPE}
							/>
						))
					) : (
						<p className={styles.notification}>List is empty</p>
					)}
				</div>
			</div>
		</form>
	);
};
