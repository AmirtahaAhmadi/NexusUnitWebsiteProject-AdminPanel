// ** Third Party Components
import classnames from "classnames";
import CountUp from "react-countup";
import { BookOpen, Bookmark, Heart, FileText } from "react-feather";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
} from "reactstrap";

const StatsCard = ({
  cols = { xl: "3", sm: "6" },
  myCourses = [],
  myReserve = [],
  favoriteCourses = [],
  favoriteNews = [],
}) => {
  const data = [
    {
      title: myCourses.length,
      subtitle: "دوره‌های من",
      color: "light-primary",
      icon: <BookOpen size={24} />,
    },
    {
      title: myReserve.length,
      subtitle: "رزروهای من",
      color: "light-info",
      icon: <Bookmark size={24} />,
    },
    {
      title: favoriteCourses.length,
      subtitle: "علاقه‌مندی دوره‌ها",
      color: "light-danger",
      icon: <Heart size={24} />,
    },
    {
      title: favoriteNews.length,
      subtitle: "علاقه‌مندی اخبار",
      color: "light-success",
      icon: <FileText size={24} />,
    },
  ];

  const renderData = () =>
    data.map((item, index) => {
      const colMargin = Object.keys(cols);
      const margin = index === 2 ? "sm" : colMargin[0];

      return (
        <Col
          key={item.subtitle}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1,
          })}
        >
          <div className="d-flex align-items-center">
            <Avatar color={item.color} icon={item.icon} className="me-2" />

            <div className="my-auto">
              <h4 className="fw-bolder mb-0">
                <CountUp
                  key={item.title}
                  start={0}
                  end={item.title}
                  duration={2}
                  delay={0.2}
                  separator=","
                  useEasing
                  enableScrollSpy
                  scrollSpyOnce
                />
              </h4>

              <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      );
    });

  return (
    <Card className="card-statistics">
      <CardHeader>
        <div>
          <CardTitle tag="h4">آمار کلی</CardTitle>
          <CardText className="card-text font-small-2 mb-0">
            اطلاعات حساب کاربری شما
          </CardText>
        </div>
      </CardHeader>

      <CardBody className="statistics-body">
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
