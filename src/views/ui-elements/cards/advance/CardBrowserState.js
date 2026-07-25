import { useMemo } from "react";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  Badge,
} from "reactstrap";

import { Users, Shield, BookOpen, User } from "react-feather";

const CardBrowserState = ({ counts = [] }) => {
  const totalUsers = counts[0] ?? 0;
  const admins = counts[1] ?? 0;
  const teachers = counts[2] ?? 0;
  const students = counts[3] ?? 0;

  const statesArr = useMemo(
    () => [
      {
        title: "کل کاربران",
        value: totalUsers,
        color: "primary",
        icon: <Users size={18} />,
      },
      {
        title: "مدیران",
        value: admins,
        color: "danger",
        icon: <Shield size={18} />,
      },
      {
        title: "اساتید",
        value: teachers,
        color: "warning",
        icon: <BookOpen size={18} />,
      },
      {
        title: "دانشجویان",
        value: students,
        color: "success",
        icon: <User size={18} />,
      },
    ],
    [totalUsers, admins, teachers, students],
  );

  return (
    <Card className="card-browser-states shadow-sm border-0">
      <CardHeader className="border-bottom">
        <div>
          <CardTitle tag="h4" className="mb-25">
            آمار کاربران
          </CardTitle>

          <CardText className="text-muted mb-0">وضعیت کاربران سیستم</CardText>
        </div>
      </CardHeader>

      <CardBody className="pt-2">
        {statesArr.map((item) => (
          <div
            key={item.title}
            className="d-flex justify-content-between align-items-center py-1"
          >
            <div className="d-flex align-items-center">
              <div
                className={`avatar bg-light-${item.color} me-1`}
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {item.icon}
              </div>

              <div>
                <h6 className="mb-0">{item.title}</h6>
                <small className="text-muted">تعداد {item.title}</small>
              </div>
            </div>

            <Badge
              color={item.color}
              pill
              style={{
                minWidth: 55,
                fontSize: "15px",
                padding: "8px 12px",
              }}
            >
              {item.value}
            </Badge>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default CardBrowserState;
