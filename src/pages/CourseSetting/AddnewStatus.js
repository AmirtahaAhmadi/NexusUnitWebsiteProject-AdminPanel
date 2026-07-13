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

import { useRefresh } from "../../redux/zustan/refreshCourselvl";
import toast from "react-hot-toast";
import { CreateNewStatusCall } from "../../core/Interceptor/Courses/CreateNewStatusCall";
const AddnewStatus = () => {
  //    '7OVVhTYiXDGLXj0l8Ph36'
  // const getassist = async () => {
  //   const result = await Getassistans();
  //   console.log("GetallassistanceCall", result);

  //   console.log("GetallassistanceCall", result);
  // };
  const [ezafeshod, setezafeshod] = useState(false);
  const refreshWatch = useRefresh((state) => state.refresh);
  const refreshValue = useRefresh((state) => state.setRefresh);
  const [newwork, setnewwork] = useState({
    statusName: "",
    describe: "",
    statusNumber: "",
  });

  const handleSubmit = async () => {
    const res = await CreateNewStatusCall(newwork);
    if (res) {
      refreshValue();
      toast.success(" استاتوس اضافه شد");
      setnewwork({
        statusName: "",
        describe: "",
        statusNumber: "",
      });
    } else {
      toast.error("خطا");
    }
  };

  useEffect(() => {
    // getassist();
    console.log(refreshWatch, "refreshValue");
  }, [refreshWatch]);
  return (
    <Card className="t-shadow-none">
      <CardBody>
        <Form className="t-p-6">
          <div tag="h4" className="t-my-5 t-text-[18px]">
            استاتوس جدید
          </div>
          <Row className="g-2">
            <Col md="6">
              <Label for="worktitle" className="mb-50">
                نام استاتوس
              </Label>
              <Input
                type="text"
                name="worktitle"
                id="worktitle"
                placeholder="نام استاتوس را وارد کنید"
                value={newwork.statusName}
                onChange={(e) => {
                  setnewwork((prev) => ({
                    ...prev,
                    statusName: e.target.value,
                  }));
                }}
              />
            </Col>

            <Col md="6">
              <Label for="workDescribe" className="mb-50">
                توضیح
              </Label>
              <Input
                type="text"
                name="workDescribe"
                id="workDescribe"
                placeholder="توضیح را وارد کنید"
                value={newwork.describe}
                onChange={(e) => {
                  setnewwork((prev) => ({
                    ...prev,
                    describe: e.target.value,
                  }));
                }}
              />
            </Col>
            <Col md="6">
              <Label for="workDescribe" className="mb-50">
                شناسه
              </Label>
              <Input
                type="number"
                name="workDescribe"
                id="workDescribe "
                placeholder="فقط اعداد مجاز هستند"
                className="t-text-left"
                value={newwork.statusNumber}
                onChange={(e) => {
                  setnewwork((prev) => ({
                    ...prev,
                    statusNumber: e.target.value,
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
                    id: "",
                    levelName: "",
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

export default AddnewStatus;
