import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // اضافه شد
import {
  Card,
  CardBody,
  Col,
  Input,
  Form,
  Button,
  Label,
  Row,
} from "reactstrap";
import { useRefresh } from "../../../redux/zustan/refreshCourselvl";
import toast from "react-hot-toast";
import { AddNewCourseGroupCall } from "../../../core/Interceptor/Courses/AddNewCourseGroupCall";

const AddNewCourseGroup = () => {
  const refreshWatch = useRefresh((state) => state.refresh);
  const refreshValue = useRefresh((state) => state.setRefresh);
  const location = useLocation();

  const [newGroup, setNewGroup] = useState({
    GroupName: "",
    CourseId: "",
    GroupCapacity: "",
  });

  useEffect(() => {
    if (location.state?.courseId) {
      setNewGroup((prev) => ({
        ...prev,
        CourseId: location.state.courseId,
      }));

      setTimeout(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      }, 800);
    }
  }, [location.state]);

  const handleSubmit = async () => {
    if (!newGroup.GroupName || !newGroup.CourseId || !newGroup.GroupCapacity) {
      toast.error("لطفاً تمامی فیلدها را پر کنید");
      return;
    }

    const res = await AddNewCourseGroupCall(newGroup);
    if (res) {
      refreshValue();
      toast.success("گروه جدید با موفقیت اضافه شد");
      setNewGroup({
        GroupName: "",
        CourseId: "",
        GroupCapacity: "",
      });
    } else {
      toast.error("خطا در ایجاد گروه");
    }
  };

  useEffect(() => {
    console.log(refreshWatch, "refreshValue");
  }, [refreshWatch]);

  return (
    <Card className="t-shadow-none">
      <CardBody>
        <Form className="t-p-6">
          <div tag="h4" className="t-my-5 t-text-[18px]">
            ایجاد گروه دوره جدید
          </div>
          <Row className="g-2">
            <Col md="6">
              <Label for="groupName" className="mb-50">
                نام گروه
              </Label>
              <Input
                type="text"
                name="groupName"
                id="groupName"
                placeholder="نام گروه را وارد کنید"
                value={newGroup.GroupName}
                onChange={(e) => {
                  setNewGroup((prev) => ({
                    ...prev,
                    GroupName: e.target.value,
                  }));
                }}
              />
            </Col>

            <Col md="6">
              <Label for="courseId" className="mb-50">
                شناسه دوره
              </Label>
              <Input
                type="text"
                name="courseId"
                id="courseId"
                placeholder="شناسه دوره را وارد کنید"
                value={newGroup.CourseId}
                onChange={(e) => {
                  setNewGroup((prev) => ({
                    ...prev,
                    CourseId: e.target.value,
                  }));
                }}
              />
            </Col>

            <Col md="6">
              <Label for="groupCapacity" className="mb-50">
                ظرفیت گروه
              </Label>
              <Input
                className="t-text-end"
                type="number"
                name="groupCapacity"
                id="groupCapacity"
                placeholder="ظرفیت را وارد کنید"
                value={newGroup.GroupCapacity}
                onChange={(e) => {
                  setNewGroup((prev) => ({
                    ...prev,
                    GroupCapacity: e.target.value,
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
                }}>
                ارسال
              </Button>

              <Button
                outline
                color="secondary"
                type="reset"
                onClick={() =>
                  setNewGroup({
                    GroupName: "",
                    CourseId: "",
                    GroupCapacity: "",
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

export default AddNewCourseGroup;
