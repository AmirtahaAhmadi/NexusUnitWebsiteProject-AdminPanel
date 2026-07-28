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
import { useParams } from "react-router-dom";
import { PostAddSessionHomeWorkcall } from "../../core/Interceptor/Courses/PostAddSessionHomeWork";

const AddSetionHomeWork = () => {
  const [exist, setExist] = useState(false);
  const [getvalue, setgetvalue] = useState("");
  const { id } = useParams();

  const [ezafeshod, setezafeshod] = useState(false);
  const refreshWatch = useRefresh((state) => state.refresh);
  const refreshValue = useRefresh((state) => state.setRefresh);

  const [newwork, setnewwork] = useState({
    sessionId: "",
    hwTitle: "",
    hwDescribe: "",
  });

  const handleSubmit = async () => {
    
    if (!newwork.sessionId) {
      toast.error("شناسه جلسه مشخص نیست");
      return;
    }

    const res = await PostAddSessionHomeWorkcall(newwork);
    if (res) {
      refreshValue();
      toast.success(" اضافه شد");
      setnewwork({
        sessionId: exist ? id : "",
        hwTitle: "",
        hwDescribe: "",
      });
    } else {
      toast.error("خطا");
    }
  };

  useEffect(() => {
    console.log(newwork, "NEW WORK");
  }, [newwork]);

  useEffect(() => {
    if (id) {
      setExist(true);
      setgetvalue(id);
      setnewwork((prev) => ({
        ...prev,
        sessionId: id,
      }));
    } else {
      setExist(false);
    }
  }, [id]);

  return (
    <Card className="t-shadow-none">
      <CardBody>
        <Form className="t-p-6">
          <div tag="h4" className="t-my-5 t-text-[18px]">
            اضافه کردن تکلیف
          </div>
          <Row className="g-2">
            {exist ? (
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
                  disabled
                />
              </Col>
            ) : (
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
            )}

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
                type="text"
                name="Describe"
                id="Describe"
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
                }}
              >
                ارسال
              </Button>

              <Button
                outline={true}
                color="secondary"
                type="reset"
                onClick={(e) => {
                  e.preventDefault();
                  setnewwork({
                    sessionId: exist ? id : "",
                    hwTitle: "",
                    hwDescribe: "",
                  });
                }}
              >
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