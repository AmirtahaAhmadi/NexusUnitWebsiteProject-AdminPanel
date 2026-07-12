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
    name: "نام سطح",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.levelName,
    cell: (row) => {
      return <span className="fw-bolder text-dark">{row.levelName}</span>;
    },
  },
  {
    name: "آدرس آیکون",
    sortable: true,
    minWidth: "150px",
    selector: (row) => row.iconAddress,
    cell: (row) => {
      return <span className="t-text-gray-500">{row.iconAddress}</span>;
    },
  },
  {
    name: "شناسه سطح",
    minWidth: "250px",
    selector: (row) => row.id,
    cell: (row) => {
      return <span className="text-muted small font-monospace">{row.id}</span>;
    },
  },
  {
    name: "عملیات",
    center: true,
    minWidth: "120px",
    cell: (row) => {
      return (
        <div className="d-flex flex-row t-gap-5">
          <span
            onClick={() => console.log("Edit Level ID:", row.id)}
            className="text-truncate fw-bolder t-p-3 t-cursor-pointer t-bg-[#f3f2f7] t-rounded-[8px] hover:t-bg-[#6256e2] hover:t-text-[#f8f8f8] t-duration-300 t-transition-all">
            اصلاح
          </span>
        </div>
      );
    },
  },
];

const Courselevellistinside = ({ getcourse }) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    if (getcourse) {
      setLevels(getcourse);
    }
  }, [getcourse]);

  return (
    <div>
      <div className="react-dataTable user-view-account-projects t-p-6 t-shadow-none">
        <DataTable
          noHeader
          responsive
          columns={columns}
          data={levels}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </div>
  );
};

export default Courselevellistinside;
