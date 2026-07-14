// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Custom Components
import { getcoursebyidAdminTeacherCall } from "../../core/Interceptor/Courses/getcoursebyidAdminTeacherCall";
import Rec from "./Rectangle.png";

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
import { ActiveDeactiveCourse } from "../../core/Interceptor/Courses/ActiveDeactiveCourse";
import { EditCourse } from "../../core/Interceptor/Courses/EditCourse";
import { CreateCourseLevelCall } from "../../core/Interceptor/Courses/CreateCourseLevelCall";
import { getCourseCreateDataCall } from "../../core/Interceptor/Courses/getCreateStep1Call";
import axios from "axios";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import AsyncSelect from "react-select/async";
const ShowingMoreOfcourseinfo = ({ array }) => {
  const [show, setShow] = useState(false);
  const [showedit, setshowedit] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [array1, setarray1] = useState(null);
  const [getcourse1, setgetcoursebyid] = useState({});
  const [getChoosingData, setgetChoosingData] = useState([]);
  const getChoose = async () => {
    const res = await getCourseCreateDataCall();
    console.log("res", res);
    setgetChoosingData(res);
  };
  useEffect(() => {
    getChoose();
  }, []);

  const [newvalue, setnewvalue] = useState({
    title: "",
    describe: "",
    miniDescribe: "",
    capacity: "",
    courseTypeId: "",
    sessionNumber: "",
    currentCoursePaymentNumber: "",
    tremId: "",
    classId: "",
    courseLvlId: "",
    teacherId: "",
    cost: "",
    uniqeUrlString: "",
    image: "",
    startTime: "",
    endTime: "",
    googleSchema: "",
    googleTitle: "",
    coursePrerequisiteId: "",
    shortLink: "",
    tumbImageAddress: "",
    imageAddress: "",
    id: "",
  });

  const run = async () => {
    try {
      const courseId = array1;
      if (!courseId) return;

      const getbyid = await getcoursebyidAdminTeacherCall(courseId);
      if (getbyid) {
        setgetcoursebyid(getbyid);

        setnewvalue({
          title: getbyid.title,
          describe: getbyid.describe,
          miniDescribe: getbyid.miniDescribe,
          capacity: getbyid.capacity,
          courseTypeId: getbyid.courseTypeId,
          sessionNumber: getbyid.sessionNumber,
          currentCoursePaymentNumber: getbyid.currentCoursePaymentNumber,
          tremId: getbyid.tremId,
          classId: getbyid.classId,
          courseLvlId: getbyid.courseLvlId,
          teacherId: getbyid.teacherId,
          cost: getbyid.cost,
          uniqeUrlString: getbyid.uniqeUrlString,
          image: null,
          startTime: new Date(getbyid.startTime).toISOString().slice(0, 16),

          endTime: new Date(getbyid.endTime).toISOString().slice(0, 16),

          googleSchema: getbyid.googleSchema,
          googleTitle: getbyid.googleTitle,
          coursePrerequisiteId: getbyid.coursePrerequisiteId,
          shortLink: getbyid.shortLink,
          tumbImageAddress: getbyid.tumbImageAddress,
          imageAddress: getbyid.imageAddress,
          id: getbyid.id || getbyid.courseId,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setarray1(array);
  }, [array]);

  useEffect(() => {
    run();
  }, [array1, refresh]);

  const handleChange = (key, value) => {
    setnewvalue((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await EditCourse(newvalue);

      toast.success("دوره با موفقیت ویرایش شد");
      setshowedit(false);
      setrefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast.error("خطا در ویرایش دوره");
    }
  };

  const ActiveOrDeactive = async () => {
    const action = {
      active: !getcourse1?.isActive,
      id: getcourse1?.courseId,
    };

    try {
      const result = await ActiveDeactiveCourse(action);
      if (result) {
        toast.success("وضعیت دوره تغییر کرد");
        setrefresh((prev) => !prev);
      }
    } catch (error) {
      console.error("this an error", error);
      toast.error("خظا");
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
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}></ModalHeader>

        <ModalBody className="px-sm-5 mx-50 pb-4">
          <h1 className="text-center mb-1">
            {showedit ? "اصلاح اطلاعات دوره" : "مشاهده جزئیات دوره"}
          </h1>

          <div className="t-w-[90%] t-mx-auto mb-2">
            <img className="t-w-full" src={Rec} alt="course-header" />
          </div>

          <h5 className="fw-bold border-bottom pb-50 p-4 t-text-[25px] ">
            {getcourse1.title}
          </h5>

          {showedit ? (
            <div className="t-flex t-flex-col t-gap-3 t-p-4">
              <div>
                <Label for="title">نام دوره</Label>
                <Input
                  id="title"
                  value={newvalue.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </div>

              <div>
                <Label for="miniDescribe">توضیح کوتاه</Label>
                <Input
                  id="miniDescribe"
                  value={newvalue.miniDescribe}
                  onChange={(e) => handleChange("miniDescribe", e.target.value)}
                />
              </div>

              <div>
                <Label for="describe">توضیحات کامل</Label>
                <Input
                  type="textarea"
                  id="describe"
                  rows="4"
                  value={newvalue.describe}
                  onChange={(e) => handleChange("describe", e.target.value)}
                />
              </div>

              <div className="d-flex gap-2">
                <div className="flex-fill">
                  <Label for="capacity">ظرفیت</Label>
                  <Input
                    type="number"
                    id="capacity"
                    value={newvalue.capacity}
                    onChange={(e) => handleChange("capacity", e.target.value)}
                  />
                </div>
                <div className="flex-fill">
                  <Label for="cost">قیمت</Label>
                  <Input
                    type="number"
                    id="cost"
                    value={newvalue.cost}
                    onChange={(e) => handleChange("cost", e.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex gap-2">
                <div className="flex-fill">
                  <Label for="courseTypeId">نوع دوره</Label>
                  <Input
                    type="number"
                    id="courseTypeId"
                    value={newvalue.courseTypeId}
                    onChange={(e) =>
                      handleChange("courseTypeId", e.target.value)
                    }
                  />
                </div>
                <div className="flex-fill">
                  <Label for="sessionNumber">تعداد جلسات</Label>
                  <Input
                    type="number"
                    id="sessionNumber"
                    value={newvalue.sessionNumber}
                    onChange={(e) =>
                      handleChange("sessionNumber", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="d-flex gap-2">
                <div className="flex-fill">
                  <Label for="currentCoursePaymentNumber">شماره پرداخت</Label>
                  <Input
                    type="number"
                    id="currentCoursePaymentNumber"
                    value={newvalue.currentCoursePaymentNumber}
                    onChange={(e) =>
                      handleChange("currentCoursePaymentNumber", e.target.value)
                    }
                  />
                </div>
                <div className="flex-fill">
                  <Label for="tremId">ترم</Label>
                  <Input
                    type="number"
                    id="tremId"
                    value={newvalue.tremId}
                    onChange={(e) => handleChange("tremId", e.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex gap-2">
                <div className="flex-fill">
                  <Label for="classId">کلاس</Label>
                  <Input
                    type="number"
                    id="classId"
                    value={newvalue.classId}
                    onChange={(e) => handleChange("classId", e.target.value)}
                  />
                </div>
                <div className="flex-fill">
                  <Label for="courseLvlId">سطح دوره</Label>
                  <Input
                    type="number"
                    id="courseLvlId"
                    value={newvalue.courseLvlId}
                    onChange={(e) =>
                      handleChange("courseLvlId", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="d-flex gap-2">
                <div className="flex-fill">
                  <Label for="teacherId">مدرس</Label>
                  <Input
                    type="number"
                    id="teacherId"
                    value={newvalue.teacherId}
                    onChange={(e) => handleChange("teacherId", e.target.value)}
                  />
                </div>
                <div className="flex-fill">
                  <Label for="coursePrerequisiteId">پیش نیاز</Label>
                  <Input
                    type="number"
                    id="coursePrerequisiteId"
                    value={newvalue.coursePrerequisiteId}
                    onChange={(e) =>
                      handleChange("coursePrerequisiteId", e.target.value)
                    }
                  />
                </div>
              </div>

              <div>
                <Label for="uniqeUrlString">لینک یکتا</Label>
                <Input
                  id="uniqeUrlString"
                  value={newvalue.uniqeUrlString}
                  onChange={(e) =>
                    handleChange("uniqeUrlString", e.target.value)
                  }
                />
              </div>

              <div>
                <Label for="shortLink">لینک کوتاه</Label>
                <Input
                  id="shortLink"
                  value={newvalue.shortLink}
                  onChange={(e) => handleChange("shortLink", e.target.value)}
                />
              </div>

              <div>
                <Label for="googleTitle">گوگل تایتل</Label>
                <Input
                  id="googleTitle"
                  value={newvalue.googleTitle}
                  onChange={(e) => handleChange("googleTitle", e.target.value)}
                />
              </div>

              <div>
                <Label for="googleSchema">گوگل اسکیما</Label>
                <Input
                  type="textarea"
                  id="googleSchema"
                  rows="3"
                  value={newvalue.googleSchema}
                  onChange={(e) => handleChange("googleSchema", e.target.value)}
                />
              </div>

              <div>
                <Label for="tumbImageAddress">آدرس تصویر کوچک</Label>
                <Input
                  id="tumbImageAddress"
                  value={newvalue.tumbImageAddress}
                  onChange={(e) =>
                    handleChange("tumbImageAddress", e.target.value)
                  }
                />
              </div>

              <div>
                <Label for="imageAddress">آدرس تصویر</Label>
                <Input
                  id="imageAddress"
                  value={newvalue.imageAddress}
                  onChange={(e) => handleChange("imageAddress", e.target.value)}
                />
              </div>

              <div>
                <Label for="image">تصویر جدید</Label>
                <Input
                  type="file"
                  id="image"
                  onChange={(e) => handleChange("image", e.target.files[0])}
                />
              </div>

              <div className="d-flex gap-2">
                <div className="flex-fill">
                  <Label for="startTime">شروع دوره</Label>
                  <Input
                    type="datetime-local"
                    id="startTime"
                    value={newvalue.startTime}
                    onChange={(e) => handleChange("startTime", e.target.value)}
                  />
                </div>
                <div className="flex-fill">
                  <Label for="endTime">پایان دوره</Label>
                  <Input
                    type="datetime-local"
                    id="endTime"
                    value={newvalue.endTime}
                    onChange={(e) => handleChange("endTime", e.target.value)}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="t-flex t-flex-row t-justify-between t-text-[14px] t-p-8 t-w-[100%] t-mx-auto t-border t-border-red-800">
              <div className="t-flex t-flex-col t-gap-2">
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">موجودی:</div>
                  <div>{getcourse1.capacity}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">قیمت:</div>
                  <div>{getcourse1.cost}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">تعداد کامنت:</div>
                  <div>{getcourse1.courseCommentTotal}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">تعداد گروه:</div>
                  <div>{getcourse1.courseGroupTotal}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">کد کورس:</div>
                  <div>{getcourse1.courseId}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">کد سطح دوره:</div>
                  <div>{getcourse1.courseLvlId}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">وضعیت دوره:</div>
                  <div>{getcourse1.courseStatusName}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">حذف شده:</div>
                  <div>{getcourse1.isDelete ? "بله" : "خیر"}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">تعداد لایک:</div>
                  <div>{getcourse1.likeCount}</div>
                </div>
              </div>

              <div className="t-flex t-flex-col t-gap-2">
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">لایک کاربر فعلی:</div>
                  <div>{getcourse1.currentUserLike}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">توضیحات:</div>
                  <div>{getcourse1.describe}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">توضیح کوتاه:</div>
                  <div>{getcourse1.miniDescribe}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">تعداد دیسلایک:</div>
                  <div>{getcourse1.dissLikeCount}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">شروع دوره:</div>
                  <div>{getcourse1.startTime}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">پایان دوره:</div>
                  <div>{getcourse1.endTime}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">کد وضعیت:</div>
                  <div>{getcourse1.statusId}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">نام وضعیت:</div>
                  <div>{getcourse1.statusName}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">نام مدرس:</div>
                  <div>{getcourse1.teacherName}</div>
                </div>
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">امتیاز دوره:</div>
                  <div>{getcourse1.courseRate}</div>
                </div>
              </div>
            </div>
          )}

          <div className="d-flex justify-content-center pt-2">
            {showedit && (
              <Button
                className="ms-1 bg-success t-text-white"
                color="success"
                onClick={handleSubmit}>
                ارسال
              </Button>
            )}

            <Button
              onClick={() => setshowedit(!showedit)}
              className="ms-1"
              color="primary">
              {showedit ? "انصراف" : "اصلاح"}
            </Button>

            {!showedit && (
              <>
                <Button color="danger" outline className="ms-1">
                  حذف
                </Button>

                {getcourse1.isActive ? (
                  <Button
                    onClick={ActiveOrDeactive}
                    color="success"
                    className="ms-1 bg-success t-text-white ">
                    فعال
                  </Button>
                ) : (
                  <Button
                    onClick={ActiveOrDeactive}
                    color="danger"
                    className="ms-1 bg-danger t-text-white">
                    غیر فعال
                  </Button>
                )}
              </>
            )}
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ShowingMoreOfcourseinfo;
