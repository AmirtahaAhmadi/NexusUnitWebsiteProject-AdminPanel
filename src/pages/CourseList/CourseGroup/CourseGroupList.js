// ** Reactstrap Imports
import { Row } from "reactstrap";

// ** Images (در صورت بلااستفاده بودن بعداً می‌توانید حذف کنید)
import img1 from "@src/assets/images/slider/04.jpg";
import img2 from "@src/assets/images/slider/03.jpg";
import img3 from "@src/assets/images/slider/06.jpg";
import { useEffect, useState } from "react";

import { getCourseGroupsCall } from "../../../core/Interceptor/Courses/GetCourseGroupCall";
import CourseGroupListInside from "./CourseGroupListInside";
import IconTextPagination from "../../pagination/PaginationIconText";
import { useRefresh } from "../../../redux/zustan/refreshCourselvl";
import CoursegroupSeachbar from "./CoursegroupSeachbar";

const CourseGroupList = () => {
  const refreshit = useRefresh((state) => state.refresh);
  const [loading, setloading] = useState(false);

  const [query, setQuery] = useState("");
  const [page, setpage] = useState(1);
  const [rowsofpage, setrowsofpage] = useState(9);

  const [sortingcol, setsortingcol] = useState("groupCapacity");
  const [SortType, setSortType] = useState("desc");

  const [totalcount, settotalcount] = useState(null);
  const [getcourse, setgetcourse] = useState([]);

  const run = async () => {
    setloading(true);

    const result = await getCourseGroupsCall({
      pageNumber: page,
      rowsOfPage: rowsofpage,
      sortingCol: sortingcol,
      sortType: SortType,
      query: query,
    });

    if (result) {
      console.log("res", result);
      settotalcount(result.totalCount);
      setgetcourse(result?.courseGroupDtos);
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
  }, [page, rowsofpage, sortingcol, SortType, query, refreshit]);

  return (
    <Row className="match-height">
      <CoursegroupSeachbar
        query={query}
        setQuery={setQuery}
        sortingcol={sortingcol}
        setsortingcol={setsortingcol}
        SortType={SortType}
        setSortType={setSortType}
      />

      {loading ? (
        <div className="w-100 text-center my-3">در حال پیدا کردن...</div>
      ) : (
        <CourseGroupListInside getcourse={getcourse} />
      )}

      {!loading && totalcount === 0 && (
        <div className="w-100 text-center my-3">موردی یافت نشد</div>
      )}

      {!loading && totalcount > 0 && (
        <div className="mx-auto my-2" style={{ width: "fit-content" }}>
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

export default CourseGroupList;
