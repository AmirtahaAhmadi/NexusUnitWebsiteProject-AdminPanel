// ** User List Component
import Table from "./Table";

// ** React Imports
import { useEffect, useState } from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Custom Components
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";

// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from "react-feather";

// ** API
import { GetAllTechnologyCall } from "../../../core/Interceptor/Courses/GetAllTechnologyCall";
import { GetStatusCall } from "../../../core/Interceptor/Courses/GetStatusCall";
import { GetCourselevelcall } from "../../../core/Interceptor/Courses/GetCourselevelcall";

// ** Styles
import "@styles/react/apps/app-users.scss";

const UsersList = () => {
  const [technologies, setTechnologies] = useState([]);
  const getTechnologies = async () => {
    const res = await GetAllTechnologyCall();
    if (res?.data) {
      setTechnologies(res.data);
      console.log("res", res.data);
    }
  };
  useEffect(() => {
    getTechnologies();
  }, []);

  return (
    <div className="app-user-list">
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Total Users"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">21,459</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Paid Users"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active Users"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending Users"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">237</h3>}
          />
        </Col>
      </Row>

      <Table technologies={technologies} />
    </div>
  );
};

export default UsersList;
