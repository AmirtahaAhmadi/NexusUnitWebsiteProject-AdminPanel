// ** Custom Components
import Avatar from "@components/avatar";

// ** Reactstrap Imports
import { Table, Card } from "reactstrap";

const CompanyTable = ({ courses = [] }) => {
  const renderData = () => {
    return courses.map((course) => {
      return (
        <tr key={course.courseId}>
          <td>
            <div className="d-flex align-items-center">
              <div className="avatar me-1">
                <img
                  src={course.img}
                  alt={course.title}
                  style={{ width: 38, height: 38, borderRadius: 8 }}
                />
              </div>

              <div>
                <div className="fw-bolder">{course.title}</div>
                <div className="text-muted font-small-2">
                  {course.levelName || "سطح نامشخص"}
                </div>
              </div>
            </div>
          </td>

          <td>{course.statusName || "فعال"}</td>

          <td className="text-nowrap">{course.currentRate ?? 0} امتیاز</td>

          <td>{course.price?.toLocaleString() || 0} تومان</td>

          <td>{course.registeredUsersCount ?? 0} نفر</td>
        </tr>
      );
    });
  };

  return (
    <Card className="card-company-table">
      <Table responsive>
        <thead>
          <tr>
            <th>دوره</th>
            <th>وضعیت</th>
            <th>امتیاز</th>
            <th>قیمت</th>
            <th>دانشجو</th>
          </tr>
        </thead>

        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted py-4">
                داده‌ای برای نمایش وجود ندارد
              </td>
            </tr>
          ) : (
            renderData()
          )}
        </tbody>
      </Table>
    </Card>
  );
};

export default CompanyTable;
