// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";

// ** Reactstrap Imports
import {
  X,
  Mail,
  PhoneCall,
  Clock,
  Tag,
  Star,
  Image,
  Trash,
  Slash,
} from "react-feather";

const UserProfileSidebar = (props) => {
  // ** Props
  const { user, handleUserSidebarRight, userSidebarRight } = props;

  return (
    <div
      className={classnames("user-profile-sidebar", {
        show: userSidebarRight === true,
      })}
    >
      <header className="user-profile-header">
        <span className="close-icon" onClick={handleUserSidebarRight}>
          <X size={14} />
        </span>
        <div className="header-profile-sidebar">
          <Avatar
            className="box-shadow-1 avatar-border"
            size="xl"
            status={user.status}
            img={user.avatar}
            imgHeight="70"
            imgWidth="70"
          />
          <h4 className="chat-user-name">{user.fullName}</h4>
          <span className="user-post">{user.role}</span>
        </div>
      </header>
      <PerfectScrollbar
        className="user-profile-sidebar-area"
        options={{ wheelPropagation: false }}
      >
        <h6 className="section-label mb-1">درباره</h6>
        <p>{user.about}</p>
        <div className="personal-info">
          <h6 className="section-label mb-1 mt-3">اطلاعات شخصی</h6>
          <ul className="list-unstyled">
            <li>
              <Mail className="me-75" size={17} />
              <span>{user.email || "ثبت نشده"}</span>
            </li>

            <li>
              <PhoneCall className="me-75" size={17} />
              <span>{user.phoneNumber || "ثبت نشده"}</span>
            </li>

            <li>
              <Clock className="me-75" size={17} />
              <span>{user.insertDate || "-"}</span>
            </li>
          </ul>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default UserProfileSidebar;
