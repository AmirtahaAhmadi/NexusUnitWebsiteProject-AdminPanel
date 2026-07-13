// ** Reactstrap Imports
import { Badge, Card, CardHeader, CardTitle, Col, Input, Progress, Row } from "reactstrap";

// ** Third Party Components
import { Check, ChevronDown, ChevronsDown, Trash2, X } from "react-feather";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Label Images
import xdLabel from "@src/assets/images/icons/brands/xd-label.png";
import vueLabel from "@src/assets/images/icons/brands/vue-label.png";
import htmlLabel from "@src/assets/images/icons/brands/html-label.png";
import reactLabel from "@src/assets/images/icons/brands/react-label.png";
import sketchLabel from "@src/assets/images/icons/brands/sketch-label.png";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

import { useEffect, useState } from "react";
import { getCourseComments, getCourseDetails } from "../../../../core/Interceptor/Services/UserServices/get";
import { dateToLocal } from "../store/DateToLocalFunction";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

const CustomHeader = ({
  userCourseComments,
  searchQuery,
  handleFilter,
}) => {
  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col
          xl="6"
        // className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div style={{ gap: '5px' }} className="d-flex flex-column mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              جستجو:
            </label>
            <Input
              id="search-invoice"
              className="w-100"
              type="text"
              value={searchQuery}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

const statusColors = {
  true: "light-success",
  false: "light-danger",
};

const columns3 = [
  {
    sortable: true,
    minWidth: "200px",
    name: "نام دوره",
    selector: (row) => row.courseTitle,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div style={{ gap: "2px" }} className="d-flex">
          <span className="fw-bolder">{row.courseTitle || '--'}</span>
        </div>
      </div>
    ),
  },
  {
    name: "تاریخ ایجاد",
    selector: (row) => dateToLocal(row.insertDate),
  },
  {
    name: "عنوان کامنت",
    selector: (row) => row.commentTitle || '--',
  },
  {
    name: "متن کامنت",
    selector: (row) => row.discribe || '--',
  },
  {
    name: "وضعیت کامنت",
    selector: (row) => row.accept || '--',
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {/* <Link
          // to={`/apps/user/view/${row.id}`}
          className="user_name text-truncate text-body"
          style={{ display: "flex", alignItems: "center" }}
        > */}
        <div style={{ gap: "2px" }} className="d-flex">
          <Badge
            className="text-capitalize"
            color={statusColors[row.accept]}
          >
            {row.accept ? 'تایید شده' : 'تایید نشده'}
          </Badge>
        </div>
        {/* </Link> */}
      </div>
    ),
  },
  {
    name: "عملیات",
    minWidth: "150px",
    selector: (row) => row.accept,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <div style={{ gap: "8px" }} className="d-flex">
          {row.accept ? 'تایید شده' : (
            <>
              <Badge
                style={{ background: 'none' }}
                className="text-capitalize cursor-pointer"
                color='success'
              >
                <Check size={20} />
              </Badge>
              <Badge
                style={{ background: 'none' }}
                className="text-capitalize cursor-pointer"
                color='danger'
              >
                <X size={20} />
              </Badge>
              <Trash2 size={20} className="text-primary cursor-pointer" />
            </>
          )}
        </div>
      </div>
    ),
  },
];

const UserComments = ({ currentUserDetails }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userCourseComments, setUserCourseComments] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const fetchGetAllUserCourseComments = async () => {
    // setIsLoading(true)
    try {
      const response = await getCourseComments({
        // pageNumber: currentPage,
        rowOfPage: 200,
        // sortingCol: '',
        sortType: 'asc',
        query: searchQuery,
        accept: null,
        teacherId: '',
        userId: currentUserDetails.id,
      })
      console.log(response.data)
      setUserCourseComments(response.data.comments)
      setTotalCount(response.data.comments.length)
      setTotalPages(Math.ceil(response.data.comments.length / 10))
    } catch (error) {
      console.error("userCourseCommentsList error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const timeoutForUserComments = setTimeout(() => {
      fetchGetAllUserCourseComments();
    }, 500)
    return () => clearTimeout(timeoutForUserComments)
  }, [currentPage, searchQuery, currentUserDetails.id]);

  const dataToRender = () => {
    const filters = {
      q: searchQuery,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k]?.length > 0;
    });

    if (totalCount > 0) {
      return userCourseComments
    } else if (totalCount === 0 && isFiltered) {
      return [];
    } else {
      return userCourseComments.slice(0, 10);
    }
  };

  const handleFilter = (val) => {
    setSearchQuery(val);
  };

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

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

  return (
    <>
      <Card className="overflow-hidden">
        <CardTitle style={{ margin: '22px' }}>کامنت های دوره های کاربر</CardTitle>
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns3}
            // onSort={handleSort}
            sortIcon={<ChevronsDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                userCourseComments={userCourseComments}
                searchQuery={searchQuery}
                handleFilter={handleFilter}
              />
            }
          />
        </div>
      </Card>
    </>
  );
};

export default UserComments;
