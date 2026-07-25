// ** React Imports
import React from "react";

// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader
} from "reactstrap";

const SupportTracker = ({
  primary,
  danger,
  myCourses = [],
  myReserve = []
}) => {

  const totalCourses = myCourses.length;

  const reserveCount = myReserve.length;

  const completedCourses = totalCourses;

  const progress =
    totalCourses === 0
      ? 0
      : Math.round((completedCourses / totalCourses) * 100);

  const options = {
    plotOptions: {
      radialBar: {
        size: 150,
        offsetY: 20,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: "65%"
        },
        track: {
          background: "#fff",
          strokeWidth: "100%"
        },
        dataLabels: {
          name: {
            fontSize: "14px"
          },
          value: {
            fontSize: "28px",
            formatter: val => `${val}%`
          }
        }
      }
    },

    colors: [danger],

    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: [primary],
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },

    stroke: {
      dashArray: 8
    },

    labels: ["پیشرفت"]
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">
          اطلاعات دوره‌ها
        </CardTitle>
      </CardHeader>

      <CardBody>

        <Row>

          <Col sm="3" className="text-center">
            <h1 className="fw-bolder">{totalCourses}</h1>
            <CardText>کل دوره‌ها</CardText>
          </Col>

          <Col sm="9">
            <Chart
              options={options}
              series={[progress]}
              type="radialBar"
              height={270}
            />
          </Col>

        </Row>

        <div className="d-flex justify-content-between mt-2">

          <div className="text-center">
            <CardText>دوره‌های من</CardText>
            <h3>{totalCourses}</h3>
          </div>

          <div className="text-center">
            <CardText>رزروها</CardText>
            <h3>{reserveCount}</h3>
          </div>

          <div className="text-center">
            <CardText>پیشرفت</CardText>
            <h3>{progress}%</h3>
          </div>

        </div>

      </CardBody>
    </Card>
  );
};

export default SupportTracker;