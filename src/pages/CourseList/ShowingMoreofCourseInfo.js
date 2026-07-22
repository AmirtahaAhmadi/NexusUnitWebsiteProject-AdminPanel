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
import { EditCourse } from "../../core/Interceptor/Courses/EditCourse";
import { CreateCourseLevelCall } from "../../core/Interceptor/Courses/CreateCourseLevelCall";
import { getCourseCreateDataCall } from "../../core/Interceptor/Courses/getCreateStep1Call";
import axios from "axios";
import Select, { components } from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import AsyncSelect from "react-select/async";
import { globalformData } from "../../redux/zustan/formdata";

const ShowingMoreOfcourseinfo = ({ array }) => {
  const [show, setShow] = useState(false);
  const [showedit, setshowedit] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [array1, setarray1] = useState();
  const [getcourse1, setgetcoursebyid] = useState({});
  const [getChoosingData, setgetChoosingData] = useState([]);

  const getChoose = async () => {
    const res = await getCourseCreateDataCall();
    console.log("res for choosing", res);
    setgetChoosingData(res);
  };

  useEffect(() => {
    getChoose();
  }, []);

  const [newvalue, setnewvalue] = useState({
    courseId: array1,
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
    courseTypeId: "1234",
    tremId: "",
    classId: "",
    courseLvlId: "",
    teacherId: "",
    teacherName: "",
    courseStatusId: "",
  });

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

  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: newvalue.Title,
    description: newvalue.describe,
    instructor: {
      "@type": "Person",
      name: newvalue.teacherName,
    },
  };

  useEffect(() => {
    console.log("newValue", newvalue);
  }, [newvalue]);

  const run = async () => {
    if (!array) return;

    const getbyid = await getcoursebyidAdminTeacherCall(array);
    if (getbyid) {
      console.log("getbyid", getbyid);
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
        teacherName: getbyid?.teacherName || "",
      });
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    console.log("this for array", array);
    setarray1(array);
  }, [array]);

  useEffect(() => {
    run();
  }, [array1, refresh]);

  const handleChange = (el, value) => {
    setnewvalue((prev) => ({
      ...prev,
      [el]: value,
    }));
  };

  const handleSubmit = async () => {
    setnewvalue((pre) => ({
      ...pre,
      googleSchema: schema,
    }));

    try {
      await EditCourse(newvalue);

      toast.success("تغییرات اعمال شد");
      setshowedit(false);
      setrefresh((pre) => !pre);
    } catch (error) {
      console.log(error);
      toast.error("خطا ");
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
        toast.success("تغییرات  اعمال شد");
        setrefresh((prev) => !prev);
      }
    } catch (error) {
      console.error("this an error", error);
      toast.error("خظا");
    }
  };

  useEffect(() => {
    console.log("newvalue", newvalue);
  }, [newvalue]);
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
                    placeholder="انتخاب "
                    value={statusOptions.find(
                      (option) => option.value === newvalue.courseStatusId,
                    )}
                    onChange={(selectedOption) => {
                      handleChange("courseStatusId", selectedOption.value);
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
                      handleChange("tremId", selectedOption.value);
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
                      if (!selectedOption) {
                        toast.error("حتما انتخاب کنید");
                        handleChange("classId", "");
                        return;
                      }

                      handleChange("classId", selectedOption.value);
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
                      if (!selectedOption) {
                        toast.error("حتما انتخاب کنید");
                        handleChange("courseLvlId", "");
                        return;
                      }

                      handleChange("courseLvlId", selectedOption.value);
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
                      if (!selectedOption) {
                        toast.error("حتما انتخاب کنید");
                        handleChange("courseLvlId", "");
                        return;
                      }

                      handleChange("courseLvlId", selectedOption.value);
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
                      if (!selectedOption) {
                        toast.error("حتما انتخاب کنید");
                        handleChange("teacherId", "");
                        return;
                      }
                      // const selected = selectedOption.value.find(
                      //   (op) => op.value === teacherOptions.value,
                      // );
                      console.log("selected", selected);
                      handleChange("teacherId", selectedOption.value);
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
                      if (!selectedOption) {
                        toast.error("حتما انتخاب کنید");
                        handleChange("coursePrerequisiteId", "");
                        return;
                      }

                      handleChange(
                        "coursePrerequisiteId",
                        selectedOption.value,
                      );
                    }}
                  />
                </div>
              </div>

              <div>
                <Label for="uniqeUrlString">ادرس خلص</Label>
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
            <SingleCourseDetail getcourse1={getcourse1} />
          )}

          <div className="d-flex justify-content-center pt-2">
            {showedit && (
              <Button
                className="ms-1 bg-success t-text-white"
                color="success"
                onClick={() => {
                  handleSubmit();
                }}>
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
