// ** React Imports
import { Fragment } from "react";

// ** Demo Components

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
import AddNewCourseGroup from "./AddNewGroup";
import CourseGroupList from "./CourseGroupList";
const CourseGroupMenu = () => {
  return (
    <Fragment>
      <Breadcrumbs
        title=" گروه ها"
        data={[{ title: "منو" }, { title: "گروه ها" }]}
      />

      <CourseGroupList />
      <AddNewCourseGroup />
    </Fragment>
  );
};

export default CourseGroupMenu;
