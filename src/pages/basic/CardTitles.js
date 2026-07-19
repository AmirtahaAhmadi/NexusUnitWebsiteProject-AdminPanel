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
import rec from "./Rectangle.png";
import { dateToLocal } from "../../core/Interceptor/reusablefunctions/DateTolocal";
import ProductsSearchbar from "./productSeachBar/ProductSearchbar";
import { useSelector } from "react-redux";
import ReactPaginate from "../pagination";
import IconTextPagination from "../pagination/PaginationIconText";
import UserProjectsList from "../CourseList/view/UserProjectsList";

const CardTitles = () => {
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
    const result = await getAllCoursesadmincall(
      page,
      rowsofpage,
      sortingcol,
      SortType,
      query,
    );
    if (result) {
      // console.log("res", result);
      settotalcount(result.totalCount);
      setgetcourse(result.courseDtos);
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
  }, [page, rowsofpage, sortingcol, SortType, query]);

  return (
    <Row className="match-height">
      <ProductsSearchbar />
      {loading ? (
        <div>در حال پیدا کردن</div>
      ) : (
        <UserProjectsList getcourse={getcourse} />
        // getcourse?.map((el) => (
        //   <Col lg="4" md="6" key={el.courseId}>
        //     {/* <Card>
        //       <CardImg top src={rec} alt="Card cap" />
        //       <CardBody>
        //         <CardTitle tag="h4">{el.title}</CardTitle>
        //         <CardText>{el.describe}</CardText>
        //         <div className="d-flex flex-row justify-content-between align-items-center w-[80%]">
        //           <div>
        //             <div
        //               className="d-flex flex-row   w-100 mb-2"
        //               style={{ gap: "3px" }}>
        //               <div>موجودی:</div>
        //               <div>{el.capacity}</div>
        //             </div>
        //             <div
        //               className="d-flex flex-row  w-100 mb-2"
        //               style={{ gap: "3px" }}>
        //               <div>نام مدرس:</div>
        //               <div>{el.fullName}</div>
        //             </div>

        //             <div
        //               className="d-flex flex-row   w-100 mb-2"
        //               style={{ gap: "3px" }}>
        //               <div className="text-bold">تاریخ شروع:</div>
        //               <div className="text-[12px]">
        //                 {dateToLocal(el.startTime)}
        //               </div>
        //             </div>

        //             <div
        //               className="d-flex flex-row w-100 mb-2"
        //               style={{ gap: "3px" }}>
        //               <div>نوع فعالیت:</div>
        //               {el.isActive ? <div>فعال</div> : <div>غیرفعال</div>}
        //             </div>

        //             <div
        //               className="d-flex flex-row  w-100 mb-2"
        //               style={{ gap: "3px" }}>
        //               <div>کد کورس:</div>
        //               {el.courseId}
        //             </div>

        //             <div
        //               className="d-flex flex-row  w-100 mb-2"
        //               style={{ gap: "3px" }}>
        //               <div>کد استاتوس</div>
        //               {el.statusId}
        //             </div>
        //           </div>

        //           <div>
        //             <div
        //               className="d-flex flex-row   w-100 mb-2"
        //               style={{ gap: "3px" }}>
        //               <div>قیمت:</div>
        //               <div>{el.cost}</div>
        //             </div>
        //             <div
        //               className="d-flex flex-row   w-100 mb-2"
        //               style={{ gap: "3px" }}>
        //               <div>اخرین بروزرسانی:</div>
        //               <div className="text-[12px]">
        //                 {dateToLocal(el.lastUpdate)}
        //               </div>
        //             </div>
        //             <div
        //               className="d-flex flex-row   w-100 mb-2"
        //               style={{ gap: "3px" }}>
        //               <div>تاریخ پایان:</div>
        //               <div className="text-[12px]">
        //                 {dateToLocal(el.endTime)}
        //               </div>
        //             </div>
        //             <div
        //               className="d-flex flex-row   w-100 mb-2"
        //               style={{ gap: "3px" }}>
        //               <div>حذف شده:</div>
        //               {el.isDelete ? <div>بله</div> : <div>خیر</div>}
        //             </div>

        //             <div
        //               className="d-flex flex-row  w-100 mb-2"
        //               style={{ gap: "3px" }}>
        //               <div>کد سطح:</div>
        //               {el.courseLvlId}
        //             </div>

        //             <div
        //               className="d-flex flex-row  w-100 mb-2"
        //               style={{ gap: "3px" }}>
        //               <div>کد استاد:</div>
        //               {el.teacherId}
        //             </div>
        //           </div>
        //         </div>
        //         <Button color="primary" outline>
        //           Go Somewhere
        //         </Button>
        //       </CardBody>
        //     </Card> */}
        //   </Col>
        // ))
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

export default CardTitles;
