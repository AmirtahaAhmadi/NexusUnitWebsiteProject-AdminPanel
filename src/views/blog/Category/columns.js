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

    selector: (row) => row.categoryName,

    cell: ({ categoryName }) => categoryName,
  },

  {
    name: "عنوان گوگل",
    sortable: true,
    minWidth: "350px",

    selector: (row) => row.googleTitle,

    cell: ({ googleTitle }) => googleTitle,
  },

  {
    name: "توضیحات گوگل",
    sortable: true,
    minWidth: "500px",

    selector: (row) => row.GoogleDescribe,

    cell: ({ GoogleDescribe }) => (
      <span className="text-truncate d-inline-block" style={{ maxWidth: "450px" }}>
        {GoogleDescribe}
      </span>
    ),
  }
];