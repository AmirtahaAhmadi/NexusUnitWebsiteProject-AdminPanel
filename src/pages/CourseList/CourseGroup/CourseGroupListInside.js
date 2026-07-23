// ** Reactstrap Imports
import { Card, CardHeader } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Utilities
import { dateToLocal } from "../../../core/Interceptor/reusablefunctions/DateTolocal";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useEffect, useState } from "react";
import ShowMoreCourseGroup from "./ShowMoreCourseGroup";
import { getCourseGroupDetailsCall } from "../../../core/Interceptor/Courses/GetCourseGroupDetailCall";
import EditCourseGroup from "./EditCourseGroup";
import { useRefresh } from "../../../redux/zustan/refreshCourselvl";
// Common style wrapper to cleanly truncate text in cells
const truncateStyle = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%",
  display: "block",
};

export const columns = (handleDetailsLog, getChooseDataList) => [
  {
    name: "نام گروه",
    selector: (row) => row.groupName,
    sortable: true,
    minWidth: "150px",
    cell: (row) => (
      <span style={truncateStyle} title={row.groupName}>
        {row.groupName || "بدون نام"}
      </span>
    ),
  },
  {
    name: "نام دوره",
    selector: (row) => row.courseName,
    sortable: true,
    minWidth: "220px",
    cell: (row) => (
      <div className="d-flex flex-column w-100" style={{ overflow: "hidden" }}>
        <span className="fw-bold" style={truncateStyle} title={row.courseName}>
          {row.courseName || "بدون نام دوره"}
        </span>
      </div>
    ),
  },
  {
    name: "ظرفیت گروه",
    selector: (row) => row.groupCapacity,
    sortable: true,
    minWidth: "130px",
    cell: (row) => (
      <span className="fw-semibold"> {row.groupCapacity || 0} نفر</span>
    ),
  },
  {
    name: "استاد",
    selector: (row) => row.teacherName,
    sortable: true,
    minWidth: "180px",
    cell: (row) => (
      <span style={truncateStyle} title={row.teacherName}>
        {row.teacherName || "مشخص نشده"}
      </span>
    ),
  },
  {
    name: "عملیات",
    minWidth: "200px",
    cell: (row) => {
      return (
        <div className="d-flex justify-content-center align-items-center gap-2">
          <ShowMoreCourseGroup
            groupDetails={row}
            getChooseDataList={getChooseDataList}
          />
        </div>
      );
    },
  },
];

const CourseGroupListInside = ({ getcourse, getChooseDataList }) => {
  const refreshit = useRefresh((state) => state.refresh);
  const [course, setcourse] = useState([]);

  useEffect(() => {
    if (getcourse) {
      setcourse(getcourse);
    }
  }, [getcourse, refreshit]);

  const handleDetailsLog = async (id) => {
    try {
      const response = await getCourseGroupDetailsCall(id);
      console.log("GetCourseGroupCall response data:", response);
    } catch (error) {
      console.error("Failed to fetch course group details:", error);
    }
  };

  return (
    <div>
      <div className="react-dataTable user-view-account-projects t-p-6 t-shadow-none">
        <DataTable
          noHeader
          responsive
          columns={columns(handleDetailsLog, getChooseDataList)}
          data={course}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
          noDataComponent={<div className="p-2">هیچ گروهی یافت نشد.</div>}
        />
      </div>
    </div>
  );
};

export default CourseGroupListInside;
