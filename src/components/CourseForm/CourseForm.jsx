import React, { useEffect, useState } from 'react';

import {
	AuthorItem,
	CreateAuthor,
	Description,
	Duration,
	Title,
} from './components';
import { ADD_BUTTON_TYPE, DELETE_BUTTON_TYPE } from './constants';

import styles from './styles.module.css';

// TODO: will be removed after API calls be added
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	getAuthorsSelector,
	getCoursesSelector,
	getUserTokenSelector,
} from '../../store/selectors';
import {
	createCourseThunk,
	updateCourseThunk,
} from '../../store/thunks/coursesThunk';

export const CourseForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { courseId } = useParams();
	const isUpdateMode = !!courseId;

	const allCourses = useSelector(getCoursesSelector);
	const allAuthors = useSelector(getAuthorsSelector);
	const token = useSelector(getUserTokenSelector);
	const [authorsList, setAuthorsList] = useState(allAuthors);

	const { id, title, creationDate, duration, description, authors } =
		allCourses.find((item) => item.id === courseId) || {};

	const currentCourseAuthors =
		isUpdateMode && allAuthors.filter((author) => authors.includes(author.id));

	const [courseAuthors, setCourseAuthors] = useState(
		currentCourseAuthors || []
	);

	const [courseInfo, setCourseInfo] = useState({
		title: title || '',
		description: description || '',
		duration: duration || '',
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

		const course = {
			...courseInfo,
			authors: authorsIds,
		};

		if (
			course.title.length === 0 ||
			course.description.length === 0 ||
			course.duration === 0 ||
			course.authors.length === 0
		) {
			alert('Please, fill in all fields');
			return;
		}

		if (course.description.length < 2) {
			alert('Description should has at least 2 symbols');
			return;
		}
		isUpdateMode
			? dispatch(updateCourseThunk({ ...course, creationDate, id }, token))
			: dispatch(createCourseThunk(course, token));
		navigate('/courses');
	};

	useEffect(() => {
		setAuthorsList(allAuthors);
	}, [allAuthors]);

	return (
		<form>
			<Title
				addTitle={addCourseData}
				value={courseInfo.title}
				handleSubmit={handleSubmit}
				isUpdateMode={isUpdateMode}
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
					{allAuthors.length &&
						allAuthors.map((author) => (
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
