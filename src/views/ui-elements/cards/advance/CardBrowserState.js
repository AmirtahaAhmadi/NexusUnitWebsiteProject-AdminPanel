import { useMemo } from "react";
import { Card, CardBody, CardText, CardTitle, CardHeader } from "reactstrap";

import { Users, UserCheck, UserX } from "react-feather";

const CardBrowserState = ({ courseUsers = [] }) => {
  const totalUsers = courseUsers.length;

  const activeUsers = courseUsers.filter(
    (user) => user.currentPictureAddress,
  ).length;

  const incompleteUsers = totalUsers - activeUsers;

  const statesArr = useMemo(
    () => [
      {
        title: "کل کاربران",
        value: `${totalUsers} نفر`,
        icon: <Users size={18} />,
      },

      {
        title: "پروفایل تکمیل شده",
        value: `${activeUsers} نفر`,
        icon: <UserCheck size={18} />,
      },

      {
        title: "پروفایل ناقص",
        value: `${incompleteUsers} نفر`,
        icon: <UserX size={18} />,
      },
    ],
    [totalUsers, activeUsers, incompleteUsers],
  );

  return (
    <Card className="card-browser-states">
      <CardHeader>
        <div>
          <CardTitle tag="h4">آمار کاربران</CardTitle>

          <CardText className="font-small-2">وضعیت کاربران سیستم</CardText>
        </div>
      </CardHeader>

      <CardBody>
        {statesArr.map((item) => (
          <div
            key={item.title}
            className="
              d-flex
              justify-content-between
              align-items-center
              mb-2"
          >
            <div className="d-flex align-items-center">
              <span className="me-1">{item.icon}</span>

              <span>{item.title}</span>
            </div>

            <strong>{item.value}</strong>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default CardBrowserState;
