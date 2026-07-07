// ** React Imports
import { useContext, useEffect, useState } from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Demo Components
import CompanyTable from "./CompanyTable";
import Earnings from "@src/views/ui-elements/cards/analytics/Earnings";
import CardMedal from "@src/views/ui-elements/cards/advance/CardMedal";
import CardMeetup from "@src/views/ui-elements/cards/advance/CardMeetup";
import StatsCard from "@src/views/ui-elements/cards/statistics/StatsCard";
import GoalOverview from "@src/views/ui-elements/cards/analytics/GoalOverview";
import RevenueReport from "@src/views/ui-elements/cards/analytics/RevenueReport";
import OrdersBarChart from "@src/views/ui-elements/cards/statistics/OrdersBarChart";
import CardTransactions from "@src/views/ui-elements/cards/advance/CardTransactions";
import ProfitLineChart from "@src/views/ui-elements/cards/statistics/ProfitLineChart";
import CardBrowserStates from "@src/views/ui-elements/cards/advance/CardBrowserState";

// ** Styles
import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";
import {
  getCourseList,
  getCourseUserList,
  getMyCourses,
  getMyCoursesComments,
  getMyCoursesReserve,
  getMyFavoriteCourses,
  getMyFavoriteNews,
  getMyJobHistories,
  getUserProfileInfo,
} from "../../../core/Interceptor/Services/DashboardServices/get";

const EcommerceDashboard = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [myReserve, setMyReserve] = useState([]);
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [favoriteNews, setFavoriteNews] = useState([]);
  const [comments, setComments] = useState([]);
  const [jobHistory, setJobHistory] = useState([]);
  const [courseUsers, setCourseUsers] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    try {
      setLoading(true);

      const [
        profileRes,
        myCourseRes,
        reserveRes,
        favoriteCourseRes,
        favoriteNewsRes,
        commentsRes,
        // jobRes,
        courseUserRes,
        courseListRes,
      ] = await Promise.all([
        getUserProfileInfo(),
        getMyCourses(),
        getMyCoursesReserve(),
        getMyFavoriteCourses(),
        getMyFavoriteNews(),
        getMyCoursesComments(),
        // getMyJobHistories(),
        getCourseUserList(),
        getCourseList(),
      ]);

      setProfile(profileRes.data);
      setMyCourses(myCourseRes.data.listOfMyCourses);
      setMyReserve(reserveRes.data);
      setFavoriteCourses(favoriteCourseRes.data.favoriteCourseDto);
      setFavoriteNews(favoriteNewsRes.data.myFavoriteNews);
      setComments(commentsRes.data.myCommentsDtos);
      //   setJobHistory(jobRes.data);
      setCourseUsers(courseUserRes.data);
      setCourseList(courseListRes.data.courseDtos);
    } catch (errro) {
      console.error(errro);
      setError("خطا در دریافت اطلاعات داشبورد");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ** Context
  const { colors } = useContext(ThemeColors);

  // ** vars
  const trackBgColor = "#e9ecef";

  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <CardMedal profile={profile} />
        </Col>
        <Col xl="8" md="6" xs="12">
          <StatsCard
            myCourses={myCourses}
            myReserve={myReserve}
            favoriteCourses={favoriteCourses}
            favoriteNews={favoriteNews}
            cols={{ xl: "3", sm: "6" }}
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="4" md="12">
          <Row className="match-height">
            <Col lg="6" md="3" xs="6">
              <OrdersBarChart
                warning={colors.warning.main}
                myCourses={myCourses}
              />
            </Col>
            <Col lg="6" md="3" xs="6">
              <ProfitLineChart info={colors.info.main} myReserve={myReserve} />
            </Col>
            <Col lg="12" md="6" xs="12">
              <Earnings
                success={colors.success.main}
                myCourses={myCourses}
                myReserve={myReserve}
              />{" "}
            </Col>
          </Row>
        </Col>
        <Col lg="8" md="12">
          <RevenueReport
            primary={colors.primary.main}
            warning={colors.warning.main}
            courseUsers={courseUsers}
          />
        </Col>
      </Row>
      <Row className="match-height">
        <Col lg="8" xs="12">
          <CompanyTable courses={courseList} />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardMeetup jobHistory={jobHistory} />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardBrowserStates
            favoriteCourses={favoriteCourses}
            favoriteNews={favoriteNews}
            colors={colors}
            trackBgColor={trackBgColor}
          />
        </Col>
        <Col lg="4" md="6" xs="12">
          <GoalOverview success={colors.success.main} profile={profile} />
        </Col>
        <Col lg="4" md="6" xs="12">
          <CardTransactions comments={comments} />
        </Col>
      </Row>
    </div>
  );
};

export default EcommerceDashboard;
