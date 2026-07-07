import { Badge } from "reactstrap";

export const columns = [
  {
    name: "نام ساختمان",
    selector: (row) => row.buildingName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => row.buildingName,
  },
  {
    name: "تعداد طبقات",
    selector: (row) => row.floor,
    sortable: true,
    center: true,
    cell: (row) => row.floor,
  },
  {
    name: "عرض جغرافیایی",
    selector: (row) => row.latitude,
    sortable: true,
    minWidth: "180px",
    cell: (row) => row.latitude,
  },
  {
    name: "طول جغرافیایی",
    selector: (row) => row.longitude,
    sortable: true,
    minWidth: "180px",
    cell: (row) => row.longitude,
  },
  {
    name: "وضعیت",
    selector: (row) => row.active,
    sortable: true,
    center: true,
    cell: (row) => (
      <Badge color={row.active ? "light-success" : "light-danger"} pill>
        {row.active ? "فعال" : "غیرفعال"}
      </Badge>
    ),
  },
];
