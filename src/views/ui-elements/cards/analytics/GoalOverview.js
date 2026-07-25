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

const GoalOverview = ({ success, title = "درصد پرداختی", value = 0 }) => {
  const progress = value;

  const options = {
    chart: {
      sparkline: {
        enabled: true,
      },
    },

    colors: [success],

    plotOptions: {
      radialBar: {
        startAngle: -150,
        endAngle: 150,

        hollow: {
          size: "77%",
        },

        track: {
          background: "#ebe9f1",
          strokeWidth: "50%",
        },

        dataLabels: {
          name: {
            show: false,
          },

          value: {
            color: "#5e5873",
            fontSize: "2rem",
            fontWeight: "600",

            formatter: () => `${progress}%`,
          },
        },
      },
    },

    stroke: {
      lineCap: "round",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">{title}</CardTitle>

        <HelpCircle size={18} className="text-muted cursor-pointer" />
      </CardHeader>

      <CardBody className="p-0">
        <Chart
          options={options}
          series={[progress]}
          type="radialBar"
          height={245}
        />
      </CardBody>

      <Row className="border-top text-center mx-0">
        <Col xs="12" className="py-1">
          <CardText className="text-muted mb-0">میزان پرداخت شده</CardText>

          <h3 className="fw-bolder mb-0">{progress}%</h3>
        </Col>
      </Row>
    </Card>
  );
};

export default GoalOverview;
