import React, { useState } from 'react';

import { Courses, Header } from './components';

import styles from './App.module.css';

// TODO: will be removed after API calls be added
import { mockedAuthorsList, mockedCoursesList } from './constants';
import { CourseForm } from './components';
import { Login } from './components/Login';
import { CourseInfo } from './components/CourseInfo';
import { Registration } from './components/Registration';
import { Route, Routes } from 'react-router';

function App() {
	const token = localStorage.getItem('token');
	const [name, setName] = useState('');

	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);

	const saveNewCourse = (item) => {
		setCourses([...courses, item]);
	};

	return (
		<>
			<Header name={name} />
			<div className={styles.container}>
				<Routes>
					<Route
						path='/'
						element={
							token ? (
								<Courses coursesList={courses} authorsList={authors} />
							) : (
								<Login setName={setName} />
							)
						}
					/>
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login setName={setName} />} />
					<Route
						path='/courses'
						element={<Courses coursesList={courses} authorsList={authors} />}
					/>
					<Route
						path='/courses/add'
						element={
							<CourseForm
								authorsList={authors}
								createCourse={saveNewCourse}
								createAuthor={setAuthors}
							/>
						}
					/>
					<Route
						path='/courses/:courseId'
						element={<CourseInfo coursesList={courses} authorsList={authors} />}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
