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
import { SingleCourseDetail } from "./singleCourseDetail";

// ** Third Party Components
import toast from "react-hot-toast";
import { ActiveDeactiveCourse } from "../../core/Interceptor/Courses/ActiveDeactiveCourse";
import { getCourseCreateDataCall } from "../../core/Interceptor/Courses/getCreateStep1Call";
import Select from "react-select";
import { UpdateCourseCall } from "../../core/Interceptor/Courses/EditCourse";

const ShowingMoreOfcourseinfo = ({ array }) => {
  const [show, setShow] = useState(false);
  const [showedit, setshowedit] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [getcourse1, setgetcoursebyid] = useState({});
  const [getChoosingData, setgetChoosingData] = useState({});

  const [newvalue, setnewvalue] = useState({
    courseId: "",
    title: "",
    miniDescribe: "",
    describe: "",
    uniqeUrlString: "",
    capacity: "",
    sessionNumber: "",
    currentCoursePaymentNumber: "",
    cost: "",
    startTime: "",
    endTime: "",
    coursePrerequisiteId: "",
    googleTitle: "",
    googleSchema: "",
    shortLink: "",
    imageAddress: "",
    tumbImageAddress: "",
    image: null,
    courseTypeId: "",
    tremId: "",
    classId: "",
    courseLvlId: "",
    teacherId: "",
    teacherName: "",
    courseStatusId: "",
  });

  const getChoose = async () => {
    try {
      const res = await getCourseCreateDataCall();
      setgetChoosingData(res || {});
    } catch (error) {
      console.log(error);
      toast.error("خطا در دریافت اطلاعات انتخابی");
    }
  };

  useEffect(() => {
    getChoose();
  }, []);

  const termOptions = (getChoosingData?.termDtos || []).map((item) => ({
    value: item.id,
    label: item.termName,
  }));

  const classOptions = (getChoosingData?.classRoomDtos || []).map((item) => ({
    value: item.id,
    label: item.classRoomName,
  }));

  const courseLevelOptions = (getChoosingData?.courseLevelDtos || []).map(
    (item) => ({
      value: item.id,
      label: item.levelName,
    }),
  );

  const teacherOptions = (getChoosingData?.teachers || []).map((item) => ({
    value: item.teacherId,
    label: item.fullName,
  }));

  const prerequisiteOptions = (getChoosingData?.technologyDtos || []).map(
    (item) => ({
      value: item.id,
      label: item.techName,
    }),
  );

  const statusOptions = (getChoosingData?.statusDtos || []).map((item) => ({
    value: item.id,
    label: item.statusName,
  }));

  const run = async () => {
    if (!array) return;

    try {
      const getbyid = await getcoursebyidAdminTeacherCall(array);

      if (getbyid) {
        setgetcoursebyid(getbyid);

        setnewvalue({
          courseId: getbyid?.courseId || "",
          title: getbyid?.title || "",
          describe: getbyid?.describe || "",
          miniDescribe: getbyid?.miniDescribe || "",
          capacity: getbyid?.capacity || "",
          sessionNumber: getbyid?.sessionNumber || "",
          currentCoursePaymentNumber: getbyid?.currentCoursePaymentNumber || "",
          tremId: getbyid?.tremId || "",
          classId: getbyid?.classId || "",
          courseLvlId: getbyid?.courseLvlId || "",
          teacherId: getbyid?.teacherId || "",
          teacherName: getbyid?.teacherName || "",
          cost: getbyid?.cost || "",
          uniqeUrlString: getbyid?.uniqeUrlString || "",
          image: null,
          startTime: getbyid?.startTime
            ? new Date(getbyid.startTime).toISOString().slice(0, 16)
            : "",
          endTime: getbyid?.endTime
            ? new Date(getbyid.endTime).toISOString().slice(0, 16)
            : "",
          googleSchema: getbyid?.googleSchema || "",
          googleTitle: getbyid?.googleTitle || "",
          coursePrerequisiteId: getbyid?.coursePrerequisiteId || "",
          shortLink: getbyid?.shortLink || "",
          tumbImageAddress: getbyid?.tumbImageAddress || "",
          imageAddress: getbyid?.imageAddress || "",
          courseStatusId: getbyid?.statusId || "",
          courseTypeId: getbyid?.courseTypeId || "",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("خطا در دریافت اطلاعات دوره");
    }
  };

  useEffect(() => {
    run();
  }, [array, refresh]);

  const handleChange = (field, value) => {
    setnewvalue((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const schema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      name: newvalue.title,
      description: newvalue.describe,
      instructor: {
        "@type": "Person",
        name: newvalue.teacherName,
      },
    });

    const payload = {
      Id: newvalue.courseId,
      Title: newvalue.title,
      Describe: newvalue.describe,
      MiniDescribe: newvalue.miniDescribe,
      Capacity: newvalue.capacity,
      CourseTypeId: newvalue.courseTypeId || 1,
      SessionNumber: newvalue.sessionNumber || "0",
      CurrentCoursePaymentNumber: newvalue.currentCoursePaymentNumber || 0,
      TremId: newvalue.tremId || 1,
      ClassId: newvalue.classId || 1,
      CourseLvlId: newvalue.courseLvlId || "",
      TeacherId: newvalue.teacherId || 0,
      Cost: newvalue.cost || 0,
      UniqeUrlString: newvalue.uniqeUrlString || "",
      Image: newvalue.image || "",
      StartTime: newvalue.startTime
        ? new Date(newvalue.startTime).toISOString()
        : "",
      EndTime: newvalue.endTime ? new Date(newvalue.endTime).toISOString() : "",
      GoogleSchema: schema,
      GoogleTitle: newvalue.googleTitle || "",
      CoursePrerequisiteId: newvalue.coursePrerequisiteId || "",
      ShortLink: newvalue.shortLink || "",
      TumbImageAddress: newvalue.tumbImageAddress || "",
      ImageAddress: newvalue.imageAddress || "",
    };

    try {
      await UpdateCourseCall(payload);
      toast.success("تغییرات اعمال شد");
      setshowedit(false);
      setrefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
      toast.error("خطا");
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
        toast.success("تغییرات اعمال شد");
        setrefresh((prev) => !prev);
      }
    } catch (error) {
      console.error(error);
      toast.error("خطا");
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
                  <Label for="courseStatusId">استاتوس</Label>
                  <Select
                    inputId="courseStatusId"
                    options={statusOptions}
                    className="react-select"
                    classNamePrefix="select"
                    placeholder="انتخاب"
                    value={
                      statusOptions.find(
                        (option) => option.value === newvalue.courseStatusId,
                      ) || null
                    }
                    onChange={(selectedOption) => {
                      handleChange(
                        "courseStatusId",
                        selectedOption ? selectedOption.value : "",
                      );
                    }}
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
                  <Label for="currentCoursePaymentNumber">
                    تعداد خریداری شده ها
                  </Label>
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
                  <Select
                    inputId="tremId"
                    options={termOptions}
                    className="react-select"
                    classNamePrefix="select"
                    placeholder="انتخاب ترم"
                    value={
                      termOptions.find(
                        (option) => option.value === newvalue.tremId,
                      ) || null
                    }
                    onChange={(selectedOption) => {
                      handleChange("tremId", selectedOption?.value || "");
                    }}
                  />
                </div>
              </div>

              <div className="d-flex gap-2">
                <div className="flex-fill">
                  <Label for="classId">کلاس</Label>
                  <Select
                    inputId="classId"
                    options={classOptions}
                    className="react-select"
                    classNamePrefix="select"
                    placeholder="انتخاب کلاس"
                    value={
                      classOptions.find(
                        (option) => option.value === newvalue.classId,
                      ) || null
                    }
                    onChange={(selectedOption) => {
                      handleChange("classId", selectedOption?.value || "");
                    }}
                  />
                </div>

                <div className="flex-fill">
                  <Label for="courseLvlId">سطح دوره</Label>
                  <Select
                    inputId="courseLvlId"
                    options={courseLevelOptions}
                    className="react-select"
                    classNamePrefix="select"
                    placeholder="انتخاب سطح دوره"
                    value={
                      courseLevelOptions.find(
                        (option) => option.value === newvalue.courseLvlId,
                      ) || null
                    }
                    onChange={(selectedOption) => {
                      handleChange("courseLvlId", selectedOption?.value || "");
                    }}
                  />
                </div>
              </div>

              <div className="d-flex gap-2">
                <div className="flex-fill">
                  <Label for="teacherId">مدرس</Label>
                  <Select
                    inputId="teacherId"
                    options={teacherOptions}
                    className="react-select"
                    classNamePrefix="select"
                    placeholder="انتخاب مدرس"
                    value={
                      teacherOptions.find(
                        (option) => option.value === newvalue.teacherId,
                      ) || null
                    }
                    onChange={(selectedOption) => {
                      handleChange("teacherId", selectedOption?.value || "");
                      handleChange("teacherName", selectedOption?.label || "");
                    }}
                  />
                </div>

                <div className="flex-fill">
                  <Label for="coursePrerequisiteId">پیش نیاز</Label>
                  <Select
                    inputId="coursePrerequisiteId"
                    options={prerequisiteOptions}
                    className="react-select"
                    classNamePrefix="select"
                    placeholder="انتخاب پیش نیاز"
                    value={
                      prerequisiteOptions.find(
                        (option) =>
                          option.value === newvalue.coursePrerequisiteId,
                      ) || null
                    }
                    onChange={(selectedOption) => {
                      handleChange(
                        "coursePrerequisiteId",
                        selectedOption?.value || "",
                      );
                    }}
                  />
                </div>
              </div>

              <div>
                <Label for="uniqeUrlString">آدرس خلاصه</Label>
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
                  onChange={(e) => handleChange("image", e.target.files?.[0])}
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
            <SingleCourseDetail getcourse1={getcourse1} />
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
