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
import { postAddSessionFileCall } from "../../core/Interceptor/Courses/postAddSessionFileCall";
import AddSetionHomeWork from "./AddSetionHomeWork";

const AddSessionFiles = () => {
  // const getassist = async () => {
  //   const result = await Getassistans();
  //   console.log("GetallassistanceCall", result);

  //   console.log("GetallassistanceCall", result);
  // };
  const refresh = useRefresh((state) => state.setRefresh);

  const [ezafeshod, setezafeshod] = useState(false);
  const refreshWatch = useRefresh((state) => state.refresh);
  const refreshValue = useRefresh((state) => state.setRefresh);
  const [newwork, setnewwork] = useState({
    sessionId: "",
    SessionFiles: null,
  });

  const handleSubmit = async () => {
    if (!newwork.sessionId || !newwork.SessionFiles) {
      toast.error("شناسه جلسه و فایل را وارد کنید");
      return;
    }

    try {
      const res = await postAddSessionFileCall(newwork);

      if (res) {
        refreshValue();
        toast.success("اضافه شد");
        setnewwork({
          sessionId: "",
          SessionFiles: null,
        });
      } else {
        toast.error("خطا");
      }
    } catch (error) {
      toast.error("خطا");
      console.log(error);
    }
  };

  //   useEffect(() => {
  //     // getassist();
  //     console.log(refreshWatch, "refreshValue");
  //   }, [refreshWatch]);

  useEffect(() => {
    // getassist();
    console.log(newwork, "NEW WORK");
  }, [newwork, refresh]);

  return (
    <Card className="t-shadow-none">
      <CardBody>
        <Form className="t-p-6">
          <div tag="h4" className="t-my-5 t-text-[18px]">
            اضافه کردن فایل ها
          </div>
          <Row className="g-2">
            <Col md="6 t-flex t-flex-col t-gap-5">
              <div>
                <Label for="worktitle">شناسه جلسه</Label>
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
              </div>
              <div>
                <Label for="worktitle">ارسال فایل</Label>
                <Input
                  type="file"
                  name="sendfile"
                  id="worktitle3"
                  placeholder="جایگذاری فایل"
                  onChange={(e) => {
                    setnewwork((prev) => ({
                      ...prev,
                      SessionFiles: e.target.files[0],
                    }));
                  }}
                />{" "}
              </div>
            </Col>
          </Row>

          <Row className="mt-2 g-2">
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
                    sessionId: "",
                    SessionFiles: null,
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

export default AddSessionFiles;
