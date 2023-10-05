import { useParams, Link } from 'react-router-dom';
import { Button } from '../../common';
import { formatCreationDate, getCourseDuration } from '../../helpers';

import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import { getAuthorsSelector, getCoursesSelector } from '../../store/selectors';

export const CourseInfo = () => {
	const allCourses = useSelector(getCoursesSelector);
	const allAuthors = useSelector(getAuthorsSelector);
	const { courseId } = useParams();

	const course = allCourses.find((item) => item.id === courseId);
	const { id, title, creationDate, duration, description } = course;
	const authors = allAuthors.filter((author) =>
		course.authors.includes(author.id)
	);

	return (
		<div data-testid='courseInfo'>
			<Link to='/courses'>
				<Button buttonText='Back' />
			</Link>
			<h1>{title}</h1>
			<div className={styles.courseInfo}>
				<p className={styles.description}>{description}</p>
				<div>
					<p>
						<b>ID: </b>
						{id}
					</p>
					<p>
						<b>Duration: </b>
						{getCourseDuration(duration)}
					</p>
					<p>
						<b>Created: </b>
						{formatCreationDate(creationDate)}
					</p>
					<div>
						<b>Authors</b>
						<ul className={styles.authorsList}>
							{authors.map((author) => (
								<li key={author.id}>{author.name}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};
