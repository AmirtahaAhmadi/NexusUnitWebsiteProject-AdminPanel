export const columns = [
  {
    name: "نام کورس",
    selector: (row) => row.courseName,
    sortable: true,
    minWidth: "250px",
    cell: (row) => row.courseName,
  },
  {
    name: "نام دستیار",
    selector: (row) => row.assistanceName,
    sortable: true,
    minWidth: "200px",
    cell: (row) => row.assistanceName,
  },
];