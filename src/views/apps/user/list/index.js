// ** User List Component
import Table from "./Table";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../../core/Interceptor/Services/UserServices/get";

import CountUp from 'react-countup';

const UsersList = () => {
  const [counts, setCounts] = useState([]);
  const [renderCount, setRenderCount] = useState(0);
  const paramValues = [
    {},
    {
      isActiveUser: true,
    },
    {
      roleId: 2,
    },
    {
      roleId: 3,
    },
  ];
  const fetchGetAllUser = async () => {
    try {
      const requests = paramValues.map((vals) => getAllUsers(vals));
      const responses = await Promise.all(requests);
      setCounts(responses.map((r) => (JSON.stringify(r.data.totalCount))));
      // console.log(response.data.listUser);
    } catch (error) {
      console.error("userList error:", error);
    }
  };
  useEffect(() => {
    const timeoutForUsers = setTimeout(() => {
      fetchGetAllUser();
    }, 100);
    return () => clearTimeout(timeoutForUsers);
  }, [renderCount]);

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="کل کاربر ها"
            icon={<User size={20} />}
            renderStats={
            <h3 className="fw-bolder mb-75">
              <CountUp end={counts[0]} duration={2} />
            </h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="کاربر های فعال"
            icon={<User size={20} />}
            renderStats={
            <h3 className="fw-bolder mb-75">
              <CountUp end={counts[1]} duration={2} />
            </h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="اساتید"
            icon={<User size={20} />}
            renderStats={
            <h3 className="fw-bolder mb-75">
              <CountUp end={counts[2]} duration={2} />
            </h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="دانشجویان"
            icon={<User size={20} />}
            renderStats={
            <h3 className="fw-bolder mb-75">
              <CountUp end={counts[3]} duration={2} />
            </h3>}
          />
        </Col>
      </Row>
      <Table renderCount={renderCount} setRenderCount={setRenderCount} />
    </div>
  );
};

export default UsersList;
