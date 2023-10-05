import React, { useState } from 'react';

import { CourseCard, SearchBar } from './components';
import { Button } from '../../common';
import { ADD_NEW_COURSE } from './constants';

import styles from './styles.module.css';
import { Link } from 'react-router-dom';

export const Courses = ({ coursesList, authorsList, handleShowCourse }) => {
	const [courses, setCourses] = useState(coursesList);

	const handleSearch = (value) => {
		const searchedCourses = coursesList.filter(
			(course) =>
				course.title.toLowerCase().indexOf(value) >= 0 ||
				course.id.indexOf(value) >= 0
		);

		setCourses(searchedCourses);
	};

	return courses.length ? (
		<>
			<div className={styles.panel}>
				<SearchBar getSearchValue={handleSearch} />
				<Link to={'/courses/add'}>
					<Button buttonText={ADD_NEW_COURSE} />
				</Link>
			</div>
			{courses.map((course) => (
				<CourseCard
					key={course.id}
					course={course}
					authorsList={authorsList}
					handleShowCourse={handleShowCourse}
				/>
			))}
		</>
	) : (
		<div>
			<h1>Your List Is empty</h1>
			<p>Add new course</p>
			<Link to={'/courses/add'}>
				<Button buttonText='Add new course' data-testid='addCourse' />
			</Link>
		</div>
	);
};
