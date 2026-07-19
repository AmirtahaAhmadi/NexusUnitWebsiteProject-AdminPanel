// ** React Imports
import { Link } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";

// ** Third Party Components
import classnames from "classnames";
import * as Icon from "react-feather";
import images from "../../assets/images/pages/Rectangle 34.png";
import image from "../../assets/Rectangle 37(1).png";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { InputGroup, Input, InputGroupText } from "reactstrap";
import { getNewsWidthPagination } from "../../core/Interceptor/Services/blogPageServices/get";
const BlogSidebar = ({
  setSearch,
  overViewStatus,
  setOverViewStatus,
  setSortingCol,
  setSortType,
  setCurrentPage,
}) => {
  // ** States
  const [data, setData] = useState(null);
  const dateToLocal = (a) => new Date(a).toLocaleDateString("fa-IR");

  const [isLoading, setIsLoading] = useState(false);
  const fetchNews = async () => {
    setIsLoading(true);

    try {
      const response = await getNewsWidthPagination({
        RowsOfPage: 6,

        pageNumber: 1,
      });

      setData(response.data.news);

      console.log("دیتای دریافتی", response.data.news);
    } catch (error) {
      console.error("API ERROR:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);
  const filters = [
    {
      label: "همه",
      col: "Score",
      type: "DESC",
      status: "score",
      icon: "Grid",
    },
    {
      label: "محبوب‌ترین‌ها",
      col: "currentLikeCount",
      type: "DESC",
      status: "favorite",
      icon: "Heart",
    },
    {
      label: "پربازدیدترین‌ها",
      col: "currentView",
      type: "DESC",
      status: "view",
      icon: "Eye",
    },
    {
      label: "جدیدترین‌ها",
      col: "insertDate",
      type: "DESC",
      status: "new",
      icon: "Clock",
    },
  ];

  const renderFilters = () => {
    return filters.map((item, index) => {
      const IconTag = Icon[item.icon];

      return (
        <div
          key={index}
          className={classnames(
            "d-flex justify-content-start align-items-center",
            {
              "mb-75": index !== filters.length - 1,
            },
          )}
          onClick={() => {
            setCurrentPage(1);
            setOverViewStatus(item.status);
            setSortingCol(item.col);
            setSortType(item.type);
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="me-75">
            <Avatar
              className="rounded"
              color={
                overViewStatus === item.status
                  ? "light-primary"
                  : "light-secondary"
              }
              icon={<IconTag size={15} />}
            />
          </div>

          <div
            className={`blog-category-title ${
              overViewStatus === item.status
                ? "text-primary fw-bold"
                : "text-body"
            }`}
          >
            {item.label}
          </div>
        </div>
      );
    });
  };

  const renderRecentPosts = () => {
    return data.map((post, index) => (
      <div
        key={index}
        className={classnames("d-flex", {
          "mb-2": index !== data.length - 1,
        })}
      >
        <Link className="me-2" to={`/pages/blog/detail/${post.id}`}>
          <img
            className="rounded"
            src={image}
            alt={post.title}
            width="100"
            height="70"
          />
        </Link>

        <div>
          <h6 className="blog-recent-post-title ">
            <Link
              className="text-body-heading"
              to={`/pages/blog/detail/${post.id}`}
            >
              {post.title}
            </Link>
          </h6>

          <div className="text-muted mb-0">{dateToLocal(post.insertDate)}</div>
        </div>
      </div>
    ));
  };

  return (
    <div className="sidebar-detached sidebar-right">
      <div className="sidebar">
        <div className="blog-sidebar right-sidebar my-2 my-lg-0">
          <div className="right-sidebar-content">
            <div className="blog-search">
              <InputGroup className="input-group-merge">
                <Input
                  placeholder="جستجو..."
                  onChange={(e) => {
                    setCurrentPage(1);
                    setSearch(e.target.value);
                  }}
                />
                <InputGroupText>
                  <Icon.Search size={14} />
                </InputGroupText>
              </InputGroup>
            </div>
            {data !== null ? (
              <Fragment>
                <div className="blog-recent-posts mt-3">
                  <h6 className="section-label">مطالب اخیر</h6>
                  <div className="mt-75">{renderRecentPosts()}</div>
                </div>
                <div className="blog-categories mt-3">
                  <h6 className="section-label">فیلترها</h6>
                  <div className="mt-1">{renderFilters()}</div>
                </div>
              </Fragment>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
