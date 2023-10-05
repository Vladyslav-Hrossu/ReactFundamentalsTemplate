import React, { useEffect, useState } from 'react';

import { CourseCard, SearchBar } from './components';
import { Button } from '../../common';
import { ADD_NEW_COURSE } from './constants';

import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
	getAuthorsSelector,
	getCoursesSelector,
	getUserRoleSelector,
} from '../../store/selectors';

export const Courses = () => {
	const allCourses = useSelector(getCoursesSelector);
	const authorsList = useSelector(getAuthorsSelector);
	const [courses, setCourses] = useState(allCourses);
	const role = useSelector(getUserRoleSelector);

	const handleSearch = (value) => {
		const searchedCourses = courses.filter(
			(course) =>
				course.title.toLowerCase().indexOf(value) >= 0 ||
				course.id.indexOf(value) >= 0
		);

		setCourses(searchedCourses);
	};

	useEffect(() => {
		setCourses(allCourses);
	}, [allCourses]);

	return courses.length ? (
		<>
			<div className={styles.panel}>
				<SearchBar getSearchValue={handleSearch} />
				<Link to={'/courses/add'}>
					<Button buttonText={ADD_NEW_COURSE} />
				</Link>
			</div>
			{courses.map((course) => (
				<CourseCard key={course.id} course={course} authorsList={authorsList} />
			))}
		</>
	) : (
		<>
			{role === 'admin' ? (
				<div>
					<h1>Your List Is Empty</h1>
					<Link to={'/courses/add'}>
						<Button buttonText='Add new course' data-testid='addCourse' />
					</Link>
				</div>
			) : (
				<div>You don't have permissions</div>
			)}
		</>
	);
};
