// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Store & Actions
// import { getAllData, getData } from '../store'
// import { useDispatch, useSelector } from 'react-redux'
import {
  getAllUsers,
  getCourseComments,
} from "../../../../core/Interceptor/Services/UserServices/get";

// ** Third Party Components
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import {
  ChevronDown,
  Share,
  Printer,
  FileText,
  File,
  Grid,
  Copy,
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  Trash2,
  Archive,
  Eye,
  Check,
  X,
} from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  Badge,
  UncontrolledTooltip,
} from "reactstrap";

import Avatar from "@components/avatar";

import { dateToLocal } from "../../user/store/DateToLocalFunction";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { AcceptCourseComment, DeleteCourseComment } from "../store/functions";
import ShowCommentRepliesModal from "../CommentModals/ShowCommentRepliesModal";
import AddReplyToCommentModal from "../CommentModals/AddReplyToCommentModal";

// ** Table Header
const CustomHeader = ({
  comments,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
  commentType,
}) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(comments[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="6" className="d-flex align-items-center p-0">
          <div className="d-flex align-items-center w-100">
            <label htmlFor="rows-per-page">تعداد در صفحه: </label>
            <Input
              className="mx-50"
              type="select"
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: "5rem" }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </Input>
          </div>
        </Col>
        {commentType.value == "coursesC" ? (
          <Col
            xl="6"
            className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
          >
            <div
              style={{ gap: "3px" }}
              className="d-flex align-items-center mb-sm-0 mb-1 me-1"
            >
              <label className="mb-0" htmlFor="search-invoice">
                جستجو:
              </label>
              <Input
                id="search-invoice"
                type="text"
                value={searchTerm}
                onChange={(e) => handleFilter(e.target.value)}
                placeholder="جستجو کنید"
              />
            </div>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

const UsersList = ({ renderCount, setRenderCount, newsComments }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [coursesComments, setCoursesComments] = useState([]);
  const [totalCount, setTotalCount] = useState();

  const [courseIdForReplies, setCourseIdForReplies] = useState();
  const [courseOrNewsCommentIdForReplies, setCourseOrNewsCommentIdForReplies] =
    useState();
  const [commentRepliesModal, setCommentRepliesModal] = useState(false);

  const [courseOrNewsIdForAddReply, setCourseOrNewsIdForAddReply] = useState();
  const [
    courseOrNewsCommentIdForAddReply,
    setCourseOrNewsCommentIdForAddReply,
  ] = useState();
  const [addReplyToCommentModalShow, setAddReplyToCommentModalShow] = useState(false);

  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [commentType, setCommentType] = useState({
    value: "coursesC",
    label: "کامنت دوره ها",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: null,
    label: "همه موارد",
  });

  const fetchGetAllCourseComments = async () => {
    setIsLoading(true);
    try {
      const response = await getCourseComments({
        pageNumber: currentPage,
        rowOfPage: rowsPerPage,
        sortingCol: sortColumn,
        sortType: sort,
        query: searchTerm,
        accept: currentStatus.value,
        // teacherId: '',
        // userId: '',
      });
      console.log(response.data);
      setCoursesComments(response.data.comments);
      setTotalCount(response.data.totalCount);
      setTotalPages(Math.ceil(response.data.totalCount / rowsPerPage));
    } catch (error) {
      console.error("userList error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutForUsers = setTimeout(() => {
      fetchGetAllCourseComments();
    }, 500);
    return () => clearTimeout(timeoutForUsers);
  }, [
    currentPage,
    rowsPerPage,
    sortColumn,
    sort,
    searchTerm,
    currentStatus,
    renderCount,
  ]);

  const statusObj = {
    true: "light-success",
    false: "light-danger",
  };

  const columns1 = [
    {
      name: "نام کاربر",
      sortable: true,
      minWidth: "150px",
      sortField: "title",
      selector: (row) => row.author,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{row.author || "--"}</span>
        </div>
      ),
    },
    {
      name: "نام دوره",
      sortable: true,
      minWidth: "100px",
      sortField: "title",
      selector: (row) => row.courseTitle,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{row.courseTitle || "--"}</span>
        </div>
      ),
    },
    {
      name: "عنوان کامنت",
      sortable: true,
      minWidth: "100px",
      sortField: "title",
      selector: (row) => row.commentTitle,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{row.commentTitle || "--"}</span>
        </div>
      ),
    },
    {
      name: "متن کامنت",
      sortable: true,
      minWidth: "120px",
      sortField: "text",
      selector: (row) => row.describe,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{row.describe || "--"}</span>
        </div>
      ),
    },
    {
      name: "وضعیت",
      minWidth: "100px",
      sortable: true,
      sortField: "status",
      selector: (row) => row.accept,
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.accept]} pill>
          {row.accept == true ? "تایید شده" : "تایید نشده"}
        </Badge>
      ),
    },
    {
      name: "تاریخ درج شدن",
      sortable: true,
      minWidth: "100px",
      sortField: "text",
      selector: (row) => row.insertDate,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{dateToLocal(row.insertDate)}</span>
        </div>
      ),
    },
    {
      name: "پاسخ ها",
      sortable: true,
      sortField: "status",
      selector: (row) => row.replyCount,
      cell: (row) => (
        <>
          {row.accept ? (
            <>
              <button
                id="showRepliesC"
                style={{ background: "none", border: "none" }}
                onClick={() => {
                  setCourseIdForReplies(row.courseId);
                  setCourseOrNewsCommentIdForReplies(row.commentId);
                  setCommentRepliesModal(true);
                }}
              >
                <Eye size={20} className="text-primary cursor-pointer" />
              </button>
              <UncontrolledTooltip placement="top" target="showRepliesC">
                نمایش پاسخ های کامنت
              </UncontrolledTooltip>
            </>
          ) : (
            <span>کامنت تایید نشده</span>
          )}
        </>
      ),
    },
    {
      name: "عملیات",
      minWidth: "200px",
      cell: (row) => (
        <div style={{ alignItems: "center", gap: "6px" }} className="d-flex">
          {row.accept ? (
            <>
              <button
                id="deleteCTop"
                style={{ background: "none", border: "none" }}
                onClick={() => {
                  DeleteCourseComment(row.commentId);
                  setRenderCount((prev) => prev + 1);
                }}
              >
                <Trash2 size={20} className="text-danger cursor-pointer" />
              </button>
              <UncontrolledTooltip placement="top" target="deleteCTop">
                حذف کردن کامنت
              </UncontrolledTooltip>
            </>
          ) : (
            <>
              <button
                id="acceptCTop"
                style={{ background: "none", border: "none" }}
                onClick={() => {
                  AcceptCourseComment(row.commentId);
                  setRenderCount((prev) => prev + 1);
                }}
              >
                <Badge
                  style={{ background: "none" }}
                  className="text-capitalize cursor-pointer"
                  color="success"
                >
                  <Check size={20} />
                </Badge>
              </button>
              <UncontrolledTooltip placement="top" target="acceptCTop">
                تایید کردن کامنت
              </UncontrolledTooltip>

              {/* <button
                id="unAcceptCTop"
                style={{ background: "none", border: "none" }}
              >
                <Badge
                  style={{ background: "none" }}
                  className="text-capitalize cursor-pointer"
                  color="danger"
                >
                  <X size={20} />
                </Badge>
              </button>
              <UncontrolledTooltip placement="top" target="unAcceptCTop">
                رد کردن کامنت
              </UncontrolledTooltip> */}

              <button
                id="deleteCTop"
                style={{ background: "none", border: "none" }}
                onClick={() => {
                  DeleteCourseComment(row.commentId);
                  setRenderCount((prev) => prev + 1);
                }}
              >
                <Trash2 size={20} className="text-danger cursor-pointer" />
              </button>
              <UncontrolledTooltip placement="top" target="deleteCTop">
                حذف کردن کامنت
              </UncontrolledTooltip>
            </>
          )}
          <button
            style={{ background: "none", border: "none" }}
            onClick={() => {
              setCourseOrNewsIdForAddReply(row.courseId);
              setCourseOrNewsCommentIdForAddReply(row.commentId);
              setAddReplyToCommentModalShow(true);
            }}
          >
            <Badge className="cursor-pointer" color="primary">
              <span style={{ fontSize: "13px" }}>پاسخ</span>
            </Badge>
          </button>
        </div>
      ),
    },
  ];

  const columns2 = [
    {
      name: "نام کاربر",
      sortable: true,
      minWidth: "150px",
      sortField: "title",
      selector: (row) => row.userFullName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{row.userFullName || "--"}</span>
        </div>
      ),
    },
    {
      name: "عنوان کامنت",
      sortable: true,
      minWidth: "100px",
      sortField: "title",
      selector: (row) => row.title,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{row.title || "--"}</span>
        </div>
      ),
    },
    {
      name: "متن کامنت",
      sortable: true,
      minWidth: "120px",
      sortField: "text",
      selector: (row) => row.describe,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{row.describe || "--"}</span>
        </div>
      ),
    },
    {
      name: "تاریخ درج شدن",
      sortable: true,
      minWidth: "100px",
      sortField: "text",
      selector: (row) => row.inserDate,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{dateToLocal(row.inserDate)}</span>
        </div>
      ),
    },
    {
      name: "پاسخ ها",
      sortable: true,
      sortField: "status",
      selector: (row) => row.replyCount,
      cell: (row) => (
        <>
          <button
            id="showRepliesC2"
            style={{ background: "none", border: "none" }}
            onClick={() => {
              setCourseOrNewsCommentIdForReplies(row.id);
              setCommentRepliesModal(true);
            }}
          >
            <Eye size={20} className="text-primary cursor-pointer" />
          </button>
          <UncontrolledTooltip placement="top" target="showRepliesC2">
            نمایش پاسخ های کامنت
          </UncontrolledTooltip>
        </>
      ),
    },
    {
      name: "عملیات",
      minWidth: "100px",
      cell: (row) => (
        <button
          style={{ background: "none", border: "none" }}
          onClick={() => {
            setCourseOrNewsIdForAddReply(row.newsId);
            setAddReplyToCommentModalShow(true);
          }}
        >
          <Badge className="cursor-pointer" color="primary">
            <span style={{ fontSize: "13px" }}>پاسخ</span>
          </Badge>
        </button>
      ),
    },
  ];

  const commentTypeOptions = [
    { value: "coursesC", label: "کامنت دوره ها" },
    { value: "newsC", label: "کامنت اخبار" },
  ];

  const statusOptions = [
    { value: null, label: "همه موارد" },
    { value: true, label: "تایید شده" },
    { value: false, label: "تایید نشده" },
  ];

  // ** Function in get data on page change
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  // ** Function in get data on rows per page
  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
  };

  // ** Function in get data on search query change
  const handleFilter = (val) => {
    setSearchTerm(val);
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={totalPages}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={handlePagination}
        pageClassName={"page-item"}
        activeClassName="active"
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  // ** Table data to render
  const dataToRender = () => {
    const filters = {
      status: currentStatus.value,
      q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k]?.length > 0;
    });

    if (totalCount > 0) {
      return coursesComments;
    } else if (totalCount === 0 && isFiltered) {
      return [];
    } else {
      return coursesComments?.slice(0, rowsPerPage);
    }
  };

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection);
    setSortColumn(column.sortField);
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle tag="h4">فیلتر ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            <Col md="4">
              <Label for="commentType-select">نوع کامنت</Label>
              <Select
                isClearable={false}
                options={commentTypeOptions}
                value={commentType}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(e) => {
                  setCommentType(e);
                }}
              />
            </Col>
            <Col md="4">
              <Label for="status-select">وضعیت</Label>
              <Select
                theme={selectThemeColors}
                isClearable={false}
                className="react-select"
                classNamePrefix="select"
                options={statusOptions}
                value={currentStatus}
                onChange={(data) => {
                  setCurrentStatus(data);
                }}
                isDisabled={commentType.value == "newsC"}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <div className="react-dataTable">
          {commentType.value == "coursesC" ? (
            <DataTable
              noHeader
              subHeader
              sortServer
              pagination
              responsive
              paginationServer
              columns={columns1}
              onSort={handleSort}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationComponent={CustomPagination}
              data={dataToRender()}
              subHeaderComponent={
                <CustomHeader
                  coursesComments={coursesComments}
                  searchTerm={searchTerm}
                  rowsPerPage={rowsPerPage}
                  handleFilter={handleFilter}
                  handlePerPage={handlePerPage}
                  commentType={commentType}
                />
              }
            />
          ) : (
            <DataTable
              noHeader
              subHeader
              responsive
              columns={columns2}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              data={newsComments}
            />
          )}
        </div>
      </Card>

      <ShowCommentRepliesModal
        courseId={courseIdForReplies}
        commentId={courseOrNewsCommentIdForReplies}
        commentRepliesModal={commentRepliesModal}
        setCommentRepliesModal={setCommentRepliesModal}
        commentType={commentType.value}
        renderCount={renderCount}
      />

      <AddReplyToCommentModal
        courseOrNewsId={courseOrNewsIdForAddReply}
        commentId={courseOrNewsCommentIdForAddReply}
        addReplyToCommentModalShow={addReplyToCommentModalShow}
        setAddReplyToCommentModalShow={setAddReplyToCommentModalShow}
        commentType={commentType.value}
        setRenderCount={setRenderCount}
      />
    </Fragment>
  );
};

export default UsersList;
