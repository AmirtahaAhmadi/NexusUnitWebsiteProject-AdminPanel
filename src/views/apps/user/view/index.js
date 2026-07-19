// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Store & Actions
// import { getUser } from '../store'
// import { useSelector, useDispatch } from 'react-redux'
import {
  getUserDetails,
  getUserSkills,
} from "../../../../core/Interceptor/Services/UserServices/get";

// ** Reactstrap Imports
import { Row, Col, Alert, Spinner } from "reactstrap";

// ** User View Components
import UserTabs from "./Tabs";
import UserInfoCard from "./UserInfoCard";

// ** Styles
import "@styles/react/apps/app-users.scss";

const UserView = () => {
  // ** Store Vars
  const [currentUserDetails, setCurrentUserDetails] = useState({});
  const [userDetailsRenderCount, setUserDetailsRenderCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // ** Hooks
  const { id } = useParams();

  // ** Get user on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const response = await getUserDetails(id);
        console.log(response.data);
        setCurrentUserDetails(response.data);
        // console.log(currentUserDetails)
      } catch (error) {
        console.error("userDetails error:", error);
        if (error.response.status == 500) {
          setCurrentUserDetails(null)
        }
      } finally {
        setIsLoading(false);
      }
    };
    const timeoutForUserDetails = setTimeout(() => {
      fetchUserDetails();
    }, 100);
    return () => clearTimeout(timeoutForUserDetails);
  }, [id, userDetailsRenderCount]);

  const [active, setActive] = useState("1");

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  return currentUserDetails != null && currentUserDetails != undefined ? (
    <div className="app-user-view">
      {isLoading ? (
        <div
          style={{ width: "100%" }}
          className="d-flex justify-content-center"
        >
          <Spinner color="primary" />
        </div>
      ) : currentUserDetails ? (
        <Row>
          <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
            <UserInfoCard
              selectedUser={currentUserDetails}
              setUserDetailsRenderCount={setUserDetailsRenderCount}
            />
          </Col>
          <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
            <UserTabs
              active={active}
              toggleTab={toggleTab}
              currentUserDetails={currentUserDetails}
              userDetailsRenderCount={userDetailsRenderCount}
              setUserDetailsRenderCount={setUserDetailsRenderCount}
            />
          </Col>
        </Row>
      ) : null}
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">کاربر پیدا نشد</h4>
      <div className="alert-body">
        کاربری با آیدی: {id} وجود ندارد. چک کردن لیست کاربران{" "}
        <Link to="/apps/user/list">لیست کاربران</Link>
      </div>
    </Alert>
  );
};
export default UserView;
