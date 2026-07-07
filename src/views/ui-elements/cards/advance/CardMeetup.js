import Avatar from "@components/avatar";
import AvatarGroup from "@components/avatar-group";

import { Calendar, MapPin } from "react-feather";
import { Card, CardTitle, CardBody, CardText } from "reactstrap";

import illustration from "@src/assets/images/illustration/email.svg";

const CardMeetup = ({ jobHistory = [] }) => {
  const firstJob = jobHistory?.[0];

  return (
    <Card className="card-developer-meetup">

      <div className="meetup-img-wrapper rounded-top text-center">
        <img src={illustration} height="170" alt="illustration" />
      </div>

      <CardBody>

        <div className="meetup-header d-flex align-items-center">

          <div className="meetup-day">
            <h6 className="mb-0">امروز</h6>
            <h3 className="mb-0">
              {new Date().getDate()}
            </h3>
          </div>

          <div className="my-auto">
            <CardTitle tag="h4" className="mb-25">
              {firstJob?.title || "رویداد توسعه‌دهندگان"}
            </CardTitle>

            <CardText className="mb-0">
              {firstJob?.description || "لیست فعالیت‌ها و رویدادهای کاری"}
            </CardText>
          </div>

        </div>

        <div className="d-flex">
          <Avatar
            color="light-primary"
            className="rounded me-1"
            icon={<Calendar size={18} />}
          />

          <div>
            <h6 className="mb-0">
              {firstJob?.date || "تاریخ ثبت نشده"}
            </h6>
            <small>{firstJob?.time || "زمان مشخص نشده"}</small>
          </div>
        </div>

        <div className="d-flex mt-2">
          <Avatar
            color="light-primary"
            className="rounded me-1"
            icon={<MapPin size={18} />}
          />

          <div>
            <h6 className="mb-0">
              {firstJob?.location || "موقعیت نامشخص"}
            </h6>
            <small>
              {firstJob?.city || "شهر ثبت نشده"}
            </small>
          </div>
        </div>

      </CardBody>
    </Card>
  );
};

export default CardMeetup;