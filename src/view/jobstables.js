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
import { dateToLocal } from "../core/Interceptor/reusablefunctions/DateTolocal";
// import ShowingMoreOfcourseinfo from "./showingMoreOfcourseinfo";
// ** Styles
import Showjobstab from "../pages/basic/jobs/Showsinglejobstab";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useEffect, useState } from "react";

export const columns = [
  {
    sortable: true,
    minWidth: "300px",
    name: "نام کار",
    selector: (row) => row.worktitle,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.worktitle}</span>
          </div>
        </div>
      );
    },
  },
  {
    name: "نام مشاور",
    selector: (row) =>
      `${row.assistance?.user?.fName} ${row.assistance?.user?.lName}`,
  },
  {
    name: "تاریخ",
    selector: (row) => row.workDate,
    sortable: true,
    cell: (row) => {
      return (
        <div className="d-flex flex-column w-100 t-justify-center">
          {dateToLocal(row.workDate)}
        </div>
      );
    },
  },
  {
    name: "ای دی",
    selector: (row) => row.id,
    sortable: true,
    cell: (row) => {
      return (
        <div className="d-flex flex-column w-100 t-justify-center">
          {row.id}
        </div>
      );
    },
  },
  {
    sortable: true,
    minWidth: "300px",
    center: true,
    name: "انواع عملیات",
    selector: (row) => row.id,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="d-flex flex-row t-gap-5">
            <span className="text-truncate fw-bolder t-p-3 t-cursor-pointer t-bg-[#f3f2f7] t-rounded-[8px] hover:t-bg-[#6256e2] hover:t-text-[#f8f8f8] t-duration-300 t-transition-all">
              اصلاح
            </span>
            {row?.id && <Showjobstab array={row.id} />}
          </div>
        </div>
      );
    },
  },
];

const Jobstables = ({ getcourse }) => {
  const [course, setcourse] = useState([]);

  useEffect(() => {
    setcourse(getcourse);
  }, [getcourse]);

  useEffect(() => {
    console.log("courses are read heresss", course);
  }, [course]);

  return (
    <div>
      <div className="react-dataTable user-view-account-projects t-p-6 t-shadow-none">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={course}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </div>
  );
};

export default Jobstables;
