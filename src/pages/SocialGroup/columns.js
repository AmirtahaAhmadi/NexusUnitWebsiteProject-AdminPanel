export const columns = [
  {
    name: "نام کورس",
    selector: (row) => row.course?.title ?? row.courseName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => row.course?.title ?? row.courseName,
  },
  {
    name: "نام گروه",
    selector: (row) => row.groupName,
    sortable: true,
    minWidth: "200px",
    cell: (row) => row.groupName,
  },
  {
    name: "لینک گروه",
    selector: (row) => row.groupLink,
    sortable: true,
    minWidth: "250px",
    cell: (row) => row.groupLink,
  },
];