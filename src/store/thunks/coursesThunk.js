import {
	updateCourse as updateCourseReducer,
	setCourses,
	saveCourse,
	deleteCourse as deleteCourseReducer,
} from '../slices/coursesSlice';
import {
	createCourse,
	deleteCourse,
	getCourses,
	updateCourse,
} from '../../services';

export const updateCourseThunk = (data, token) => {
	return async function (dispatch) {
		const newCourse = await updateCourse(data, token);

		dispatch(updateCourseReducer(newCourse.result));
	};
};

export const deleteCourseThunk = (id, token) => {
	return async function (dispatch) {
		await deleteCourse(id, token);

		dispatch(deleteCourseReducer(id));
	};
};

export const createCourseThunk = (data, token) => {
	return async function (dispatch) {
		const result = await createCourse(data, token);

		dispatch(saveCourse(result.result));
	};
};

export const getCoursesThunk = () => async (dispatch) => {
	const response = await getCourses();

	dispatch(setCourses(response.result));
};
