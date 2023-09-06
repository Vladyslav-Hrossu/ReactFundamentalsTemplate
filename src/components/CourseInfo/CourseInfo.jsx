import React from "react";

import styles from "./styles.module.css";
import {Button} from "../../common";
import {formatCreationDate, getCourseDuration} from "../../helpers";

export const CourseInfo = ({coursesList,authorsList, onBack, showCourseId}) => {
  // write your code here
  // Module 1: reuse Button component for 'onBack' functionality
  // Module 2: use 'react-router-dom' 'Link' component for button 'Back'
  debugger

  const course = coursesList.find((course) =>
    course.id === showCourseId
  );

  const courseAuthors = authorsList.filter((author) =>
    course.authors.includes(author.id)
  );

  return (
    <div data-testid="courseInfo">
      <h1>{course.title}</h1>
      <div className={styles.courseInfo}>
        <p className={styles.description}>{course.description}</p>
        <div>
          <p>
            <b>ID: </b>
            {course.id}
          </p>
          <p>
            <b>Duration: </b>
            {getCourseDuration(course.duration)}
          </p>
          <p>
            <b>Created: </b>
            {formatCreationDate(course.creationDate)}
          </p>
          <div>
            <b>Authors</b>
            <ul className={styles.authorsList}>
              {courseAuthors.map((author) => (
                <li key={author.id}>{author.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Button
        buttonText="Back"
        handleClick={() => onBack?.(null)}
      />
    </div>
  );
};
