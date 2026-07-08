import { Badge } from "reactstrap";

export const columns = [
  {
    name: "نام کلاس",
    selector: (row) => row.classRoomName,
    sortable: true,
    cell: (row) => row.classRoomName,
  },
  {
    name: "ساختمان",
    selector: (row) => row.building?.buildingName,
    sortable: true,
    cell: (row) => row.building?.buildingName || "-",
  },
  {
    name: "ظرفیت",
    selector: (row) => row.capacity,
    sortable: true,
    cell: (row) => (
      <Badge color="light-primary" pill>
        {row.capacity} نفر
      </Badge>
    ),
  },
];
