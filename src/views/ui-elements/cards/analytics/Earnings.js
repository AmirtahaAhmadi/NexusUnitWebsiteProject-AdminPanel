// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Card, CardTitle, CardText, CardBody, Row, Col } from "reactstrap";

const Earnings = ({ success, myCourses = [], myReserve = [] }) => {
  console.log("myCourses:", myCourses);
  console.log("myReserve:", myReserve);
  console.log("نمونه یک دوره:", myCourses[0]);

  console.log(
    "پرداخت شده‌ها:",
    myCourses?.filter((i) => i.paymentStatus === "پرداخت شده"),
  );

  console.log(
    "کل درآمد:",
    myCourses
      ?.filter((i) => i.paymentStatus === "پرداخت شده")
      .reduce((sum, i) => sum + (i.cost || 0), 0),
  );

  console.log("تعداد کل دوره‌ها:", myCourses?.length);
  console.log("تعداد رزروها:", myReserve?.length);
  const paidCourses = myCourses.filter(
    (item) => item.paymentStatus === "پرداخت شده",
  );

  const totalEarnings = paidCourses.reduce(
    (sum, item) => sum + (item.cost || 0),
    0,
  );

  const paidCount = paidCourses.length;
  const reserveCount = myReserve.length;
  const pendingCount = myCourses.length - paidCount;

  const options = {
    dataLabels: {
      enabled: false,
    },

    legend: { show: false },

    labels: ["پرداخت شده", "در انتظار", "رزرو"],
    stroke: { width: 0 },

    colors: ["#28c76f66", "#ff9f43", success || "#7367F0"],

    grid: {
      padding: {
        right: -20,
        bottom: -8,
        left: -20,
      },
    },

    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,

            value: {
              formatter: (val) => `${parseInt(val)} عدد`,
            },

            total: {
              show: true,
              label: "کل دوره‌ها",
              formatter: () => paidCount + pendingCount + reserveCount,
            },
          },
        },
      },
    },
  };

  return (
    <Card className="earnings-card" dir="rtl">
      <CardBody>
        <Row>
          <Col xs="6">
            <CardTitle className="mb-1">درآمد</CardTitle>

            <div className="font-small-2">کل دوره‌ها</div>

            <h5 className="mb-1">{totalEarnings.toLocaleString()} تومان</h5>

            <CardText className="text-muted font-small-2">
              <span className="fw-bolder">{paidCount}</span>
              <span> دوره پرداخت شده</span>
            </CardText>
          </Col>

          <Col xs="6">
            <Chart
              options={options}
              series={[paidCount, pendingCount, reserveCount]}
              type="donut"
              height={120}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default Earnings;
