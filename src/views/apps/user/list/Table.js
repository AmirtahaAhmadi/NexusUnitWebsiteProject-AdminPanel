// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Invoice List Sidebar
import Sidebar from "./Sidebar";

import { Link } from "react-router-dom";

import Avatar from "@components/avatar";
import { DeleteUser, UserDetails } from "../store/functions";
import { getAllUsers } from "../../../../core/Interceptor/Services/UserServices/get";

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
  Plus,
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  Trash2,
  Archive,
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

import { dateToLocal } from "../store/DateToLocalFunction";
import AddUserAccessModal from "../view/AddUserAccessModal";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";

// ** Table Header
const CustomHeader = ({
  users,
  toggleSidebar,
  handlePerPage,
  rowsPerPage,
  handleFilter,
  searchTerm,
}) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(users[0]);

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
        <Col
          xl="6"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label className="mb-0" htmlFor="search-invoice">
              جستجو:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              type="text"
              value={searchTerm}
              onChange={(e) => handleFilter(e.target.value)}
              placeholder="جستجو کنید"
            />
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <Button
              className="add-new-user"
              color="primary"
              onClick={toggleSidebar}
            >
              <span>افزودن کاربر</span>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const UsersList = ({ renderCount, setRenderCount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState();

  const [selectedUserForRoleAccess, setSelectedUserForRoleAccess] = useState({});
  const [addUserAccessModalShow, setAddUserAccessModalShow] = useState(false);

  const [sort, setSort] = useState("desc");
  const [searchTerm, setSearchTerm] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortColumn, setSortColumn] = useState("id");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState({
    value: null,
    label: "انتخاب نقش",
  });
  const [currentStatus, setCurrentStatus] = useState({
    value: null,
    label: "انتخاب وضعیت",
  });

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // ** Get data on mount
  useEffect(() => {
    const fetchGetAllUser = async () => {
      setIsLoading(true);
      try {
        const response = await getAllUsers({
          pageNumber: currentPage,
          rowOfPage: rowsPerPage,
          sortingCol: sortColumn,
          sortType: sort,
          query: searchTerm,
          isActiveUser: currentStatus.value,
          // isDeletedUser: '',
          roleId: currentRole.value,
        });
        console.log(response.data.listUser);
        setUsers(response.data.listUser);
        setTotalCount(response.data.totalCount);
        setTotalPages(Math.ceil(response.data.totalCount / rowsPerPage));
      } catch (error) {
        console.error("userList error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    const timeoutForUsers = setTimeout(() => {
      fetchGetAllUser();
    }, 1000);
    return () => clearTimeout(timeoutForUsers);
  }, [
    currentPage,
    rowsPerPage,
    sortColumn,
    sort,
    searchTerm,
    currentStatus,
    currentRole.value,
    renderCount,
  ]);

  const renderClient = (row) => {
    if (row.currentPictureAddress != null) {
      return (
        <Avatar
          className="me-1"
          img={row.currentPictureAddress}
          width="32"
          height="32"
        />
      );
    } else {
      return (
        <Avatar
          initials
          className="me-1"
          color={"light-primary"}
          content={row.fName + " " + row.lName || "John Doe"}
        />
      );
    }
  };

  // ** Renders Role Columns
  const renderRole = (row) => {
    const roleObj = {
      admin: {
        class: "text-danger",
        icon: Slack,
      },
      student: {
        class: "text-primary",
        icon: User,
      },
      teacher: {
        class: "text-success",
        icon: Database,
      },
      GOD: {
        class: "text-warning",
        icon: Settings,
      },
    };

    const Icon = roleObj[row] ? roleObj[row].icon : Edit2;

    return (
      <>
        <span
          title={row}
          style={{ display: "flex", alignItems: "center", gap: "2px" }}
          className="text-truncate text-capitalize align-middle me-50"
        >
          <Icon
            size={18}
            className={`${roleObj[row] ? roleObj[row].class : ""}`}
          />
          {row}
        </span>
      </>
    );
  };

  const statusObj = {
    true: "light-success",
    false: "light-danger",
  };

  const columns = [
    {
      name: "نام",
      sortable: true,
      minWidth: "350px",
      sortField: "fName",
      selector: (row) => row.fName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <Link
            to={`/user/view/${row.id}`}
            className="user_name text-truncate text-body"
            style={{ display: "flex", alignItems: "center" }}
          >
            {renderClient(row)}
            <div style={{ gap: "2px" }} className="d-flex flex-column">
              <span className="fw-bolder">
                {row.fName} {row.lName}
              </span>
              <small className="text-truncate text-muted mb-0">
                {row.gmail}
              </small>
            </div>
          </Link>
        </div>
      ),
    },
    {
      name: "نقش ها",
      sortable: true,
      minWidth: "350px",
      sortField: "role",
      selector: (row) => row.roles,
      cell: (row) =>
        row.roles.length != 0 ? (
          row.roles.map((role) => renderRole(role))
        ) : (
          <Badge className="text-capitalize" color={"light-secondary"} pill>
            بدون نقش
          </Badge>
        ),
    },
    {
      name: "وضعیت",
      sortable: true,
      sortField: "status",
      selector: (row) => row.active,
      cell: (row) => (
        <Badge className="text-capitalize" color={statusObj[row.active]} pill>
          {row.active == true ? "فعال" : "غیر فعال"}
        </Badge>
      ),
    },
    {
      name: "تاریخ ثبت نام",
      minWidth: "100px",
      sortable: true,
      selector: (row) => row.insertDate,
      cell: (row) => dateToLocal(row.insertDate),
    },
    {
      name: "عملیات",
      minWidth: "200px",
      cell: (row) => (
        <>
          <div style={{ alignItems: "center", gap: "6px" }} className="d-flex">
            <button
              id="deleteUserT"
              style={{ background: "none", border: "none" }}
              onClick={() => {
                DeleteUser(row.id)
                setRenderCount((prev) => prev + 1);
              }}
            >
              <Trash2 size={20} className="text-danger" />
            </button>
            <UncontrolledTooltip placement="top" target="deleteUserT">
              حذف کردن کاربر
            </UncontrolledTooltip>

            <button
              style={{ background: "none", border: "none" }}
              onClick={() => {
                setSelectedUserForRoleAccess(row)
                setAddUserAccessModalShow(true)
              }}
            >
              <Badge style={{ height: "25px" }} className="cursor-pointer" color="primary">
                <span style={{ fontSize: "13.5px" }}>دسترسی</span>
              </Badge>
            </button>
          </div>
        </>
      ),
    },
  ];

  // ** User filter options
  const roleOptions = [
    { value: null, label: "انتخاب نقش" },
    { value: 1, label: "ادمین" },
    { value: 2, label: "مربی" },
    { value: 3, label: "دانشجو" },
    { value: 10, label: "گاد" },
  ];

  const statusOptions = [
    { value: null, label: "انتخاب وضعیت" },
    { value: true, label: "فعال" },
    { value: false, label: "غیر فعال" },
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
      role: currentRole.value,
      status: currentStatus.value,
      q: searchTerm,
    };

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k]?.length > 0;
    });

    if (totalCount > 0) {
      return users;
    } else if (totalCount === 0 && isFiltered) {
      return [];
    } else {
      return users.slice(0, rowsPerPage);
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
              <Label for="role-select">نقش</Label>
              <Select
                isClearable={false}
                value={currentRole}
                options={roleOptions}
                className="react-select"
                classNamePrefix="select"
                theme={selectThemeColors}
                onChange={(e) => {
                  setCurrentRole(e);
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
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card className="overflow-hidden">
        <div className="react-dataTable">
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className="react-dataTable"
            paginationComponent={CustomPagination}
            data={dataToRender()}
            subHeaderComponent={
              <CustomHeader
                users={users}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>

      <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
        setRenderCount={setRenderCount}
      />

      <AddUserAccessModal
        selectedUser={selectedUserForRoleAccess}
        locationUsing={'userList'}
        roleAccessModalShow={addUserAccessModalShow}
        setRoleAccessModalShow={setAddUserAccessModalShow}
        setUserDetailsRenderCount={setRenderCount}
      />
    </Fragment>
  );
};

export default UsersList;
