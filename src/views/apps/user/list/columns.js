// ** React Imports
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Store & Actions
// import { store } from '@store/store'
// import { getUser, deleteUser } from '../store'
import { DeleteUser, UserDetails } from "../store/functions";

// ** Icons Imports
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
} from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { dateToLocal } from "../store/DateToLocalFunction";
import AddUserAccessModal from "../view/AddUserAccessModal";

// ** Renders Client Columns
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
  // pending: 'light-warning',
  true: "light-success",
  false: "light-danger",
};

export const columns = [
  {
    name: "نام",
    sortable: true,
    minWidth: "350px",
    sortField: "fName",
    selector: (row) => row.fName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <Link
          to={`/apps/user/view/${row.id}`}
          className="user_name text-truncate text-body"
          style={{ display: "flex", alignItems: "center" }}
        >
          {renderClient(row)}
          <div style={{ gap: "2px" }} className="d-flex flex-column">
            <span className="fw-bolder">
              {row.fName} {row.lName}
            </span>
            <small className="text-truncate text-muted mb-0">{row.gmail}</small>
          </div>
        </Link>
      </div>
    ),
  },
  {
    name: "نقش ها",
    sortable: true,
    minWidth: "400px",
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
    minWidth: "138px",
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
    sortable: true,
    minWidth: "100px",
    selector: (row) => row.insertDate,
    cell: (row) => dateToLocal(row.insertDate),
  },
  {
    name: "عملیات",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={`/apps/user/view/${row.id}`}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">اطلاعات</span>
            </DropdownItem>
            <DropdownItem
              tag="div"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">دسترسی</span>
            </DropdownItem>
            <DropdownItem
              tag="div"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                // DeleteUser(row.id);
              }}
            >
              <Trash2 size={14} className="me-50" />
              <span className="align-middle">حذف</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <AddUserAccessModal
          selectedUser={row}
          // roleAccessModalShow={roleAccessModalShow}
          // setRoleAccessModalShow={setRoleAccessModalShow}
          // setUserDetailsRenderCount={setRenderCount}
        />
      </div>
    ),
  },
];
