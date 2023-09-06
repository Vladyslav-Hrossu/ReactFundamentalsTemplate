import React from 'react';

import styles from './styles.module.css';
import {Button} from "../../common";
import {CourseCard} from "./components";

export const Courses = ({coursesList, authorsList, handleShowCourse}) => {

  // write your code here

  return (
    <>
      <div className={styles.panel}>
        <Button buttonText='Add new course'/>
      </div>

      {coursesList.length > 0 ? (
        coursesList.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            handleShowCourse={handleShowCourse}
          />
        ))
      ) : (
        <div className={styles.emptyWrapper} data-testid="emptyContainer">
          <h1>Your List Is Empty</h1>
          <p>Please use 'Add new course' button to add your firs course</p>
          <Button
            buttonText="ADD NEW COURSE"
            data-testid="addCourse"
          />
        </div>
      )}
    </>
  );
};
