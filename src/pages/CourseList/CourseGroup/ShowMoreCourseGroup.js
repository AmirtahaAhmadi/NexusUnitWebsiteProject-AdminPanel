// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Custom Components
// import Rec from "./Rectangle.png";

// ** Reactstrap Imports
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
} from "reactstrap";

// ** Third Party Components
import toast from "react-hot-toast";
// import { EditCourse } from "../../core/Interceptor/Courses/EditCourse";

import Select from "react-select";
import { dateToLocal } from "../../../core/Interceptor/reusablefunctions/DateTolocal";
import { deleteCourseGroupCall } from "../../../core/Interceptor/Courses/DeleteCourseGroupCall";
import EditCourseGroup from "./EditCourseGroup";
import { useRefresh } from "../../../redux/zustan/refreshCourselvl";
const ShowMoreCourseGroup = ({ groupDetails }) => {
  const refresh = useRefresh((state) => {
    state.refresh;
  });

  const [show, setShow] = useState(false);
  const [showedit, setshowedit] = useState(false);
  const [getChoosingData, setgetChoosingData] = useState([]);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const [newvalue, setnewvalue] = useState({
    courseId: "",
    title: "",
    capacity: "",
    teacherId: "",
    teacherName: "",
  });

  const getChoose = async () => {
    try {
      const res = await getCourseCreateDataCall();
      setgetChoosingData(res);
    } catch (err) {
      console.error("Error fetching choices", err);
    }
  };

  useEffect(() => {
    getChoose();
  }, []);

  // Sync state initially with groupDetails passed down from table row
  useEffect(() => {
    if (groupDetails) {
      setnewvalue((prev) => ({
        ...prev,
        courseId: groupDetails.CourseId || groupDetails.courseId || "",
        title: groupDetails.courseName || "",
        capacity: groupDetails.groupCapacity || "",
        teacherName: groupDetails.teacherName || "",
      }));
    }
  }, [groupDetails]);

  const teacherOptions = (getChoosingData?.teachers || []).map((item) => ({
    value: item.teacherId,
    label: item.fullName,
  }));

  const handleChange = (el, value) => {
    setnewvalue((prev) => ({
      ...prev,
      [el]: value,
    }));
  };

  const handleDelete = async () => {
    const idToDelete = groupDetails?.id || groupDetails?.groupId;
    if (!idToDelete) {
      toast.error("شناسه گروه یافت نشد");
      return;
    }

    try {
      setDeleting(true);
      await deleteCourseGroupCall(idToDelete);
      toast.success("گروه دوره با موفقیت حذف شد");
      setShow(false);
    } catch (error) {
      console.error("Error deleting course group:", error);
      toast.error("خطا در حذف گروه دوره");
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "نامشخص";
    try {
      return dateToLocal(dateStr);
    } catch {
      return new Date(dateStr).toLocaleDateString("fa-IR");
    }
  };

  return (
    <Fragment>
      <div
        className="text-truncate fw-bolder t-p-3 t-cursor-pointer t-bg-[#f3f2f7] t-rounded-[8px] hover:t-bg-[#6256e2] hover:t-text-[#f8f8f8] t-duration-300 t-transition-all"
        onClick={() => setShow(true)}>
        مشاهده
      </div>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg">
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)} />

        <ModalBody className="px-sm-5 mx-50 pb-4">
          <h1 className="text-center mb-1">
            {showedit ? "اصلاح اطلاعات گروه دوره" : "مشاهده جزئیات گروه دوره"}
          </h1>

          <div className="t-w-[90%] t-mx-auto mb-2">
            <img className="t-w-full" src="#" alt="course-header" />
          </div>

          <h5 className="fw-bold border-bottom pb-50 p-4 t-text-[25px]">
            {groupDetails?.courseName || "بدون نام دوره"}
          </h5>

          {showedit ? (
            <EditCourseGroup groupDetails={groupDetails} />
          ) : (
            <div className="t-flex t-flex-col t-gap-6 t-p-4">
              <div>
                <h6 className="fw-bolder t-text-[#6256e2] border-bottom pb-1 mb-2">
                  اطلاعات گروه
                </h6>
                <div className="t-grid t-grid-cols-2 t-gap-4">
                  <div className="border-bottom pb-2">
                    <span className="text-muted d-block">نام گروه:</span>
                    <span className="fw-bolder">
                      {groupDetails?.groupName || "نامشخص"}
                    </span>
                  </div>
                  <div className="border-bottom pb-2">
                    <span className="text-muted d-block">ظرفیت گروه:</span>
                    <span className="fw-bolder">
                      {groupDetails?.groupCapacity || 0} نفر
                    </span>
                  </div>
                  <div className="border-bottom pb-2">
                    <span className="text-muted d-block">شناسه گروه (ID):</span>
                    <span
                      className="fw-bolder text-secondary"
                      style={{ fontSize: "12px" }}>
                      {groupDetails?.id || "نامشخص"}
                    </span>
                  </div>
                  <div className="border-bottom pb-2">
                    <span className="text-muted d-block">آدرس آیکون:</span>
                    <span className="fw-bolder">
                      {groupDetails?.iconAddress || "بدون آیکون"}
                    </span>
                  </div>
                </div>
              </div>

              {groupDetails?.teacher && (
                <div>
                  <h6 className="fw-bolder t-text-[#6256e2] border-bottom pb-1 mb-2">
                    جزئیات استاد ({groupDetails.teacherName})
                  </h6>
                  <div className="t-grid t-grid-cols-2 t-gap-4">
                    <div className="border-bottom pb-2">
                      <span className="text-muted d-block">نام کاربری:</span>
                      <span className="fw-bolder">
                        {groupDetails.teacher.userName || "نامشخص"}
                      </span>
                    </div>
                    <div className="border-bottom pb-2">
                      <span className="text-muted d-block">ایمیل:</span>
                      <span className="fw-bolder">
                        {groupDetails.teacher.gmail || "نامشخص"}
                      </span>
                    </div>
                    <div className="border-bottom pb-2">
                      <span className="text-muted d-block">شماره تماس:</span>
                      <span className="fw-bolder">
                        {groupDetails.teacher.phoneNumber || "نامشخص"}
                      </span>
                    </div>
                    <div className="border-bottom pb-2">
                      <span className="text-muted d-block">جنسیت:</span>
                      <span className="fw-bolder">
                        {groupDetails.teacher.gender ? "مرد" : "زن"}
                      </span>
                    </div>
                    <div className="border-bottom pb-2">
                      <span className="text-muted d-block">
                        تاریخ ثبت مدرس:
                      </span>
                      <span className="fw-bolder">
                        {formatDate(groupDetails.teacher.insertDate)}
                      </span>
                    </div>
                    <div className="border-bottom pb-2">
                      <span className="text-muted d-block">وضعیت حساب:</span>
                      <span
                        className={`fw-bolder ${
                          groupDetails.teacher.active
                            ? "text-success"
                            : "text-danger"
                        }`}>
                        {groupDetails.teacher.active ? "فعال" : "غیرفعال"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {groupDetails?.course && (
                <div>
                  <h6 className="fw-bolder t-text-[#6256e2] border-bottom pb-1 mb-2">
                    اطلاعات دوره ({groupDetails.courseName})
                  </h6>
                  <div className="t-grid t-grid-cols-2 t-gap-4">
                    <div className="border-bottom pb-2">
                      <span className="text-muted d-block">هزینه دوره:</span>
                      <span className="fw-bolder text-success">
                        {groupDetails.course.cost?.toLocaleString() || 0} ریال
                      </span>
                    </div>
                    <div className="border-bottom pb-2">
                      <span className="text-muted d-block">ظرفیت دوره:</span>
                      <span className="fw-bolder">
                        {groupDetails.course.capacity || 0} نفر
                      </span>
                    </div>
                    <div className="border-bottom pb-2">
                      <span className="text-muted d-block">تاریخ شروع:</span>
                      <span className="fw-bolder">
                        {formatDate(groupDetails.course.startTime)}
                      </span>
                    </div>
                    <div className="border-bottom pb-2">
                      <span className="text-muted d-block">تاریخ پایان:</span>
                      <span className="fw-bolder">
                        {formatDate(groupDetails.course.endTime)}
                      </span>
                    </div>
                    <div className="border-bottom pb-2">
                      <span className="text-muted d-block">
                        آخرین بروزرسانی دوره:
                      </span>
                      <span className="fw-bolder">
                        {formatDate(groupDetails.course.lastUpdate)}
                      </span>
                    </div>
                    <div className="border-bottom pb-2">
                      <span className="text-muted d-block">وضعیت دوره:</span>
                      <span
                        className={`fw-bolder ${
                          groupDetails.course.active
                            ? "text-success"
                            : "text-danger"
                        }`}>
                        {groupDetails.course.active ? "فعال" : "غیرفعال"}
                      </span>
                    </div>
                    <div className="border-bottom pb-2 col-span-2">
                      <span className="text-muted d-block">
                        توضیح کوتاه دوره:
                      </span>
                      <span className="fw-bolder">
                        {groupDetails.course.miniDescribe || "بدون توضیح"}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="d-flex justify-content-center pt-2">
            <Button
              onClick={() => setshowedit(!showedit)}
              className="ms-1"
              color="primary">
              {showedit ? "انصراف" : "اصلاح"}
            </Button>

            {!showedit && (
              <Button
                onClick={handleDelete}
                disabled={deleting}
                className="ms-1"
                color="secondary"
                outline>
                حذف گروه
              </Button>
            )}
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ShowMoreCourseGroup;
