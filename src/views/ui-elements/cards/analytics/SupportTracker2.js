import React from "react";
import Chart from "react-apexcharts";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
} from "reactstrap";

const SupportTracker2 = ({ primary, danger, counts = [] }) => {
  const [totalUsers = 0, activeUsers = 0, teachers = 0, students = 0] = counts;

  const progress =
    totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;

  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      radialBar: {
        size: 150,
        offsetY: 20,
        startAngle: -150,
        endAngle: 150,
        hollow: {
          size: "65%",
        },
        track: {
          background: "#fff",
          strokeWidth: "100%",
        },
        dataLabels: {
          name: {
            offsetY: -5,
            fontFamily: "Montserrat",
            fontSize: "1rem",
          },
          value: {
            offsetY: 15,
            fontFamily: "Montserrat",
            fontSize: "1.714rem",
            formatter: (val) => `${Math.round(val)}%`,
          },
        },
      },
    },
    colors: [danger],
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: [primary],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      dashArray: 8,
    },
    labels: ["کاربران فعال"],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">اطلاعات کاربران</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col sm="3" className="text-center">
            <h1 className="font-large-2 fw-bolder">{totalUsers}</h1>
            <CardText>کل کاربران</CardText>
          </Col>

          <Col sm="9" className="d-flex justify-content-center">
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
            <CardText className="mb-50">کاربران فعال</CardText>
            <span className="font-large-1 fw-bold">{activeUsers}</span>
          </div>

          <div className="text-center">
            <CardText className="mb-50">اساتید</CardText>
            <span className="font-large-1 fw-bold">{teachers}</span>
          </div>

          <div className="text-center">
            <CardText className="mb-50">دانشجویان</CardText>
            <span className="font-large-1 fw-bold">{students}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default SupportTracker2;