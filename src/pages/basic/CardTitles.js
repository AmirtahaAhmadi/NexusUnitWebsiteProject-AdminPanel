// ** Reactstrap Imports
import { Row } from "reactstrap";

// ** Imports
import { getAllCoursesadmincall } from "../../core/Interceptor/Courses/getCourseCreateDataCall";
import { useEffect, useState } from "react";
import ProductsSearchbar from "./productSeachBar/ProductSearchbar";
import { useSelector } from "react-redux";
import IconTextPagination from "../pagination/PaginationIconText";
import UserProjectsList from "../CourseList/view/UserProjectsList";

const CardTitles = () => {
  const [loading, setloading] = useState(false);
  const query = useSelector((value) => value.courses.searchQuery);
  const [page, setpage] = useState(1);
  const [rowsofpage, setrowsofpage] = useState(9);

  const [sortingcol, setsortingcol] = useState("lastUpdate");
  const [SortType, setSortType] = useState("asc");
  const [totalcount, settotalcount] = useState(null);
  const [getcourse, setgetcourse] = useState([]);

  const run = async () => {
    setloading(true);
    const result = await getAllCoursesadmincall(
      page,
      rowsofpage,
      sortingcol,
      SortType,
      query,
    );
    if (result) {
      settotalcount(result.totalCount);
      setgetcourse(result.courseDtos || []);
      setloading(false);
    } else {
      setloading(false);
    }
  };

  useEffect(() => {
    setpage(1);
  }, [query, sortingcol, SortType]);

  useEffect(() => {
    run();
  }, [page, rowsofpage, sortingcol, SortType, query]);

  return (
    <Row className="match-height">
      <ProductsSearchbar
        getcourse={getcourse}
        sortingcol={sortingcol}
        setsortingcol={setsortingcol}
        SortType={SortType}
        setSortType={setSortType}
      />

      {loading ? (
        <div>در حال پیدا کردن</div>
      ) : (
        <UserProjectsList getcourse={getcourse} />
      )}

      {!loading && totalcount === 0 && <div>موردی یافت نشد</div>}

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

export default CardTitles;
