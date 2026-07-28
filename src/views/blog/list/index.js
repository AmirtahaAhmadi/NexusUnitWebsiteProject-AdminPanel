// ** React Imports
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useState, useEffect, useRef } from "react";
// ** Third Party Components
import classnames from "classnames";
import Select from "react-select";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Edit2, X, Search, Plus, CheckCircle, XCircle, AlertCircle } from "react-feather";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  Badge,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Input,
  InputGroup,
  InputGroupText,
  Button,
  Spinner,
  UncontrolledTooltip,
} from "reactstrap";
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";

// ** API Services
import { getNewsWidthPagination } from "../../../core/Interceptor/Services/blogPageServices/get";
import { activeDeactiveNews } from "../../../core/Interceptor/Services/EditPageServices/put";
import { getListNewsCategory } from "../../../core/Interceptor/Services/EditPageServices/get";

const toSafeArray = (value) => {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    const nestedArray = Object.values(value).find((v) => Array.isArray(v));
    return nestedArray ?? [];
  }
  return [];
};

const getIsActive = (item) =>
  item?.active ?? item?.isActive ?? item?.status === "active";

const BlogList = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [SortingCol, setSortingCol] = useState("InsertDate");
  const [SortType, setSortType] = useState("DESC");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(13);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const blogRef = useRef(null);

  const fetchNews = async () => {
    setIsLoading(true);

    try {
      const response = await getNewsWidthPagination({
        RowsOfPage: rowsPerPage,
        Query: search,
        SortingCol: SortingCol,
        SortType: SortType,
        pageNumber: currentPage,
        IsActive: statusFilter === "" ? undefined : statusFilter === "true",
        NewsCategoryId: categoryFilter ? categoryFilter.value : undefined,
      });

      const newsList = response.data.news ?? [];

      setData(newsList);
      setTotalCount(response.data.totalCount ?? newsList.length);
      setActiveCount(newsList.filter((n) => getIsActive(n)).length);
      setInactiveCount(newsList.filter((n) => !getIsActive(n)).length);
    } catch (error) {
      console.error("API ERROR:", error);
      toast.error("خطا در دریافت لیست اخبار");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search, SortingCol, SortType, rowsPerPage, statusFilter, categoryFilter]);

  useEffect(() => {
    fetchNews();
  }, [
    search,
    SortingCol,
    SortType,
    currentPage,
    rowsPerPage,
    statusFilter,
    categoryFilter,
  ]);

  const totalPages = Math.max(1, Math.ceil(totalCount / rowsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  useEffect(() => {
    if (blogRef.current) {
      blogRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentPage]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryRes = await getListNewsCategory();
        const rawCategories =
          categoryRes.data?.categories ?? categoryRes.data ?? [];
        const categories = toSafeArray(rawCategories).map((c) => ({
          value: c.id,
          label: c.categoryName,
        }));
        setCategoryOptions(categories);
      } catch (error) {
        console.error("API ERROR (categories):", error);
      }
    };

    fetchCategories();
  }, []);

  const renderStatusBadge = (item) => {
    const isActive = getIsActive(item);
    return (
      <Badge color={isActive ? "light-success" : "light-danger"} pill>
        {isActive ? "فعال" : "غیرفعال"}
      </Badge>
    );
  };

  const handleEdit = (item) => {
    console.log("[BlogList] کلیک روی دکمه ویرایش (مداد) - آیتم:", item);
    console.log("[BlogList] در حال رفتن به مسیر ویرایش با id:", item.id);
    navigate(`/pages/blog/edit/${item.id}`);
  };

  const handleAddNewBlog = () => {
    console.log("[BlogList] کلیک روی دکمه افزودن بلاگ جدید");
    console.log("[BlogList] در حال رفتن به مسیر افزودن با id='new'");
    navigate(`/pages/blog/edit/new`);
  };

  const handleCancel = async (item) => {
    const currentlyActive = getIsActive(item);
    const willActivate = !currentlyActive;

    const result = await Swal.fire({
      title: willActivate ? "فعال‌سازی خبر" : "غیرفعال‌سازی خبر",
      icon: "warning",
      html: willActivate
        ? `آیا از فعال کردن خبر «<b>${item.title}</b>» مطمئن هستید؟`
        : `آیا از غیرفعال کردن خبر «<b>${item.title}</b>» مطمئن هستید؟`,
      showCancelButton: true,
      confirmButtonText: willActivate ? "بله، فعال کن" : "بله، غیرفعال کن",
      cancelButtonText: "انصراف",
      focusConfirm: false,
      confirmButtonColor: willActivate ? "#28c76f" : "#ea5455",
    });

    if (!result.isConfirmed) return;

    try {
      await activeDeactiveNews(item.id, willActivate);

      setData((prev) =>
        prev.map((news) =>
          news.id === item.id
            ? { ...news, active: willActivate, isActive: willActivate }
            : news,
        ),
      );

      setActiveCount((prev) => (willActivate ? prev + 1 : prev - 1));
      setInactiveCount((prev) => (willActivate ? prev - 1 : prev + 1));

      toast.success(willActivate ? "خبر فعال شد" : "خبر غیرفعال شد");
    } catch (error) {
      console.error(
        "=== activeDeactiveNews ERROR ===",
        error?.response?.data ?? error,
      );
      toast.error("خطا در تغییر وضعیت خبر");
    }
  };

  const renderActions = (item) => {
    const editId = `blog-action-edit-${item.id}`;
    const cancelId = `blog-action-cancel-${item.id}`;

    return (
      <div className="d-flex align-items-center justify-content-center gap-75">
        <Edit2
          id={editId}
          size={17}
          className="cursor-pointer text-primary"
          onClick={() => handleEdit(item)}
        />
        <UncontrolledTooltip placement="top" target={editId}>
          ویرایش
        </UncontrolledTooltip>

        <AlertCircle
          id={cancelId}
          size={17}
          className="cursor-pointer text-warning"
          onClick={() => handleCancel(item)}
        />
        <UncontrolledTooltip placement="top" target={cancelId}>
          فعال / غیرفعال کردن
        </UncontrolledTooltip>
      </div>
    );
  };

  const renderRenderList = () => {
    return (
      <Card className="blog-table-card mb-0">
        <CardBody>
          <div className="blog-table-wrapper table-responsive">
            <Table hover className="align-middle blog-table mb-0">
              <thead>
                <tr>
                  <th>نام بلاگ</th>
                  <th>دسته بندی</th>
                  <th className="text-center">آخرین آپدیت</th>
                  <th className="text-center">تعداد کامنت</th>
                  <th className="text-center">وضعیت</th>
                  <th className="text-center">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td data-label="نام بلاگ">
                      <Link
                        className="blog-title-truncate text-body-heading fw-bold d-block"
                        to={`/pages/blog/detail/${item.id}`}
                      >
                        {item.title}
                      </Link>
                    </td>
                    <td data-label="دسته بندی">
                      {item.category?.categoryName || item.newsCatregoryName ? (
                        <Badge color="light-secondary" pill>
                          {item.category?.categoryName ||
                            item.newsCatregoryName}
                        </Badge>
                      ) : (
                        <small className="text-muted">-</small>
                      )}
                    </td>
                    <td className="text-center" data-label="آخرین آپدیت">
                      <small className="text-muted">
                        {new Date(item.insertDate).toLocaleDateString("fa-IR")}
                      </small>
                    </td>
                    <td className="text-center" data-label="تعداد کامنت">
                      <span className="fw-bold">{item.currentView}</span>
                    </td>
                    <td className="text-center" data-label="وضعیت">
                      {renderStatusBadge(item)}
                    </td>
                    <td className="text-center" data-label="عملیات">
                      {renderActions(item)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {totalPages > 1 && (
            <Row className="mt-2">
              <Col sm="12">
                <Pagination
                  className="d-flex justify-content-center flex-wrap"
                  style={{ direction: "ltr" }}
                >
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink
                      previous
                      onClick={() =>
                        currentPage > 1 && setCurrentPage(currentPage - 1)
                      }
                    />
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem
                      key={index}
                      active={currentPage === index + 1}
                    >
                      <PaginationLink onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem disabled={currentPage === totalPages}>
                    <PaginationLink
                      next
                      onClick={() =>
                        currentPage < totalPages &&
                        setCurrentPage(currentPage + 1)
                      }
                    />
                  </PaginationItem>
                </Pagination>
              </Col>
            </Row>
          )}
        </CardBody>
      </Card>
    );
  };

  return (
    <Fragment>
      <Breadcrumbs
        title="لیست وبلاگ"
        data={[{ title: "صفحات" }, { title: "وبلاگ" }, { title: "لیست" }]}
      />
      <div className="blog-wrapper">
        <div className="content-body">
          <Row className="mb-1">
            <Col md="6" sm="12" className="mb-1 mb-md-0">
              <Card
                className={classnames("mb-0 cursor-pointer", {
                  "border-success": statusFilter === "true",
                })}
                onClick={() =>
                  setStatusFilter((prev) => (prev === "true" ? "" : "true"))
                }
              >
                <CardBody className="d-flex align-items-center justify-content-between py-1">
                  <div>
                    <p className="text-muted mb-0">اخبار تأیید شده</p>
                    <h3 className="fw-bold mb-0">{activeCount}</h3>
                  </div>
                  <CheckCircle size={32} className="text-success" />
                </CardBody>
              </Card>
            </Col>
            <Col md="6" sm="12">
              <Card
                className={classnames("mb-0 cursor-pointer", {
                  "border-danger": statusFilter === "false",
                })}
                onClick={() =>
                  setStatusFilter((prev) => (prev === "false" ? "" : "false"))
                }
              >
                <CardBody className="d-flex align-items-center justify-content-between py-1">
                  <div>
                    <p className="text-muted mb-0">اخبار تأیید نشده</p>
                    <h3 className="fw-bold mb-0">{inactiveCount}</h3>
                  </div>
                  <XCircle size={32} className="text-danger" />
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="mb-1 align-items-center">
            <Col md="3" sm="12" className="mb-1 mb-md-0">
              <div className="d-flex align-items-center">
                <span className="text-nowrap me-50">تعداد در صفحه</span>
                <Input
                  type="select"
                  bsSize="sm"
                  style={{ width: "90px" }}
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                >
                  <option value={13}>13</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </Input>
              </div>
            </Col>
            <Col
              md="9"
              sm="12"
              className="d-flex align-items-center justify-content-md-end gap-1 flex-wrap"
            >
              <div style={{ minWidth: "220px" }}>
                <Select
                  isClearable
                  placeholder="فیلتر دسته‌بندی..."
                  theme={selectThemeColors}
                  value={categoryFilter}
                  name="categoryFilter"
                  options={categoryOptions}
                  className="react-select"
                  classNamePrefix="select"
                  onChange={(value) => setCategoryFilter(value)}
                />
              </div>
              <InputGroup style={{ maxWidth: "260px" }}>
                <InputGroupText>
                  <Search size={16} />
                </InputGroupText>
                <Input
                  placeholder="جستجو در بلاگ‌ها..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </InputGroup>
              <Button color="primary" onClick={handleAddNewBlog}>
                <Plus size={15} className="me-50" />
                افزودن بلاگ جدید
              </Button>
            </Col>
          </Row>

          {isLoading ? (
            <div className="d-flex w-100 align-items-center justify-content-center py-5">
              <Spinner color="primary" />
            </div>
          ) : data.length > 0 ? (
            <div className="blog-list-wrapper" ref={blogRef}>
              {renderRenderList()}
            </div>
          ) : (
            <div className="text-center py-3 text-muted">
              موردی برای نمایش وجود ندارد.
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default BlogList;
