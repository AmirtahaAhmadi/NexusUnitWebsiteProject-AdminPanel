// ** Reactstrap Imports
import { Card, CardHeader } from "reactstrap";

// ** Third Party Components
import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useEffect, useState } from "react";
import ShowSingleTechTab from "./showSingleTechTab";
// ** Columns Configuration for Course Levels
export const columns = [
  {
    name: "نام سطح",
    sortable: true,
    minWidth: "180px",
    selector: (row) => row.levelName,
    cell: (row) => {
      return <span className="fw-bolder text-dark">{row.techName}</span>;
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
          {row && <ShowSingleTechTab array={row} />}
        </div>
      );
    },
  },
];

const CoursetechlistInside = ({ getcourse }) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    if (getcourse) {
      setLevels(getcourse);
    }
  }, [getcourse]);
  useEffect(() => {
    console.log("courseTech:", levels);
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

export default CoursetechlistInside;
