import React from "react";
import {Button} from "../../../../common";

export const EmptyCoursesList = () => {
  return (
    <div data-testid="emptyContainer">
      <h1>Your List Is Empty</h1>
      <p>Please use 'Add new course' button to add your firs course</p>
      <Button buttonText="ADD NEW COURSE" data-testid="addCourse"/>
    </div>
  )
}
