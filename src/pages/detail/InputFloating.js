import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Row,
  Col,
  Button,
} from "reactstrap";
import { getcoursebyidAdminTeacherCall } from "../../core/Interceptor/Courses/getcoursebyidAdminTeacherCall";
import { useEffect } from "react";
import UserInfoCard from "../wizard/UserInfoCard";
const InputFloating = () => {
  const run = async () => {
    const res = await getcoursebyidAdminTeacherCall("c15");
    console.log("respond hey", res);
  };
  useEffect(() => {
    run();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h2">پیدا کردن کورس موجود</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col md="6" sm="12">
            <div className="input-group">
              <Input
                type="text"
                placeholder="ای دی را وارد کنید"
                className="form-control"
              />
              <Button color="primary" className="px-4">
                ارسال
              </Button>
            </div>
          </Col>
        </Row>
      </CardBody>
      <UserInfoCard />
    </Card>
  );
};

export default InputFloating;
