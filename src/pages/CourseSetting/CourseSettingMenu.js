// ** React Imports
import { Fragment } from "react";

// ** Demo Components

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
import Addnewlevel from "./Addnewlevel";
import CourseLevelList from "./CourseLevelList";
const CourseSettingMenu = () => {
  return (
    <Fragment>
      <Breadcrumbs
        title="تنظیمات دوره"
        data={[{ title: "منو" }, { title: "تنظیمات دوره" }]}
      />

      <CourseLevelList />
    </Fragment>
  );
};

export default CourseSettingMenu;
