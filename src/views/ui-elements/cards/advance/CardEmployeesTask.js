// ** React Imports
import { useMemo } from "react";

// ** Third Party Components
import Chart from "react-apexcharts";
import { Users } from "react-feather";

// ** Reactstrap Imports
import { Card, CardBody, CardText, CardTitle, CardHeader } from "reactstrap";

const CardEmployeesTasks = ({ colors, trackBgColor, courseUsers = [] }) => {
  const usersCount = Array.isArray(courseUsers) ? courseUsers.length : 0;

  const usersPercent = useMemo(() => {
    if (!usersCount) return 0;

    return Math.min(usersCount * 10, 100);
  }, [usersCount]);

  return (
    <Card className="card-browser-states">
      <CardHeader>
        <div>
          <CardTitle tag="h4">آمار کاربران</CardTitle>

          <CardText className="font-small-2">
            تعداد کاربران ثبت نام شده
          </CardText>
        </div>
      </CardHeader>

      <CardBody>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <span className="me-1">
              <Users size={18} />
            </span>

            <span>کاربران دوره‌ها</span>
          </div>

          <div className="d-flex align-items-center">
            <strong className="me-1">{usersCount}</strong>

            <Chart
              options={{
                colors: [colors?.primary?.main || "#7367F0"],

                plotOptions: {
                  radialBar: {
                    hollow: {
                      size: "22%",
                    },

                    track: {
                      background: trackBgColor,
                    },

                    dataLabels: {
                      show: false,
                    },
                  },
                },

                stroke: {
                  lineCap: "round",
                },
              }}
              series={[usersPercent]}
              type="radialBar"
              height={35}
              width={35}
            />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardEmployeesTasks;
