import Chart from "react-apexcharts";
import { Card, CardTitle, Row, Col, Button } from "reactstrap";

const RevenueReport = ({ primary, warning, courseUsers = [] }) => {
  console.log("courseUsers:", courseUsers);

  const totalUsers = courseUsers.length;

  const revenueOptions = {
    chart: {
      stacked: true,
      type: "bar",
      toolbar: { show: false },
    },
    grid: {
      padding: { top: -20, bottom: -10 },
      yaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: ["دوره 1", "دوره 2", "دوره 3", "دوره 4", "دوره 5"],
      labels: {
        style: { colors: "#b9b9c3", fontSize: "0.86rem" },
      },
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    colors: [primary, warning],
    plotOptions: {
      bar: {
        columnWidth: "17%",
        borderRadius: [4],
      },
    },
  };

  const revenueSeries = [
    {
      name: "کاربران",
      data: courseUsers.slice(0, 5).map((u) => (u.userId ? 1 : 1)),
    },
    {
      name: "ثابت",
      data: [2, 1, 3, 2, 1],
    },
  ];

  const budgetSeries = [
    {
      data: [
        totalUsers,
        totalUsers - 1,
        totalUsers + 2,
        totalUsers,
        totalUsers - 2,
      ],
    },
    {
      data: [1, 2, 1, 0, 1],
    },
  ];

  const budgetOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      type: "line",
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      dashArray: [0, 5],
      width: [2],
    },
    colors: [primary, "#dcdae3"],
    tooltip: { enabled: false },
  };

  return (
    <Card className="card-revenue-budget">
      <Row className="mx-0">
        <Col md="8" xs="12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <CardTitle className="mb-0">گزارش درآمد</CardTitle>
            <div>
              <span className="me-2">کاربران: {totalUsers}</span>
            </div>
          </div>

          <Chart
            type="bar"
            height={230}
            options={revenueOptions}
            series={revenueSeries}
          />
        </Col>

        <Col md="4" xs="12">
          <h2 className="mb-25">{totalUsers}</h2>

          <div className="d-flex justify-content-center">
            <span className="fw-bolder me-25">کل کاربران:</span>
            <span>{totalUsers}</span>
          </div>

          <Chart
            type="line"
            height={80}
            options={budgetOptions}
            series={budgetSeries}
          />

          <Button color="primary">افزایش</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default RevenueReport;
