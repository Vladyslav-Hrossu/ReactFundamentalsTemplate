import React, { useState } from "react";
import { CourseInfo, Courses, Header } from "./components";

// use mocked data till API implementation
import { mockedAuthorsList, mockedCoursesList } from "./constants";

// Task 2 and 3 - wrap your App with redux Provider and BrowserRouter in src/index.js

function App() {
  const [courses] = useState(mockedCoursesList);
  const [authors] = useState(mockedAuthorsList);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  let view = (
    <Courses
      coursesList={courses}
      authorsList={authors}
      handleShowCourse={setSelectedCourseId}
    />
  );

  if (selectedCourseId) {
    view = (
      <CourseInfo
        coursesList={courses}
        authorsList={authors}
        showCourseId={selectedCourseId}
        onBack={setSelectedCourseId}
      />
    );
  }

  return (
    <div className="App">
      <Header />
      {view}
    </div>
  );
}

export default App;
