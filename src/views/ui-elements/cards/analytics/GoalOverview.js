import Chart from "react-apexcharts";
import { HelpCircle } from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";

const GoalOverview = ({ success, profile }) => {
  if (!profile) return null;

  const completed = profile?.completedCourses || 0;
  const inProgress = profile?.inProgressCourses || 0;

  const total = completed + inProgress || 1;
  const progress = Math.round((completed / total) * 100);

  const options = {
    chart: {
      sparkline: { enabled: true },
      dropShadow: {
        enabled: true,
        blur: 3,
        left: 1,
        top: 1,
        opacity: 0.1,
      },
    },
    colors: [success],
    plotOptions: {
      radialBar: {
        offsetY: 10,
        startAngle: -150,
        endAngle: 150,
        hollow: { size: "77%" },
        track: {
          background: "#ebe9f1",
          strokeWidth: "50%",
        },
        dataLabels: {
          name: { show: false },
          value: {
            color: "#5e5873",
            fontSize: "2rem",
            fontWeight: "600",
            formatter: () => `${progress}%`,
          },
        },
      },
    },
    stroke: { lineCap: "round" },
  };

  const series = [progress];

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">نمای کلی اهداف</CardTitle>
        <HelpCircle size={18} className="text-muted cursor-pointer" />
      </CardHeader>

      <CardBody className="p-0">
        <Chart
          options={options}
          series={series}
          type="radialBar"
          height={245}
        />
      </CardBody>

      <Row className="border-top text-center mx-0">
        <Col xs="6" className="border-end py-1">
          <CardText className="text-muted mb-0">تکمیل شده</CardText>
          <h3 className="fw-bolder mb-0">{completed}</h3>
        </Col>

        <Col xs="6" className="py-1">
          <CardText className="text-muted mb-0">در حال انجام</CardText>
          <h3 className="fw-bolder mb-0">{inProgress}</h3>
        </Col>
      </Row>
    </Card>
  );
};

export default GoalOverview;
