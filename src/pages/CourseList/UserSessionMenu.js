// ** React Imports
import { Fragment } from "react";

// ** Demo Components

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
import UserSessionHomeWork from "./UserSessionHomeWork";
import { PostAddSessionHomeWorkcall } from "../../core/Interceptor/Courses/PostAddSessionHomeWork";
import AddSetionHomeWork from "./AddSetionHomeWork";
import SessionDetail from "./SessionDetail";
import AddSessionFiles from "./AddSessionFiles";
const UserSessionMenu = () => {
  return (
    <Fragment>
      <Breadcrumbs
        title="جلسه ها"
        data={[{ title: "منو" }, { title: "لیست جلسه" }]}
      />

      <div className="shadow my-4">
        <div className=" t-text-[20px] t-p-8">تکالیف دانش اموزان</div>
        <UserSessionHomeWork />
      </div>
      <div className="shadow my-4">
        <SessionDetail />
        <AddSetionHomeWork />
        <AddSessionFiles />
      </div>
    </Fragment>
  );
};

export default UserSessionMenu;
