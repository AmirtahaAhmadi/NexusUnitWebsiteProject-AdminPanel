import { Badge } from "reactstrap";

export const columns = [
  {
    name: "نام دپارتمان",
    selector: (row) => row.depName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => row.depName,
  },
  {
    name: "ساختمان",
    selector: (row) => row.buildingName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => row.buildingName || "-",
  },
  {
    name: "شناسه",
    selector: (row) => row.id,
    sortable: true,
    minWidth: "150px",
    cell: (row) => row.id,
  },
];