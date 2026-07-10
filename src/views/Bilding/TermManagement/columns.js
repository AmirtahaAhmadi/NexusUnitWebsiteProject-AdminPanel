import moment from "jalali-moment";

const formatJalali = (date) => {
  if (!date) return "-";
  try {
    const m = moment(date);
    if (!m.isValid()) return "-";
    const gYear = m.year();
    if (gYear < 1900 || gYear > 2100) return "-";
    return m.locale("fa").format("YYYY/MM/DD");
  } catch (e) {
    console.error("خطا در فرمت تاریخ جلالی:", date, e);
    return "-";
  }
};

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
    cell: row => formatJalali(row.startDate)
  },
  {
    name: "تاریخ پایان",
    selector: row => row.endDate,
    sortable: true,
    cell: row => formatJalali(row.endDate)
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