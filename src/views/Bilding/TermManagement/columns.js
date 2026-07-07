import moment from "jalali-moment";

export const columns = [
  {
    name: "نام ترم",
    selector: row => row.termName,
    sortable: true
  },
 
  {
    name: "تاریخ شروع",
    selector: row => row.startDate,
    sortable: true,
    cell: row =>
      row.startDate
        ? moment(row.startDate).locale("fa").format("YYYY/MM/DD")
        : "-"
  },
  {
    name: "تاریخ پایان",
    selector: row => row.endDate,
    sortable: true,
    cell: row =>
      row.endDate
        ? moment(row.endDate).locale("fa").format("YYYY/MM/DD")
        : "-"
  },
  {
    name: "وضعیت",
    selector: row => row.expire,
    sortable: true,
    cell: row => (
      <span
        className={`badge ${
          row.expire ? "bg-light-danger" : "bg-light-success"
        }`}
      >
        {row.expire ? "غیرفعال" : "فعال"}
      </span>
    )
  }
];