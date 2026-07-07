import { useMemo } from "react";
import Chart from "react-apexcharts";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { MoreVertical, Star, BookOpen } from "react-feather";

const CardBrowserState = ({
  colors,
  trackBgColor,
  favoriteCourses = [],
  favoriteNews = [],
}) => {
  const statesArr = useMemo(() => {
    const coursesPercent = favoriteCourses.length
      ? Math.min(favoriteCourses.length * 10, 100)
      : 0;

    const newsPercent = favoriteNews.length
      ? Math.min(favoriteNews.length * 10, 100)
      : 0;

    return [
      {
        title: "دوره‌های مورد علاقه",
        value: `${coursesPercent}%`,
        icon: <BookOpen size={18} />,
        chart: {
          type: "radialBar",
          series: [coursesPercent],
          height: 30,
          width: 30,
          options: {
            colors: [colors.primary.main],
            plotOptions: {
              radialBar: {
                hollow: { size: "22%" },
                track: { background: trackBgColor },
                dataLabels: { show: false },
              },
            },
          },
        },
      },
      {
        title: "اخبار مورد علاقه",
        value: `${newsPercent}%`,
        icon: <Star size={18} />,
        chart: {
          type: "radialBar",
          series: [newsPercent],
          height: 30,
          width: 30,
          options: {
            colors: [colors.warning.main],
            plotOptions: {
              radialBar: {
                hollow: { size: "22%" },
                track: { background: trackBgColor },
                dataLabels: { show: false },
              },
            },
          },
        },
      },
    ];
  }, [favoriteCourses, favoriteNews, colors, trackBgColor]);

  return (
    <Card className="card-browser-states">
      <CardHeader>
        <div>
          <CardTitle tag="h4">آمار علاقه‌مندی‌ها</CardTitle>
          <CardText className="font-small-2">بر اساس فعالیت کاربر</CardText>
        </div>

        <UncontrolledDropdown>
          <DropdownToggle
            color=""
            className="bg-transparent btn-sm border-0 p-50"
          >
            <MoreVertical size={18} />
          </DropdownToggle>

          <DropdownMenu end>
            <DropdownItem>هفته اخیر</DropdownItem>
            <DropdownItem>ماه اخیر</DropdownItem>
            <DropdownItem>سال اخیر</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </CardHeader>

      <CardBody>
        {statesArr.map((state) => (
          <div
            key={state.title}
            className="d-flex justify-content-between align-items-center mb-2"
          >
            <div className="d-flex align-items-center">
              <span className="me-1">{state.icon}</span>
              <span>{state.title}</span>
            </div>

            <div className="d-flex align-items-center">
              <strong className="me-1">{state.value}</strong>

              <Chart
                options={state.chart.options}
                series={state.chart.series}
                type="radialBar"
                height={30}
                width={30}
              />
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default CardBrowserState;
