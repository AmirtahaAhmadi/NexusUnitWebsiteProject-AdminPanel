// ** Reactstrap Imports
import { Card, CardHeader, Progress } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
// ** Custom Components
import Avatar from "@components/avatar";

// ** Label Imports
import xdLabel from "@src/assets/images/icons/brands/xd-label.png";
import vueLabel from "@src/assets/images/icons/brands/vue-label.png";
import htmlLabel from "@src/assets/images/icons/brands/html-label.png";
import reactLabel from "@src/assets/images/icons/brands/react-label.png";
import sketchLabel from "@src/assets/images/icons/brands/sketch-label.png";
import { useNavigate } from "react-router-dom";
// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useEffect, useState } from "react";
import ShowingMoreOfcourseinfo from "../ShowingMoreofCourseInfo";

const UserProjectsList = ({ getcourse }) => {
  const [course, setcourse] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setcourse(getcourse);
  }, [getcourse]);

  const columns = [
    {
      sortable: true,
      minWidth: "300px",
      name: "نام کورس",
      selector: (row) => row.title,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="avatar-wrapper">
              <Avatar
                className="me-1"
                img={row.imageAddress}
                alt={row.title}
                imgWidth="32"
              />
            </div>
            <div className="d-flex flex-column">
              <span className="text-truncate fw-bolder">{row.title}</span>
              <small className="text-muted">{row.subtitle}</small>
            </div>
          </div>
        );
      },
    },
    {
      name: "نام مدرس",
      selector: (row) => row.teacher.fName,
    },
    {
      name: "منقضی شده",
      selector: (row) => row.isExpire,
      sortable: true,
      cell: (row) => {
        return (
          <div className="d-flex flex-column w-100 t-justify-center">
            {row.isExpire ? (
              <div className="t-p-2  t-bg-[#fd4032b9]  t-w-[50px] t-text-center t-h-fit  t-text-white t-rounded-[5px]">
                بله
              </div>
            ) : (
              <div className="t-p-2 t-bg-[#22c35db9]  t-w-[50px] t-text-center t-h-fit  t-text-white t-rounded-[5px]">
                خیر
              </div>
            )}
          </div>
        );
      },
    },
    {
      name: "فعال بودن",
      selector: (row) => row.isActive,
      sortable: true,
      cell: (row) => {
        return (
          <div className="d-flex flex-column w-100 t-justify-center">
            {row.isActive ? (
              <div className="t-p-2 t-bg-[#22c35db9] t-w-[50px] t-text-center  t-h-fit  t-text-white t-rounded-[5px]">
                بله
              </div>
            ) : (
              <div className="t-p-2   t-h-fit t-bg-[#fd4032b9]  t-w-[50px] t-text-center t-text-white t-rounded-[5px]">
                خیر
              </div>
            )}
          </div>
        );
      },
    },
    {
      sortable: true,
      minWidth: "300px",
      center: true,
      name: "انواع عملیات",
      selector: (row) => row.title,
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-row t-gap-5">
              <span
                onClick={() => {
                  navigate("/CourseGroup", {
                    state: { courseId: row.courseId },
                  });
                }}
                className="text-truncate fw-bolder t-p-3 t-cursor-pointer t-bg-[#f3f2f7] t-rounded-[8px] hover:t-bg-[#6256e2] hover:t-text-[#f8f8f8] t-duration-300 t-transition-all">
                گروه جدید
              </span>

              {row?.title && <ShowingMoreOfcourseinfo array={row.courseId} />}
            </div>
          </div>
        );
      },
    },
  ];

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

export default UserProjectsList;
