import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { CourseInfo } from '../components/CourseInfo';
import { formatCreationDate, getCourseDuration } from '../helpers';
import { MemoryRouter } from 'react-router';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

const mockStore = configureMockStore();

const store = mockStore({
	authors: [
		{
			id: 1,
			name: 'Test Name 1',
		},
		{
			id: 2,
			name: 'Test Name 2',
		},
	],
	courses: [
		{
			title: 'Test Title 1',
			description: 'Test Description 1',
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
	],
	user: {
		name: 'Den',
	},
});

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => ({ courseId: '1' }),
}));

describe('CourseInfo', () => {
	test('renders title correctly', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseInfo />
				</MemoryRouter>
			</Provider>
		);

		const courseTitle = screen.getByRole('heading', { level: 1 });

		expect(courseTitle.textContent).toBe('Test Title 1');
	});

	test('renders description correctly', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseInfo />
				</MemoryRouter>
			</Provider>
		);

		const courseDescription = screen.getByText('Test Description 1');

		expect(courseDescription).toBeInTheDocument();
	});

	test('renders course duration correctly', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseInfo />
				</MemoryRouter>
			</Provider>
		);

		const courseDuration = screen.queryByText(getCourseDuration(60));

		expect(courseDuration).toBeInTheDocument();
	});

	test('renders course date correctly', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseInfo />
				</MemoryRouter>
			</Provider>
		);

		const courseCreationDate = screen.getByText(
			formatCreationDate(store.getState().courses[0].creationDate)
		);
		expect(courseCreationDate).toBeInTheDocument();
	});

	test("renders course authors' names correctly", () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseInfo />
				</MemoryRouter>
			</Provider>
		);

		const authorNames = screen
			.getAllByRole('listitem')
			.map((li) => li.textContent);

		expect(authorNames).toEqual(['Test Name 1', 'Test Name 2']);
	});

	test('renders Back button correctly', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseInfo />
				</MemoryRouter>
			</Provider>
		);

		const backButton = screen.getByRole('button');

		expect(backButton).toBeInTheDocument();
	});

	test('should render Back link "/courses"', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<CourseInfo />
				</MemoryRouter>
			</Provider>
		);

		const backButton = screen.getByRole('link', { name: 'Back' });
		expect(backButton).toHaveAttribute('href', '/courses');
	});
});
