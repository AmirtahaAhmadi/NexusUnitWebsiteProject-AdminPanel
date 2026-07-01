// ** React Imports
import { Link } from "react-router-dom";
import { Fragment, useState, useEffect, useRef } from "react";
// ** Third Party Components
import classnames from "classnames";
import { MessageSquare } from "react-feather";
import Users from "/src/assets/images/portrait/small/avatar-s-11.jpg";
import images from "../../../assets/images/pages/Rectangle 34.png";
// ** Custom Components
import Sidebar from "../BlogSidebar";
import Avatar from "@components/avatar";
import Breadcrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardImg,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/page-blog.scss";
import { getNewsWidthPagination } from "../../../core/Interceptor/Services/blogPageServices/get";

const BlogList = () => {
  // ** States
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [SortingCol, setSortingCol] = useState("Score");
  const [SortType, setSortType] = useState("DESC");
  const [overViewStatus, setOverViewStatus] = useState("score");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const blogRef = useRef(null);
  const fetchNews = async () => {
    setIsLoading(true);

    try {
      const response = await getNewsWidthPagination({
        RowsOfPage: 6,
        Query: search,
        SortingCol: SortingCol,
        SortType: SortType,
        pageNumber: currentPage,
      });

      setData(response.data.news);
      console.log("دیتا", response.data.news[0]);
      console.log("دیتای دریافتی", response.data.news);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("API ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchNews();
  }, [search, SortingCol, SortType, currentPage]);

  const totalPages = Math.ceil(totalCount / 6);
  useEffect(() => {
    if (blogRef.current) {
      blogRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);
  const badgeColorsArr = {
    Quote: "light-info",
    Fashion: "light-primary",
    Gaming: "light-danger",
    Video: "light-warning",
    Food: "light-success",
  };

  const renderRenderList = () => {
    return data.map((item) => {
      const renderTags = () => {
        if (!item.tags || item.tags.length === 0) return null;

        return item.tags.map((tag, index) => (
          <a key={index} href="/" onClick={(e) => e.preventDefault()}>
            <Badge
              className={classnames({
                "me-50": index !== item.tags.length - 1,
              })}
              color={badgeColorsArr[tag] || "light-secondary"}
              pill
            >
              {tag}
            </Badge>
          </a>
        ));
      };

      return (
        <Col key={item.id} md="6">
          {" "}
          <Card>
            <Link to={`/pages/blog/detail/${item.id}`}>
              <CardImg
                className="img-fluid"
                src={images}
                alt={item.title}
                top
              />
            </Link>
            <CardBody>
              <CardTitle tag="h4">
                <Link
                  className="blog-title-truncate text-body-heading"
                  to={`/pages/blog/detail/${item.id}`}
                >
                  {item.title}
                </Link>
              </CardTitle>
              <div className="d-flex">
                <Avatar
                  className="me-50"
                  img={Users}
                  imgHeight="24"
                  imgWidth="24"
                />
                <div>
                  <small className="text-muted me-25">نویسنده:</small>{" "}
                  <small>
                    <a
                      className="text-body"
                      href="/"
                      onClick={(e) => e.preventDefault()}
                    >
                      {item.userFullName}
                    </a>
                  </small>
                  <span className="text-muted ms-50 me-25">
                    {" "}
                    {item.addUserFullName}
                  </span>
                  <small className="text-muted">
                    {new Date(item.insertDate).toLocaleDateString("fa-IR")}
                  </small>{" "}
                </div>
              </div>
              <div className="my-1 py-25">{item.describe}</div>
              <CardText className="blog-content-truncate">
                {item.miniDescribe}
              </CardText>
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <Link to={`/pages/blog/detail/${item.id}`}>
                  <MessageSquare size={15} className="text-body me-50" />
                  <span className="text-body fw-bold">
                    {item.currentView} دیدگاه
                  </span>{" "}
                </Link>
                <Link className="fw-bold" to={`/pages/blog/detail/${item.id}`}>
                  ادامه مطلب
                </Link>
              </div>
            </CardBody>
          </Card>
        </Col>
      );
    });
  };

  return (
    <Fragment>
      <Breadcrumbs
        title="لیست وبلاگ"
        data={[{ title: "صفحات" }, { title: "وبلاگ" }, { title: "لیست" }]}
      />{" "}
      <div className="blog-wrapper">
        <div className="content-detached content-left">
          <div className="content-body">
            {data.length > 0 ? (
              <div className="blog-list-wrapper" ref={blogRef}>
                {" "}
                <div className="d-flex gap-1 mb-2 flex-wrap"></div>
                <Row>{renderRenderList()}</Row>
                <Row>
                  <Col sm="12">
                    <Pagination className="d-flex justify-content-center mt-2">
                      <PaginationItem disabled={currentPage === 1}>
                        <PaginationLink
                          previous
                          onClick={() => setCurrentPage(currentPage - 1)}
                        />
                      </PaginationItem>

                      {[...Array(totalPages)].map((_, index) => (
                        <PaginationItem
                          key={index}
                          active={currentPage === index + 1}
                        >
                          <PaginationLink
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      <PaginationItem disabled={currentPage === totalPages}>
                        <PaginationLink
                          next
                          onClick={() => setCurrentPage(currentPage + 1)}
                        />
                      </PaginationItem>
                    </Pagination>
                  </Col>
                </Row>
              </div>
            ) : null}
          </div>
        </div>
        <Sidebar
          setSearch={setSearch}
          overViewStatus={overViewStatus}
          setOverViewStatus={setOverViewStatus}
          setSortingCol={setSortingCol}
          setSortType={setSortType}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </Fragment>
  );
};

export default BlogList;
