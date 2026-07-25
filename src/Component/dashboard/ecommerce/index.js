import { useContext, useEffect, useState } from "react";
import { Row, Col } from "reactstrap";

import { ThemeColors } from "@src/utility/context/ThemeColors";

// Components
import CardMedal from "@src/views/ui-elements/cards/advance/CardMedal";
import StatsCard from "@src/views/ui-elements/cards/statistics/StatsCard";
import CardTransactions from "@src/views/ui-elements/cards/advance/CardTransactions";

import SupportTracker from "@src/views/ui-elements/cards/analytics/SupportTracker";
import SupportTracker2 from "@src/views/ui-elements/cards/analytics/SupportTracker2";

import CardBrowserStates from "@src/views/ui-elements/cards/advance/CardBrowserState";

import CompanyTable from "./CompanyTable";

import "@styles/react/libs/charts/apex-charts.scss";
import "@styles/base/pages/dashboard-ecommerce.scss";

import {
  getMyCourses,
  getMyCoursesComments,
  getMyFavoriteCourses,
  getMyFavoriteNews,
  getUserProfileInfo,
} from "../../../core/Interceptor/Services/DashboardServices/get";
import { getAllUsers } from "../../../core/Interceptor/Services/UserServices/get";

const EcommerceDashboard = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [favoriteNews, setFavoriteNews] = useState([]);
  const [comments, setComments] = useState([]);
  const [profile, setProfile] = useState(null);

  const [counts, setCounts] = useState([]);

  const paramValues = [{}, { roleId: 1 }, { roleId: 2 }, { roleId: 3 }];

  const fetchData = async () => {
    try {
      const [
        profileRes,
        coursesRes,
        favoriteCourseRes,
        favoriteNewsRes,
        commentsRes,
      ] = await Promise.all([
        getUserProfileInfo(),
        getMyCourses(),
        getMyFavoriteCourses(),
        getMyFavoriteNews(),
        getMyCoursesComments(),
      ]);

      const userResponses = await Promise.all(
        paramValues.map((params) => getAllUsers(params)),
      );
      console.log("User Responses:", userResponses);

      setCounts(userResponses.map((res) => res.data.totalCount));

      setProfile(profileRes?.data || null);
      setMyCourses(coursesRes?.data?.listOfMyCourses || []);
      setFavoriteCourses(favoriteCourseRes?.data?.favoriteCourseDto || []);
      setFavoriteNews(favoriteNewsRes?.data?.myFavoriteNews || []);
      setComments(commentsRes?.data?.myCommentsDtos || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { colors } = useContext(ThemeColors);

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
            favoriteCourses={favoriteCourses}
            favoriteNews={favoriteNews}
            cols={{
              xl: "3",
              sm: "6",
            }}
          />
        </Col>
      </Row>

      <Row className="match-height">
        <Col lg="6" md="12">
          <SupportTracker
            primary={colors.primary.main}
            danger={colors.danger.main}
            myCourses={myCourses}
          />
        </Col>

        <Col lg="6" md="12">
          <SupportTracker2
            primary={colors.primary.main}
            danger={colors.danger.main}
            counts={counts}
          />
        </Col>
      </Row>

      <Row className="match-height">
        <Col lg="6" md="12">
          <CardBrowserStates
            colors={colors}
            trackBgColor={trackBgColor}
            counts={counts}
          />
        </Col>

        <Col lg="6" md="12">
          <CardTransactions comments={comments.slice(0, 4)} />
        </Col>
      </Row>

      {/* <Row className="match-height">
        <Col lg="12">
          <CompanyTable courses={myCourses} />
        </Col>
      </Row> */}
    </div>
  );
};

export default EcommerceDashboard;
