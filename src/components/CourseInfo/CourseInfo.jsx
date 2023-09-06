import React from 'react';

import styles from './styles.module.css';
import {Button} from "../../common";

export const CourseInfo = ({course, authorsList, onBack, showCourseId}) => {

  // write your code here

  return (
    <div data-testid='courseInfo'>
      // Module 1: reuse Button component for 'onBack' functionality
      <Button buttonText='Back to courses' handleClick={() => onBack(null)}/>
      // Module 2: use 'react-router-dom' 'Link' component for button 'Back'

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
            {course.duration}
          </p>
          <p>
            <b>Created: </b>
            {course.creationDate}
          </p>
          <div>
            <b>Authors</b>
            <ul className={styles.authorsList}>
              {authorsList.map((author) => (
                <li key={author.id}>{author.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
