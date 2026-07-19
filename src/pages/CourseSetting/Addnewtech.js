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
import { CreateNewtechnologyCall } from "../../core/Interceptor/Courses/CreateNewtechnologyCall";

const Addnewtech = () => {
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
    techName: "",
    parentId: "",
    describe: "",
    iconAddress: "",
  });

  const handleSubmit = async () => {
    const res = await CreateNewtechnologyCall(newwork);
    if (res) {
      refreshValue();
      toast.success(" اضافه شد");
      setnewwork({
        techName: "",
        parentId: "",
        describe: "",
        iconAddress: "",
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
            تکنولوژی جدید
          </div>
          <Row className="g-2">
            <Col md="6">
              <Label for="worktitle" className="mb-50">
                نام تلنولوژِی
              </Label>
              <Input
                type="text"
                name="worktitle"
                id="worktitle"
                placeholder="نام تکنولوژی جدید را وارد"
                value={newwork.techName}
                onChange={(e) => {
                  setnewwork((prev) => ({
                    ...prev,
                    techName: e.target.value,
                  }));
                }}
              />
            </Col>

            <Col md="6">
              <Label for="workDescribe" className="mb-50">
                شناسه والد
              </Label>
              <Input
                type="text"
                name="workDescribe"
                id="workDescribe"
                placeholder="شناسه والد را وارد کنید"
                value={newwork.parentId}
                onChange={(e) => {
                  setnewwork((prev) => ({
                    ...prev,
                    parentId: e.target.value,
                  }));
                }}
              />
            </Col>
            <Col md="6">
              <Label for="Describe" className="mb-50">
                توضیح
              </Label>
              <Input
                type="Text"
                name="Describe"
                id="workDescribe "
                placeholder="توضیح راوارد کنید"
                className="t-text-left"
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
                ادرس تصویر
              </Label>
              <Input
                type="text"
                name="workDescribe"
                id="workDescribe "
                placeholder="ادرس تصویر را وارد"
                className="t-text-left"
                value={newwork.iconAddress}
                onChange={(e) => {
                  setnewwork((prev) => ({
                    ...prev,
                    iconAddress: e.target.value,
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

export default Addnewtech;
