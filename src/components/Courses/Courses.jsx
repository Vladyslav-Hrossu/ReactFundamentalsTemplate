import React from "react";

import styles from "./styles.module.css";
import {Button} from "../../common";
import {CourseCard} from "./components";
import {EmptyCoursesList} from "./components/EmptyCoursesList/EmptyCoursesList";

export const Courses = ({coursesList, authorsList, handleShowCourse}) => {
  // write your code here

  return (
    <>
      <div className={styles.panel}>
        <Button buttonText="Add new course"/>
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
        <EmptyCoursesList/>
      )}
    </>
  );
};
