import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	deleteCourseThunk,
	getCoursesThunk,
} from '../store/thunks/coursesThunk';
import { getAuthorsThunk } from '../store/thunks/authorsThunk';
import { getUserThunk } from '../store/thunks/userThunk';

jest.mock('../store/thunks/coursesThunk', () => ({
	deleteCourseThunk: jest.fn(),
	getCoursesThunk: jest.fn(),
}));
jest.mock('../store/thunks/authorsThunk', () => ({
	getAuthorsThunk: jest.fn(),
}));
jest.mock('../store/thunks/userThunk', () => ({
	getUserThunk: jest.fn(),
}));

const courses = [
	{
		title: 'Test Title',
		description: 'Test Description',
		authors: [1, 2],
		duration: 60,
		creationDate: '20/03/2012',
		id: '1',
	},
	{
		title: 'Test Title 2',
		description: 'Test Description 2',
		authors: [1, 2],
		duration: 60,
		creationDate: '20/03/2012',
		id: '2',
	},
	{
		title: 'Test Title 3',
		description: 'Test Description 3',
		authors: [1, 2],
		duration: 60,
		creationDate: '20/03/2012',
		id: '3',
	},
];

const authors = [
	{
		id: 1,
		name: 'Test Name 1',
	},
	{
		id: 2,
		name: 'Test Name 2',
	},
];

const mockStore = configureMockStore([thunk]);

const store = mockStore({
	authors,
	courses,
	user: {
		name: 'Den',
		role: 'admin',
	},
});

describe('App', () => {
	beforeEach(() => {
		getCoursesThunk.mockReturnValue({
			type: 'courses/setCourses',
			payload: courses,
		});
		getAuthorsThunk.mockReturnValue({
			type: 'authors/setAuthors',
			payload: authors,
		});
		deleteCourseThunk.mockReturnValue({
			type: 'courses/deleteCourse',
			payload: 1,
		});
		getUserThunk.mockReturnValue({
			type: 'user/setUserData',
			payload: 1,
		});
	});

	test('should renders Login component when token is not present', () => {
		localStorage.removeItem('token');
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		expect(
			screen.getByText(/If you don't have an account you can/i)
		).toBeInTheDocument();
	});

	test('should switch to registration page from login page on registration link click', () => {
		localStorage.removeItem('token');
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		expect(
			screen.getByText(/If you don't have an account you can/i)
		).toBeInTheDocument();

		fireEvent.click(screen.getByText(/registration/i));

		expect(screen.queryByText(/name/i)).toBeInTheDocument();
	});

	test('should renders Registration component', () => {
		localStorage.removeItem('token');
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/registration']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.queryByText(/name/i)).toBeInTheDocument();
		expect(screen.queryByText(/email/i)).toBeInTheDocument();
		expect(screen.queryByText(/password/i)).toBeInTheDocument();
	});

	test('should switch to login page from registration page on login link click', () => {
		localStorage.removeItem('token');
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/registration']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.queryByText(/name/i)).toBeInTheDocument();
		expect(screen.queryByText(/email/i)).toBeInTheDocument();
		expect(screen.queryByText(/password/i)).toBeInTheDocument();

		fireEvent.click(screen.getByRole('link', /login/i));

		expect(screen.queryByText(/name/i)).not.toBeInTheDocument();
	});

	test('should renders Courses component when token is present', () => {
		localStorage.setItem('token', 'token');
		const store = mockStore({
			authors,
			courses,
			user: {
				name: 'Den',
				role: 'admin',
				token: 'token',
				isAuth: true,
			},
		});

		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		const courseElements = screen.getAllByTestId('courseCard');

		expect(courseElements[0]).toBeInTheDocument();
	});

	test('should renders course add component if role admin', () => {
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/courses/add']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.queryByTestId('createCourseButton')).toBeInTheDocument();
	});

	test('should not renders course add component if role non-admin', () => {
		const store = mockStore({
			authors,
			courses,
			user: {
				name: 'Den',
				role: '',
			},
		});
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/courses/add']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.queryByTestId('createCourseButton')).not.toBeInTheDocument();
		const courseElements = screen.getAllByTestId('courseCard');

		expect(courseElements[0]).toBeInTheDocument();
	});
	test('should renders course update component if role admin', () => {
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/courses/update/1']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.queryByTestId('descriptionTextArea')).toBeInTheDocument();
	});

	test('should not renders course update component if role non-admin', () => {
		const store = mockStore({
			authors,
			courses,
			user: {
				name: 'Den',
				role: '',
			},
		});
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/courses/update/1']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.queryByTestId('descriptionTextArea')).not.toBeInTheDocument();
		const courseElements = screen.getAllByTestId('courseCard');

		expect(courseElements[0]).toBeInTheDocument();
	});

	test('should renders course info component', () => {
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/courses/1']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByTestId('courseInfo')).toBeInTheDocument();
	});

	test('should call deleteCourseThunk on Delete button click', async () => {
		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/courses']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		fireEvent.click(screen.queryAllByTestId(/delete/i)[0]);
		expect(deleteCourseThunk).toHaveBeenCalled();
	});

	test('should call getUserThunk on main page load with token in localstorage', async () => {
		localStorage.setItem('token', 'token');
		const store = mockStore({
			authors,
			courses,
			user: {
				name: 'Den',
				role: 'admin',
				token: 'token',
			},
		});

		render(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/']}>
					<App />
				</MemoryRouter>
			</Provider>
		);

		expect(getUserThunk).toHaveBeenCalled();
	});
});
