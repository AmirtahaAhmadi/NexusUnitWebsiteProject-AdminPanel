import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Row,
  Col,
  Button,
  Label,
} from "reactstrap";
import toast from "react-hot-toast";

import { useRefresh } from "../../../redux/zustan/refreshCourselvl";
import { updateCourseGroupCall } from "../../../core/Interceptor/Courses/UpdateCourseGroupCall";

const EditCourseGroup = ({ groupDetails }) => {
  const setrefresh = useRefresh((state) => state.setRefresh);
  const refresh = useRefresh((state) => {
    state.refresh;
  });
  const [updating, setUpdating] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    groupName: "",
    courseId: "",
    groupCapacity: "",
  });

  useEffect(() => {
    if (groupDetails) {
      setFormData({
        id: groupDetails.id || groupDetails.Id || "",
        groupName: groupDetails.groupName || groupDetails.GroupName || "",
        courseId: groupDetails.courseId || groupDetails.CourseId || "",
        groupCapacity:
          groupDetails.groupCapacity || groupDetails.GroupCapacity || "",
      });
    }
  }, [groupDetails]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    if (
      !formData.id ||
      !formData.groupName ||
      !formData.courseId ||
      !formData.groupCapacity
    ) {
      toast.error("لطفاً تمامی فیلدها را پر کنید");
      return;
    }

    try {
      setUpdating(true);
      await updateCourseGroupCall(formData);
      setrefresh();

      toast.success("گروه دوره با موفقیت ویرایش شد");
    } catch (error) {
      console.error(error);
      toast.error("خطا در ویرایش گروه دوره");
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    console.log(formData, "formData");
  }, [formData]);

  if (!groupDetails) {
    return (
      <div className="p-3 text-warning">
        هیچ اطلاعاتی برای ویرایش انتخاب نشده است.
      </div>
    );
  }

  return (
    <Card className="t-shadow-none">
      <CardHeader>
        <CardTitle tag="h2">ویرایش گروه دوره</CardTitle>
      </CardHeader>
      <CardBody>
        <h4 className="mb-3">فرم ویرایش اطلاعات گروه دوره</h4>
        <Row className="g-3">
          <Col md="6" sm="12">
            <Label for="groupName">نام گروه</Label>
            <Input
              id="groupName"
              value={formData.groupName}
              onChange={(e) => handleInputChange("groupName", e.target.value)}
            />
          </Col>

          <Col md="6" sm="12">
            <Label for="groupCapacity">ظرفیت</Label>
            <Input
              type="number"
              id="groupCapacity"
              value={formData.groupCapacity}
              onChange={(e) =>
                handleInputChange("groupCapacity", e.target.value)
              }
            />
          </Col>

          <Col md="6" sm="12">
            <Label for="courseId">شناسه دوره Course ID</Label>
            <Input
              id="courseId"
              value={formData.courseId}
              // onChange={(e) => handleInputChange("courseId", e.target.value)}
            />
          </Col>

          <Col sm="12" className="mt-4">
            <Button color="success" onClick={handleUpdate} disabled={updating}>
              ثبت سفارش
            </Button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default EditCourseGroup;
