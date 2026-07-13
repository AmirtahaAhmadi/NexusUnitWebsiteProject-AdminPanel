// ** User List Component
import Table from "./Table";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { Send, Check, X, Bookmark } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useEffect, useState } from "react";
import { getNewsComments } from "../../../../core/Interceptor/Services/CommentServices/get";
import { getCourseComments } from "../../../../core/Interceptor/Services/UserServices/get";

import CountUp from 'react-countup';

const UsersList = () => {
  const [counts, setCounts] = useState([]);
  const [renderCount, setRenderCount] = useState(0);
  const [newsComments, setNewsComments] = useState([]);
  const fetchGetNewsComments = async () => {
    try {
      const response = await getNewsComments();
      setNewsComments(response.data)
      console.log(response.data)
    } catch (error) {
      console.error("newsComments error:", error);
    }
  };
  const paramValues = [
    {},
    {
      accept: true,
    },
    {
      accept: false,
    },
  ];
  const fetchGetCourseComments = async () => {
    try {
      const requests = paramValues.map((vals) => getCourseComments(vals));
      const responses = await Promise.all(requests);
      setCounts(responses.map((r) => (JSON.stringify(r.data.comments.length))));
      console.log(responses);
    } catch (error) {
      console.error("courseComments error:", error);
    }
  };
  useEffect(() => {
    const timeoutForUsers = setTimeout(() => {
      fetchGetNewsComments();
      fetchGetCourseComments();
    }, 100);
    return () => clearTimeout(timeoutForUsers);
  }, [renderCount]);

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="کل کامنت ها"
            icon={<Send size={20} />}
            renderStats={
            <h3 className="fw-bolder mb-75">
              <CountUp end={Number(newsComments.length) + Number(counts[0])} duration={2} />
            </h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="کامنت های اخبار"
            icon={<Bookmark size={20} />}
            renderStats={
            <h3 className="fw-bolder mb-75">
              <CountUp end={newsComments.length} duration={2} />
            </h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="کامنت های دوره که تایید شده"
            icon={<Check size={20} />}
            renderStats={
            <h3 className="fw-bolder mb-75">
              <CountUp end={counts[1]} duration={2} />
            </h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="کامنت های دوره که تایید نشده"
            icon={<X size={20} />}
            renderStats={
            <h3 className="fw-bolder mb-75">
              <CountUp end={counts[2]} duration={2} />
            </h3>}
          />
        </Col>
      </Row>
      <Table renderCount={renderCount} setRenderCount={setRenderCount} newsComments={newsComments} />
    </div>
  );
};

export default UsersList;
