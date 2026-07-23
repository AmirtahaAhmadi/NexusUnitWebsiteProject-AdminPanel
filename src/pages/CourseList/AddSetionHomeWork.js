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

import { PostAddSessionHomeWorkcall } from "../../core/Interceptor/Courses/PostAddSessionHomeWork";
const AddSetionHomeWork = () => {
  // const getassist = async () => {
  //   const result = await Getassistans();
  //   console.log("GetallassistanceCall", result);

  //   console.log("GetallassistanceCall", result);
  // };
  const [ezafeshod, setezafeshod] = useState(false);
  const refreshWatch = useRefresh((state) => state.refresh);
  const refreshValue = useRefresh((state) => state.setRefresh);
  const [newwork, setnewwork] = useState({
    sessionId: "",
    hwTitle: "",
    hwDescribe: "",
  });

  const handleSubmit = async () => {
    const res = await PostAddSessionHomeWorkcall(newwork);
    if (res) {
      refreshValue();
      toast.success(" اضافه شد");
      setnewwork({
        sessionId: "",
        hwTitle: "",
        hwDescribe: "",
      });
    } else {
      toast.error("خطا");
    }
  };

  //   useEffect(() => {
  //     // getassist();
  //     console.log(refreshWatch, "refreshValue");
  //   }, [refreshWatch]);

  useEffect(() => {
    // getassist();
    console.log(newwork, "NEW WORK");
  }, [newwork]);

  return (
    <Card className="t-shadow-none">
      <CardBody>
        <Form className="t-p-6">
          <div tag="h4" className="t-my-5 t-text-[18px]">
            اضافه کردن تسک
          </div>
          <Row className="g-2">
            <Col md="6">
              <Label for="worktitle" className="mb-50">
                شناسه جلسه
              </Label>
              <Input
                type="text"
                name="worktitle"
                id="worktitle"
                placeholder="شناسه جلسه "
                value={newwork.sessionId}
                onChange={(e) => {
                  setnewwork((prev) => ({
                    ...prev,
                    sessionId: e.target.value,
                  }));
                }}
              />
            </Col>

            <Col md="6">
              <Label for="workDescribe" className="mb-50">
                شرح تکلیف
              </Label>
              <Input
                type="text"
                name="workDescribe"
                id="workDescribe"
                placeholder="شرح تکلیف را وارد کنید"
                value={newwork.hwTitle}
                onChange={(e) => {
                  setnewwork((prev) => ({
                    ...prev,
                    hwTitle: e.target.value,
                  }));
                }}
              />
            </Col>
            <Col md="6">
              <Label for="Describe" className="mb-50">
                توضیح تکلیف را وارد کنید
              </Label>
              <Input
                type="Text"
                name="Describe"
                id="workDescribe "
                placeholder="توضیح راوارد کنید"
                className="t-text-left"
                value={newwork.hwDescribe}
                onChange={(e) => {
                  setnewwork((prev) => ({
                    ...prev,
                    hwDescribe: e.target.value,
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
                outline={true}
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

export default AddSetionHomeWork;
