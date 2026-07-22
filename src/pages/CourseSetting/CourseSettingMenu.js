// ** React Imports
import { Fragment } from "react";

// ** Demo Components

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
import Addnewlevel from "./Addnewlevel";
import CourseLevelList from "./CourseLevelList";
import AddnewStatus from "./AddnewStatus";
import CoursestatusList from "./CoursestatusList";
import CourseTechList from "./CourseTechList";
import Addnewtech from "./Addnewtech";
import UsersList from "../user/list";

const CourseSettingMenu = () => {
  return (
    <Fragment>
      <Breadcrumbs
        title="تنظیمات دوره"
        data={[{ title: "منو" }, { title: "تنظیمات دوره" }]}
      />

      <div className="shadow">
        <div className=" t-text-[20px] t-p-8">تمام سطح ها</div>
        <CourseLevelList />
        <Addnewlevel />
      </div>
      <div className="shadow my-4">
        <div className=" t-text-[20px] t-p-8">تمام استاتوس ها</div>
        <CoursestatusList />
        <AddnewStatus />
      </div>
      <div className="shadow my-4">
        <div className=" t-text-[20px] t-p-8">تمام تکنولوژِی ها</div>
        <CourseTechList />
        <Addnewtech />
      </div>
    </Fragment>
  );
};

export default CourseSettingMenu;
