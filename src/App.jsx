import React, { useEffect } from 'react';

import { Courses, Header } from './components';

import styles from './App.module.css';

// TODO: will be removed after API calls be added
import { CourseForm } from './components';
import { Login } from './components/Login';
import { CourseInfo } from './components/CourseInfo';
import { Registration } from './components/Registration';
import { Route, Routes } from 'react-router';
import { getAuthors, getCourses } from './services';
import { useDispatch } from 'react-redux';
import { setAuthors } from './store/slices/authorsSlice';
import { setCourses } from './store/slices/coursesSlice';

function App() {
	const token = localStorage.getItem('token');
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			const courses = await getCourses();
			const authors = await getAuthors();
			dispatch(setCourses(courses.result));
			dispatch(setAuthors(authors.result));
		};
		if (token) {
			fetchData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	return (
		<>
			<Header />
			<div className={styles.container}>
				<Routes>
					<Route path='/' element={token ? <Courses /> : <Login />} />
					<Route path='/registration' element={<Registration />} />
					<Route path='/login' element={<Login />} />
					<Route path='/courses' element={<Courses />} />
					<Route path='/courses/add' element={<CourseForm />} />
					<Route path='/courses/:courseId' element={<CourseInfo />} />
				</Routes>
			</div>
		</>
	);
}

export default App;
