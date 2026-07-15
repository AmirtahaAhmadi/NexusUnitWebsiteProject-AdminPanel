import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Col,
  Input,
  Form,
  Button,
  Label,
  Row,
} from "reactstrap";
import { Createjobcall } from "../../../core/Interceptor/Courses/Createjobcall";
import { Getjobscall } from "../../../core/Interceptor/Courses/getjobscall";
import { Getallassistancework } from "../../../core/Interceptor/Courses/Getallassistancework";
import { Getassistans } from "../../../core/Interceptor/Courses/GetallassistanceCall";
import toast from "react-hot-toast";
const Addnewjob = () => {
  //    '7OVVhTYiXDGLXj0l8Ph36'
  // const getassist = async () => {
  //   const result = await Getassistans();
  //   console.log("GetallassistanceCall", result);

  //   console.log("GetallassistanceCall", result);
  // };
  const [ezafeshod, setezafeshod] = useState(false);

  const [newwork, setnewwork] = useState({
    worktitle: "",
    workDescribe: "",
    assistanceId: "",
    workDate: "",
  });

  const handleSubmit = async () => {
    const fixdate = {
      ...newwork,
      workDate: new Date(newwork.workDate).toISOString(),
    };

    const res = await Createjobcall(fixdate);
    if (res) {
      toast.success("شغل اضافه شد");
      setnewwork({
        worktitle: "",
        workDescribe: "",
        assistanceId: "",
        workDate: "",
      });
    }
  };

  // useEffect(() => {
  //   getassist();
  // }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">ایجاد شغل جدید</CardTitle>
      </CardHeader>

      <CardBody>
        <Form className="t-p-4">
          <Row className="g-2">
            <Col md="6">
              <Label for="worktitle" className="mb-50">
                نام شغل
              </Label>
              <Input
                type="text"
                name="worktitle"
                id="worktitle"
                placeholder="نام شغل"
                value={newwork.worktitle}
                onChange={(e) => {
                  setnewwork((prev) => ({
                    ...prev,
                    worktitle: e.target.value,
                  }));
                }}
              />
            </Col>

            <Col md="6">
              <Label for="workDescribe" className="mb-50">
                توضیح کورس
              </Label>
              <Input
                type="text"
                name="workDescribe"
                id="workDescribe"
                placeholder="توضیح کورس"
                value={newwork.workDescribe}
                onChange={(e) => {
                  setnewwork((prev) => ({
                    ...prev,
                    workDescribe: e.target.value,
                  }));
                }}
              />
            </Col>

            <Col md="6">
              <Label for="assistanceId" className="mb-50">
                ای دی مشاور
              </Label>
              <Input
                type="text"
                name="assistanceId"
                id="assistanceId"
                placeholder="ای دی مشاور"
                value={newwork.assistanceId}
                onChange={(e) => {
                  setnewwork((prev) => ({
                    ...prev,
                    assistanceId: e.target.value,
                  }));
                }}
              />
            </Col>
            <Col md="6">
              <Label for="workDate" className="mb-50">
                تاریخ
              </Label>

              <Input
                type="datetime-local"
                name="workDate"
                id="workDate"
                value={newwork.workDate}
                onChange={(e) => {
                  setnewwork((prev) => ({
                    ...prev,
                    workDate: e.target.value,
                  }));
                }}
              />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col className="d-flex gap-1">
              <Button
                color="primary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                  console.log(newwork);
                }}>
                ارسال
              </Button>

              <Button
                outline
                color="secondary"
                type="reset"
                onClick={() =>
                  setnewwork({
                    worktitle: "",
                    workDescribe: "",
                    assistanceId: "",
                    workDate: "",
                  })
                }>
                پاک کردن
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default Addnewjob;
