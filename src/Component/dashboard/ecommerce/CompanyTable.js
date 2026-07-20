import { Table, Card, CardHeader, CardTitle } from "reactstrap";

const formatPersianDate = (date) => {
  if (!date) return "-";

  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
};

const CompanyTable = ({ courses = [] }) => {
  return (
    <Card className="card-company-table">
      <CardHeader>
        <CardTitle tag="h4">آخرین دوره‌های من</CardTitle>
      </CardHeader>

      <Table responsive>
        <thead>
          <tr>
            <th>دوره</th>
            <th>وضعیت</th>
            <th>قیمت</th>
            <th>تاریخ ثبت</th>
          </tr>
        </thead>

        <tbody>
          {courses.length ? (
            courses.slice(0, 5).map((course) => (
              <tr key={course.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img
                      src={
                        course.tumbImageAddress ||
                        course.course?.tumbImageAddress ||
                        course.course?.imageAddress
                      }
                      alt={
                        course.courseTitle || course.course?.title || "course"
                      }
                      width={45}
                      height={45}
                      className="me-1"
                      style={{
                        borderRadius: 10,
                        objectFit: "cover",
                      }}
                    />

                    <div>
                      <div className="fw-bolder">
                        {course.courseTitle ||
                          course.course?.title ||
                          "بدون عنوان"}
                      </div>

                      <small className="text-muted">
                        {course.desc || "بدون توضیح"}
                      </small>
                    </div>
                  </div>
                </td>

                <td>
                  <span
                    className={
                      course.paymentStatus === "پرداخت شده"
                        ? "text-success"
                        : "text-warning"
                    }
                  >
                    {course.paymentStatus || "نامشخص"}
                  </span>
                </td>

                <td>
                  {course.cost
                    ? `${course.cost.toLocaleString("fa-IR")} تومان`
                    : "-"}
                </td>

                <td>{formatPersianDate(course.lastUpdate)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                دوره‌ای وجود ندارد
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );
};

export default CompanyTable;
