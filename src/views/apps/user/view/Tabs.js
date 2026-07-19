// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import {
  User,
  Lock,
  Bookmark,
  Bell,
  Link,
  DollarSign,
  CheckSquare,
  ShoppingBag,
} from "react-feather";

// ** User Components
import BillingPlanTab from "./BillingTab";
import UserCourses from "./UserCourses";
import UserReservedCoursesList from "./UserReservedCoursesList";
import UserComments from "./UserComments";
import UserOtherDetails from "./UserOtherDetails";
import UserSocialMedia from "./UserSocialMedia";

const UserTabs = ({
  active,
  toggleTab,
  currentUserDetails,
  userDetailsRenderCount,
  setUserDetailsRenderCount,
}) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <CheckSquare className="font-medium-3 me-50" />
            <span className="fw-bold">دوره ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <ShoppingBag className="font-medium-3 me-50" />
            <span className="fw-bold">دوره های رزرو</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <DollarSign className="font-medium-3 me-50" />
            <span className="fw-bold">پرداخت ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">کامنت ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "5"} onClick={() => toggleTab("5")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">سایر اطلاعات کاربر</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "6"} onClick={() => toggleTab("6")}>
            <Link className="font-medium-3 me-50" />
            <span className="fw-bold">شبکه های اجتماعی</span>
          </NavLink>
        </NavItem>
      </Nav>

      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <UserCourses
            currentUserDetails={currentUserDetails}
            userDetailsRenderCount={userDetailsRenderCount}
          />
        </TabPane>
        <TabPane tabId="2">
          <UserReservedCoursesList
            currentUserDetails={currentUserDetails}
            setUserDetailsRenderCount={setUserDetailsRenderCount}
          />
        </TabPane>
        <TabPane tabId="3">
          <BillingPlanTab currentUserDetails={currentUserDetails} />
        </TabPane>
        <TabPane tabId="4">
          <UserComments currentUserDetails={currentUserDetails} userDetailsRenderCount={userDetailsRenderCount} setUserDetailsRenderCount={setUserDetailsRenderCount} />
        </TabPane>
        <TabPane tabId="5">
          <UserOtherDetails currentUserDetails={currentUserDetails} />
        </TabPane>
        <TabPane tabId="6">
          <UserSocialMedia currentUserDetails={currentUserDetails} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
