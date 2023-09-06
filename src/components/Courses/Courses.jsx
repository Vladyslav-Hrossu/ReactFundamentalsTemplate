import React from "react";

import styles from "./styles.module.css";
import {Button} from "../../common";
import {CourseCard} from "./components";
import {EmptyCoursesList} from "./components/EmptyCoursesList/EmptyCoursesList";
import {SearchBar} from "../SearchBar/SearchBar";

export const Courses = ({coursesList, authorsList, handleShowCourse, handleCoursesFilter}) => {
  // write your code here

  return (
    <>
      <div className={styles.panel}>
        <SearchBar onSearchPerformed={handleCoursesFilter}/>
        <Button buttonText="Add new course"/>
      </div>

      {coursesList.length > 0 ? (
        coursesList.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            handleShowCourse={handleShowCourse}
            authorsList={authorsList}
          />
        ))
      ) : (
        <EmptyCoursesList/>
      )}
    </>
  );
};
