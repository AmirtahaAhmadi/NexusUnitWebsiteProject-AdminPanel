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

const projectsArr = [
  {
    progress: 60,
    hours: "210:30h",
    progressColor: "info",
    totalTasks: "233/240",
    subtitle: "React Project",
    title: "BGC eCommerce App",
    img: reactLabel,
  },
  {
    hours: "89h",
    progress: 15,
    totalTasks: "9/50",
    progressColor: "danger",
    subtitle: "UI/UX Project",
    title: "Falcon Logo Design",
    img: xdLabel,
  },
  {
    progress: 90,
    hours: "129:45h",
    totalTasks: "100/190",
    progressColor: "success",
    subtitle: "Vuejs Project",
    title: "Dashboard Design",
    img: vueLabel,
  },
  {
    hours: "45h",
    progress: 49,
    totalTasks: "12/86",
    progressColor: "warning",
    subtitle: "iPhone Project",
    title: "Foodista mobile app",
    img: sketchLabel,
  },

  {
    progress: 73,
    hours: "67:10h",
    totalTasks: "234/378",
    progressColor: "info",
    subtitle: "React Project",
    title: "Dojo React Project",
    img: reactLabel,
  },
  {
    progress: 81,
    hours: "108:39h",
    totalTasks: "264/537",
    title: "HTML Project",
    progressColor: "success",
    subtitle: "Crypto Website",
    img: htmlLabel,
  },
  {
    progress: 78,
    hours: "88:19h",
    totalTasks: "214/627",
    progressColor: "success",
    subtitle: "Vuejs Project",
    title: "Vue Admin template",
    img: vueLabel,
  },
];

export const columns = [
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
              img={row.img}
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

          {/* <small className="mb-1">{`${row.progress}%`}</small>
          <Progress
            value={row.progress}
            style={{ height: "6px" }}
            className={`w-100 progress-bar-${row.progressColor}`}
          /> */}
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
              {" "}
              بله
            </div>
          ) : (
            <div className="t-p-2   t-h-fit t-bg-[#fd4032b9]  t-w-[50px] t-text-center t-text-white t-rounded-[5px]">
              خیر
            </div>
          )}

          {/* <small className="mb-1">{`${row.progress}%`}</small>
          <Progress
            value={row.progress}
            style={{ height: "6px" }}
            className={`w-100 progress-bar-${row.progressColor}`}
          /> */}
        </div>
      );
    },
  },

  // {
  //   name: "عملیات",
  //   selector: (row) => row.title,
  //   sortable: true,
  //   cell: (row) => {
  //     return (
  //       <div className="d-flex flex-column w-100 t-justify-center">
  //         <div className="t-w-full t-flex ">
  //           <div className="p-4 t-bg-[#aa92ff] t-w-fit t-h-fit">مشاهده</div>
  //           <div className="p-4 t-bg-[#aa92ff] t-w-fit t-h-fit">اصلاح دوره</div>
  //         </div>
  //       </div>
  //     );
  //   },
  // },

  {
    sortable: true,
    minWidth: "300px",
    center: true,
    name: "انواع عملیات",
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          {/* <div className="avatar-wrapper">
            <Avatar
              className="me-1"
              img={row.img}
              alt={row.title}
              imgWidth="32"
            />
          </div> */}
          <div className="d-flex flex-row t-gap-5">
            <span className="text-truncate fw-bolder t-p-3 t-cursor-pointer t-bg-[#f3f2f7] t-rounded-[8px] hover:t-bg-[#6256e2] hover:t-text-[#f8f8f8] t-duration-300 t-transition-all">
              اصلاح
            </span>

            {/* {row?.title && <ShowingMoreOfcourseinfo array={row.courseId} />} */}
          </div>
        </div>
      );
    },
  },
];

const UserProjectsList = ({ getcourse }) => {
  const [loaded, setloaded] = useState(false);
  const [course, setcourse] = useState([]);

  useEffect(() => {
    setcourse(getcourse);
  }, [getcourse]);

  // useEffect(() => {
  //   // console.log("courses are read heresss", course);
  // }, [course]);

  return (
    <div>
      {/* <CardHeader tag="h4">User's Projects List</CardHeader> */}
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
