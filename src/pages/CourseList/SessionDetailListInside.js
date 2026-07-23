// ** Reactstrap Imports
import { Card, CardHeader } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useEffect, useState } from "react";

// ** Columns Configuration for Course Levels
export const columns = [
  {
    name: "عنوان تکلیف",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.hwTitle,
    cell: (row) => {
      return <span className="fw-bolder text-dark">{row.hwTitle}</span>;
    },
  },
  {
    name: "شرح تکلیف",
    sortable: true,
    minWidth: "220px",
    selector: (row) => row.hwDescribe,
    cell: (row) => {
      return <span className="text-muted">{row.hwDescribe}</span>;
    },
  },
  {
    name: "نام گروه",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.groupName,
    cell: (row) => {
      return <span className="text-dark">{row.groupName}</span>;
    },
  },
  {
    name: "تاریخ تکلیف",
    sortable: true,
    minWidth: "220px",
    selector: (row) => row.homeWorkDate,
    cell: (row) => {
      return (
        <span className="text-muted">
          {new Date(row.homeWorkDate).toLocaleString("fa-IR")}
        </span>
      );
    },
  },
  {
    name: "شناسه تکلیف",
    minWidth: "220px",
    selector: (row) => row.homeWorkId,
    cell: (row) => {
      return (
        <span className="text-muted small font-monospace">
          {row.homeWorkId}
        </span>
      );
    },
  },
  {
    name: "شناسه دانشجو",
    minWidth: "250px",
    selector: (row) => row.courseStudentId,
    cell: (row) => {
      return (
        <span className="text-muted small font-monospace">
          {row.courseStudentId}
        </span>
      );
    },
  },
  {
    name: "عملیات",
    center: true,
    minWidth: "120px",
    cell: (row) => {
      return <div className="d-flex flex-row t-gap-5"></div>;
    },
  },
];

const UserSessionHomeWorKinsideList = ({ getcourse }) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    if (getcourse) {
      setLevels(getcourse);
    }
  }, [getcourse]);
  useEffect(() => {
    console.log("homeWorks", levels);
  }, [levels]);
  return (
    <div>
      <div className="react-dataTable user-view-account-projects t-p-6 t-shadow-none t-max-h-[500px] t-overflow-y-auto hide-scrollbar ">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={levels}
          className="react-dataTable "
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </div>
  );
};

export default UserSessionHomeWorKinsideList;
