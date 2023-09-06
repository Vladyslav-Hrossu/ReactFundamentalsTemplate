import React from "react";

import { formatCreationDate, getCourseDuration } from "../../../../helpers";
import styles from "./styles.module.css";
import { Button } from "../../../../common";
import { mockedAuthorsList } from "../../../../constants";

export const CourseCard = ({course, handleShowCourse}) => {
  // write your code here

  return (
    <div className={styles.cardContainer} data-testid='courseCard'>
      <div className={styles.cardText}>
        <h2>{course.title}</h2>
        <p>{course.description}</p>
      </div>
      <div className={styles.cardDetails}>
        <p>
          <b>Authors: </b>
          {course.authors
            .map(
              (authorId) =>
                mockedAuthorsList.find((author) => author.id === authorId)?.name
            )
            .join(", ")}
        </p>
        <p>
          <b>Duration: </b>
          <span>{getCourseDuration(course.duration)}</span>
        </p>
        <p>
          <b>Created: </b>
          <span>{formatCreationDate(course.creationDate)}</span>
        </p>
        <div>
          <Button
            buttonText="Show course"
            handleClick={() => handleShowCourse(course.id)}
          />

          // reuse Button component for 'Show course' button
          // reuse Button component for 'Delete' button with data-testid="deleteCourse"
          // reuse Button component for 'Update' button with data-testid="updateCourse"

        </div>
      </div>
    </div>
  );
};
