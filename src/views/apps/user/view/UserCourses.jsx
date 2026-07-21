// ** Reactstrap Imports
import { Card, CardHeader, Progress } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Label Images
import xdLabel from "@src/assets/images/icons/brands/xd-label.png";
import vueLabel from "@src/assets/images/icons/brands/vue-label.png";
import htmlLabel from "@src/assets/images/icons/brands/html-label.png";
import reactLabel from "@src/assets/images/icons/brands/react-label.png";
import sketchLabel from "@src/assets/images/icons/brands/sketch-label.png";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { useEffect, useState } from "react";
import { getCourseDetails } from "../../../../core/Interceptor/Services/UserServices/get";
import { dateToLocal } from "../store/DateToLocalFunction";
import { Link } from "react-router-dom";

const renderClient = (row) => {
  if (row.imageAddress != null) {
    return (
      <Avatar className="me-1" img={row.imageAddress} width="32" height="32" />
    );
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={"light-primary"}
        content={row.title || ""}
      />
    );
  }
};

export const columns1 = [
  {
    sortable: true,
    minWidth: "250px",
    name: "نام دوره",
    selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {/* <Link
          // to={`/apps/user/view/${row.id}`}
          className="user_name text-truncate text-body"
          style={{ display: "flex", alignItems: "center" }}
        > */}
        {renderClient(row)}
        <div style={{ gap: "2px" }} className="d-flex">
          <span className="fw-bolder">{row.title || '--'}</span>
        </div>
        {/* </Link> */}
      </div>
    ),
  },
  {
    name: "تاریخ ایجاد",
    selector: (row) => dateToLocal(row.startTime),
  },
  {
    name: "توضیحات",
    selector: (row) => row.miniDescribe || '--',
  },
];

const handleCard = (columns, data) => {
  return (
    <Card>
      <CardHeader tag="h4">دوره های کاربر</CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={data}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

const UserCourses = ({ currentUserDetails, userDetailsRenderCount }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userCourses, setUserCourses] = useState([]);
  const fetchGetAllUserCourses = async () => {
    // setIsLoading(true)
    try {
      const requests = currentUserDetails.courses.map((vals) =>
        getCourseDetails(vals.courseId),
      );
      const responses = await Promise.all(requests);
      responses.map((r) => setUserCourses((prev) => [...prev, r.data]));
      // console.log(responses);
      // console.log(userCourses);
    } catch (error) {
      console.error("userCoursesList error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchGetAllUserCourses();
  }, [userDetailsRenderCount]);

  return <>{!isLoading && handleCard(columns1, userCourses)}</>;
};

export default UserCourses;
