import React from "react";
import { Button } from "../../common";

export const EmptyCourseListComponent = () => {
  return (
    <div data-testid="emptyContainer">
      <div>Your List Is Empty</div>
      <div>Please use "Add New Course" button to add your first course</div>
      <Button buttonText="Add new course" data-testid="addCourse" />
    </div>
  );
};
