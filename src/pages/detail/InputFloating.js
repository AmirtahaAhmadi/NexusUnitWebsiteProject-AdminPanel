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
import { useEffect, useState } from "react";
import UserInfoCard from "../wizard/UserInfoCard";
const InputFloating = () => {
  const [loading, setloading] = useState(false);
  const [loaded, setloaded] = useState(false);
  const [showpro, getshowpro] = useState(false);
  const [valueToSend, setvalueToSend] = useState("");
  const [getcourse, setgetcourse] = useState([]);
  const run = async () => {
    setloading(true);
    const res = await getcoursebyidAdminTeacherCall(valueToSend);
    console.log("respond hey", res);
    if (res) {
      setgetcourse(res);
      setloaded(true);
      getshowpro(true);
    } else if (!res) {
      setloaded(true);
      setgetcourse(false);
      getshowpro(false);
    }
    setloading(false);
  };

  const clickhander = () => {
    run();
  };
  // useEffect(() => {
  //   console.log("valuesd", valueToSend);
  // }, [valueToSend]);

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h2">پیدا کردن دوره موجود</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="6" sm="12">
            <div className="input-group ">
              <Input
                type="text"
                placeholder="ای دی را وارد کنید"
                className="form-control"
                onChange={(e) => {
                  setvalueToSend(e.target.value);
                }}
                value={valueToSend}
              />
              <Button
                onClick={() => clickhander()}
                color="primary"
                className="px-4">
                ارسال
              </Button>
            </div>
          </Col>
        </Row>
      </CardBody>
      {loading && <div className="t-p-5">در حال جست و جو</div>}
      {!loading && getcourse && showpro > 0 && (
        <UserInfoCard getcourse={getcourse} />
      )}

      {!loading && loaded && !getcourse && (
        <div className=" t-p-5 ">موردی یافت نشد</div>
      )}
    </Card>
  );
};

export default InputFloating;
