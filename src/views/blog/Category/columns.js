// ** React Imports
import { Link } from "react-router-dom";

// ** Third Party Components
import classnames from "classnames";

// ** Reactstrap Imports
import { Badge } from "reactstrap";

const categoryColors = {
  product: "light-primary",
  blog: "light-success",
  service: "light-warning",
  news: "light-info"
};
const categoryLabels = {
  product: "محصولات",
  blog: "مقالات",
  service: "خدمات",
  news: "اخبار"
};
export const columns = [
  {
    name: "نام دسته‌بندی",
    sortable: true,
    minWidth: "300px",
    selector: row => row.name,
    cell: ({ name }) => name
  },

  {
    name: "نوع دسته‌بندی",
    sortable: true,
    minWidth: "250px",

    cell: ({ categoryType }) => (
      <Badge
        pill
        color={categoryColors[categoryType]}
      >
        {categoryLabels[categoryType]}
      </Badge>
    )
  },

  {
    name: "تاریخ ایجاد",
    sortable: true,
    minWidth: "250px",

    selector: row => row.createdDate,

    cell: ({ createdDate }) =>
      new Date(createdDate).toLocaleDateString("fa-IR"),

    sortFunction: (rowA, rowB) =>
      new Date(rowB.createdDate) - new Date(rowA.createdDate)
  }
];