import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table as ReactstrapTable,
} from "reactstrap";
import Addnewtechs from "../../CourseSetting/Addnewtech";
const Table = ({ technologies = [] }) => {
  return (
    <Card className="mt-2">
      <CardHeader>
        <CardTitle tag="h4">لیست تکنولوژی‌ها</CardTitle>
      </CardHeader>

      <CardBody>
        {technologies.length > 0 ? (
          <div className="table-responsive">
            <ReactstrapTable bordered hover>
              <thead>
                <tr>
                  <th>ردیف</th>
                  <th>نام تکنولوژی</th>
                </tr>
              </thead>
              <tbody>
                {technologies.map((item, index) => (
                  <tr key={item.id || index}>
                    <td>{index + 1}</td>
                    <td>{item.techName || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </ReactstrapTable>
          </div>
        ) : (
          <p className="mb-0">تکنولوژی‌ای یافت نشد</p>
        )}
      </CardBody>
      <Addnewtechs />
    </Card>
  );
};

export default Table;
