// ** React Imports
import { Link, useNavigate } from "react-router-dom";
import { Fragment, useState, useEffect, useRef } from "react";
// ** Third Party Components
import classnames from "classnames";
import Select from "react-select";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  FileText,
  Edit2,
  X,
  Search,
  Plus,
  CheckCircle,
  XCircle,
} from "react-feather";

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
  Label,
  InputGroup,
  InputGroupText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  FormGroup,
  UncontrolledTooltip,
} from "reactstrap";
// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/base/pages/page-blog.scss";

// ** API Services
import { getNewsWidthPagination } from "../../../core/Interceptor/Services/blogPageServices/get";
import { createNews } from "../../../core/Interceptor/Services/blogPageServices/post";
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
  const blogRef = useRef(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newGoogleTitle, setNewGoogleTitle] = useState("");
  const [newGoogleDescribe, setNewGoogleDescribe] = useState("");
  const [newMiniDescribe, setNewMiniDescribe] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [newIsSlider, setNewIsSlider] = useState(false);
  const [newContent, setNewContent] = useState(EditorState.createEmpty());
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [newSelectedCategory, setNewSelectedCategory] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);
  const [newImgPath, setNewImgPath] = useState("");

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
      setActiveCount(
        newsList.filter((n) => n.active || n.isActive || n.status === "active")
          .length,
      );

      setInactiveCount(
        newsList.filter(
          (n) => !(n.active || n.isActive || n.status === "active"),
        ).length,
      );
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

  const resetAddForm = () => {
    setNewTitle("");
    setNewGoogleTitle("");
    setNewGoogleDescribe("");
    setNewMiniDescribe("");
    setNewKeyword("");
    setNewIsSlider(false);
    setNewContent(EditorState.createEmpty());
    setNewSelectedCategory(null);
    setNewImageFile(null);
    setNewImagePreview(null);
    setNewImgPath("");
  };

  const handleAddNewBlog = () => {
    handleUpdate({
      id: "b28b240b-2248-4b73-a6d5-5e9ab72e09dc",
    });
  };

  const toggleAddModal = () => {
    if (isCreating) return;
    setIsAddModalOpen((prev) => !prev);
  };

  const onChangeNewImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setNewImageFile(file);
    setNewImgPath(file.name);

    const reader = new FileReader();
    reader.onload = () => setNewImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCreateNews = async () => {
    if (!newTitle.trim()) {
      toast.error("عنوان خبر الزامی است");
      return;
    }
    if (!newSelectedCategory) {
      toast.error("انتخاب دسته‌بندی الزامی است");
      return;
    }

    setIsCreating(true);
    try {
      const rawContentState = convertToRaw(newContent.getCurrentContent());
      const htmlContent = draftToHtml(rawContentState);

      await createNews({
        title: newTitle,
        googleTitle: newGoogleTitle,
        googleDescribe: newGoogleDescribe,
        miniDescribe: newMiniDescribe,
        describe: htmlContent,
        keyword: newKeyword,
        isSlider: newIsSlider,
        newsCategoryId: newSelectedCategory.value,
        image: newImageFile,
      });

      toast.success("خبر جدید با موفقیت ایجاد شد");
      setIsAddModalOpen(false);
      resetAddForm();
      setSortingCol("InsertDate");
      setSortType("DESC");
      setStatusFilter("");
      if (currentPage !== 1) {
        setCurrentPage(1);
      } else {
        fetchNews();
      }
    } catch (error) {
      console.error("API ERROR (create news):", error);
      toast.error("خطا در ایجاد خبر جدید");
    } finally {
      setIsCreating(false);
    }
  };

  const getIsActive = (item) =>
    item.active ?? item.isActive ?? item.status === "active";

  const renderStatusBadge = (item) => {
    const isActive = getIsActive(item);
    return (
      <Badge color={isActive ? "light-success" : "light-danger"} pill>
        {isActive ? "فعال" : "غیرفعال"}
      </Badge>
    );
  };

  const handleEdit = (item) => {
    navigate(`/pages/blog/edit/${item.id}`);
  };

  const handleUpdate = (item) => {
    navigate(`/pages/blog/edit/${item.id}`);
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
          news.id === item.id ? { ...news, isActive: willActivate } : news,
        ),
      );

      toast.success(willActivate ? "خبر فعال شد" : "خبر غیرفعال شد");

      fetchNews();
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
    const updateId = `blog-action-update-${item.id}`;
    const cancelId = `blog-action-cancel-${item.id}`;

    return (
      <div className="d-flex align-items-center justify-content-center gap-75">
        <FileText
          id={editId}
          size={17}
          className="cursor-pointer text-info"
          onClick={() => handleEdit(item)}
        />
        <UncontrolledTooltip placement="top" target={editId}>
          مشاهده / ویرایش
        </UncontrolledTooltip>

        <Edit2
          id={updateId}
          size={17}
          className="cursor-pointer text-primary"
          onClick={() => handleUpdate(item)}
        />
        <UncontrolledTooltip placement="top" target={updateId}>
          آپدیت
        </UncontrolledTooltip>

        <X
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
                <Pagination className="d-flex justify-content-center flex-wrap">
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
              <Button color="primary" onClick={() => handleUpdate(data[0])}>
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

      <Modal
        isOpen={isAddModalOpen}
        toggle={toggleAddModal}
        size="lg"
        backdrop="static"
      >
        <ModalHeader toggle={toggleAddModal}>افزودن خبر جدید</ModalHeader>
        <ModalBody>
          <Row>
            <Col md="6" className="mb-2">
              <Label className="form-label" for="new-news-title">
                عنوان (Title) *
              </Label>
              <Input
                id="new-news-title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="عنوان خبر را وارد کنید"
              />
            </Col>
            <Col md="6" className="mb-2">
              <Label className="form-label" for="new-news-category">
                دسته بندی (NewsCatregoryId) *
              </Label>
              <Select
                id="new-news-category"
                isClearable
                theme={selectThemeColors}
                value={newSelectedCategory}
                name="category"
                options={categoryOptions}
                className="react-select"
                classNamePrefix="select"
                onChange={(value) => setNewSelectedCategory(value)}
              />
            </Col>
            <Col md="6" className="mb-2">
              <Label className="form-label" for="new-news-google-title">
                عنوان گوگل (GoogleTitle)
              </Label>
              <Input
                id="new-news-google-title"
                value={newGoogleTitle}
                onChange={(e) => setNewGoogleTitle(e.target.value)}
              />
            </Col>
            <Col md="6" className="mb-2">
              <Label className="form-label" for="new-news-keyword">
                کلمات کلیدی (Keyword)
              </Label>
              <Input
                id="new-news-keyword"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                placeholder="با کاما جدا کنید"
              />
            </Col>
            <Col md="6" className="mb-2">
              <Label className="form-label" for="new-news-google-describe">
                توضیح گوگل (GoogleDescribe)
              </Label>
              <Input
                id="new-news-google-describe"
                type="textarea"
                rows="2"
                value={newGoogleDescribe}
                onChange={(e) => setNewGoogleDescribe(e.target.value)}
              />
            </Col>
            <Col md="6" className="mb-2">
              <Label className="form-label" for="new-news-mini-describe">
                توضیح کوتاه (MiniDescribe)
              </Label>
              <Input
                id="new-news-mini-describe"
                type="textarea"
                rows="2"
                value={newMiniDescribe}
                onChange={(e) => setNewMiniDescribe(e.target.value)}
              />
            </Col>
            <Col sm="12" className="mb-2">
              <FormGroup switch>
                <Input
                  type="switch"
                  role="switch"
                  id="new-news-is-slider"
                  checked={newIsSlider}
                  onChange={(e) => setNewIsSlider(e.target.checked)}
                />
                <Label check for="new-news-is-slider">
                  نمایش در اسلایدر (IsSlider)
                </Label>
              </FormGroup>
            </Col>
            <Col sm="12" className="mb-2">
              <Label className="form-label">محتوا (Describe)</Label>
              <Editor
                editorState={newContent}
                onEditorStateChange={setNewContent}
              />
            </Col>
            <Col sm="12" className="mb-2">
              <div className="border rounded p-2">
                <h6 className="mb-1">تصویر (Image)</h6>
                <div className="d-flex flex-column flex-md-row">
                  {newImagePreview && (
                    <img
                      className="rounded me-2 mb-1 mb-md-0"
                      src={newImagePreview}
                      alt="پیش‌نمایش تصویر"
                      width="150"
                      height="100"
                    />
                  )}
                  <div>
                    <small className="text-muted d-block mb-50">
                      حداقل رزولوشن تصویر 800x400، حجم مجاز تا 10 مگابایت.
                    </small>
                    {newImgPath && (
                      <p className="my-50 mb-1">
                        <small>{newImgPath}</small>
                      </p>
                    )}
                    <Input
                      type="file"
                      id="new-news-image"
                      name="newNewsImage"
                      onChange={onChangeNewImage}
                      accept=".jpg, .jpeg, .png, .gif"
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            color="secondary"
            outline
            onClick={toggleAddModal}
            disabled={isCreating}
          >
            انصراف
          </Button>
          <Button
            color="primary"
            onClick={handleCreateNews}
            disabled={isCreating}
          >
            {isCreating && <Spinner size="sm" className="me-50" />}
            ایجاد خبر
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default BlogList;
