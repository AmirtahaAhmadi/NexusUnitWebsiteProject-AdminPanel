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
import { GetSessionByIDcall } from "../../core/Interceptor/Courses/GetSessionByIDcall";
import SessionDetailWithID from "./SessionDetailWithID";
import { GetSessionHomeWorksCall } from "../../core/Interceptor/Courses/GetSessionHomeWorkscall";
import { useRefresh } from "../../redux/zustan/refreshCourselvl";
const SessionDetail = () => {
  const Refresh = useRefresh((state) => state.refresh);

  const [loading, setloading] = useState(false);
  const [loaded, setloaded] = useState(false);
  const [showpro, getshowpro] = useState(false);
  const [valueToSend, setvalueToSend] = useState("");
  const [getcourse, setgetcourse] = useState();
  const [ref, setref] = useState(false);
  const [getHomeWorkByid, setgetHomeWorkByid] = useState();

  const run = async () => {
    setloading(true);
    const reponse = await GetSessionHomeWorksCall(valueToSend);
    console.log("session homeWorks", reponse);
    setgetHomeWorkByid(reponse);
    const res = await GetSessionByIDcall(valueToSend);
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
    setref(true);
  };

  useEffect(() => {
    if (ref) run();
  }, [Refresh]);
  useEffect(() => {
    console.log("valuesdcsdc", getcourse);
  }, [getcourse]);

  return (
    <Card className="t-shadow-none t-my-0 t-px-4">
      <CardHeader>
        <CardTitle tag="h2">پیدا کردن اطلاعات مربوط به جلسه</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col md="6" sm="12">
            <div className="input-group ">
              <Input
                type="text"
                placeholder="شناسه جلسه را وارد کنید"
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
        <SessionDetailWithID
          getcourse={getcourse}
          GetHomeWork={getHomeWorkByid}
        />
      )}

      {!loading && loaded && !getcourse && (
        <div className=" t-p-5 ">موردی یافت نشد</div>
      )}
    </Card>
  );
};

export default SessionDetail;
