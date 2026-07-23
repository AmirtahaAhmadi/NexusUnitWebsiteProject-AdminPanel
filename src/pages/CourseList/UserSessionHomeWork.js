// ** Reactstrap Imports
import {
  Button,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardSubtitle,
  CardLink,
  CardImg,
  Row,
  Col,
} from "reactstrap";

// ** Images
import img1 from "@src/assets/images/slider/04.jpg";
import img2 from "@src/assets/images/slider/03.jpg";
import img3 from "@src/assets/images/slider/06.jpg";
import { getAllCoursesadmincall } from "../../core/Interceptor/Courses/getCourseCreateDataCall";
import { useEffect, useState } from "react";

import { dateToLocal } from "../../core/Interceptor/reusablefunctions/DateTolocal";
import ProductsSearchbar from "../basic/productSeachBar/ProductSearchbar";
import { useSelector } from "react-redux";

import IconTextPagination from "../pagination/PaginationIconText";
import UserProjectsList from "../CourseList/view/UserProjectsList";

import { GetCourselevelcall } from "../../core/Interceptor/Courses/GetCourselevelcall";
import { useRefresh } from "../../redux/zustan/refreshCourselvl";
import { GetStatusCall } from "../../core/Interceptor/Courses/GetStatusCall";

import { GetCurrentUserSessionHomeWorkcall } from "../../core/Interceptor/Courses/GetCurrentUserSessionHomeWork";
import UserSessionHomeWorKinsideList from "./UserSessionHomeWorKinsideList";
const UserSessionHomeWork = () => {
  const refreshWatch = useRefresh((state) => state.refresh);
  const [loading, setloading] = useState(false);
  const query = useSelector((value) => value.courses.searchQuery);
  const [page, setpage] = useState(1);
  const [rowsofpage, setrowsofpage] = useState(9);
  const [sortingcol, setsortingcol] = useState("lastUpdate");
  const [SortType, setSortType] = useState("asc");
  // const [Query, setQuery] = useState("");
  const [totalcount, settotalcount] = useState(null);

  const [getcourse, setgetcourse] = useState([]);
  const run = async () => {
    setloading(true);
    const result = await GetCurrentUserSessionHomeWorkcall(
      page,
      rowsofpage,
      sortingcol,
      SortType,
      query,
    );
    if (result) {
      console.log("resfsdfsd", result);
      settotalcount(result.length);
      setgetcourse(result?.data);
      setloading(false);
    } else {
      setloading(false);
    }
  };
  useEffect(() => {
    setpage(1);
  }, [query]);

  useEffect(() => {
    run();
  }, [page, rowsofpage, sortingcol, SortType, query, refreshWatch]);

  return (
    <Row className="match-height">
      {/* <ProductsSearchbar /> */}
      {loading ? (
        <div>در حال پیدا کردن</div>
      ) : (
        <UserSessionHomeWorKinsideList getcourse={getcourse} />
      )}
      {!loading && totalcount == 0 && <div>موردی یافت نشد</div>}
      {!loading && totalcount > 0 && (
        <div className="mx-auto" style={{ width: "fit-content" }}>
          <IconTextPagination
            totalCount={totalcount}
            rowsofpage={rowsofpage}
            page={page}
            setpage={setpage}
          />
        </div>
      )}
    </Row>
  );
};

export default UserSessionHomeWork;
