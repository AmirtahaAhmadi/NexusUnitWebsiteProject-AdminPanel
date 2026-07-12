// ** React Imports
import { Fragment, useState, useEffect } from "react";

// ** Third Party Components
import toast from "react-hot-toast";
import { X } from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useForm, Controller } from "react-hook-form";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/colors/teal.css";

// ** Reactstrap Imports
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Input,
  Form,
} from "reactstrap";

// ** Utils
import { isObjEmpty } from "@utils";

// ** Real API Services
import { addSchedualSingle } from "../../../core/Interceptor/Services/CalenderPageServieces/post";
import { lockToRiase } from "../../../core/Interceptor/Services/CalenderPageServieces/put";
import {
  getCourseGroups,
  getTeachers,
  getCoursesWithPagination,
} from "../../../core/Interceptor/Services/CalenderPageServieces/ger";
const AddEventSidebar = (props) => {
  // ** Props
  const {
    open,
    selectedEvent,
    selectEvent,
    refetchEvents,
    currentCurseId,
    handleAddEventSidebar,
  } = props;
  const isEditMode = !isObjEmpty(selectedEvent) && !!selectedEvent.id;

  // ** Vars & Hooks
  const {
    control,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseGroupId: "",
      startDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      weekNumber: 1,
      rowEffect: 1,
    },
  });
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseGroups, setCourseGroups] = useState([]);

  const [teacherId, setTeacherId] = useState("");
  const [courseId, setCourseId] = useState("");

  const [activeLock, setActiveLock] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const teachersRes = await getTeachers();
        console.log("Teachers =>", teachersRes.data);

        setTeachers(teachersRes.data);

        const coursesRes = await getCoursesWithPagination({
          RowsOfPage: 100,
          PageNumber: 1,
        });

        console.log("Courses =>", coursesRes.data);

        setCourses(coursesRes.data.courseFilterDtos);
      } catch (e) {
        console.log("loadData Error =>", e);
        toast.error("خطا در دریافت اطلاعات");
      }
    };

    loadData();
  }, []);
  useEffect(() => {
    if (isEditMode) {
      setActiveLock(!!selectedEvent.extendedProps?.active);
    }
  }, [selectedEvent, isEditMode]);
  useEffect(() => {
    if (!teacherId || !courseId) return;

    const loadCourseGroups = async () => {
      try {
        const res = await getCourseGroups({
          CourseId: courseId,
          TeacherId: teacherId,
        });

        setCourseGroups(res.data.data || res.data);
      } catch (err) {
        toast.error("خطا در دریافت گروه‌های دوره");
      }
    };

    loadCourseGroups();
  }, [teacherId, courseId]);
  const handleResetInputValues = () => {
    selectEvent({});
    reset({
      courseGroupId: "",
      startDate: new Date(),
      startTime: "09:00",
      endTime: "10:00",
      weekNumber: 1,
      rowEffect: 1,
    });
    setActiveLock(false);
  };

  const onSubmitAdd = async (data) => {
    const gregorianDate = data.startDate?.toDate
      ? data.startDate.toDate()
      : new Date(data.startDate);

    const payload = {
      courseGroupId: data.courseGroupId,
      startDate: gregorianDate.toISOString(),
      startTime: data.startTime,
      endTime: data.endTime,
      weekNumber: Number(data.weekNumber),
      rowEffect: Number(data.rowEffect),
    };

    setSubmitting(true);
    try {
      await addSchedualSingle(currentCurseId, payload);
      toast.success("جلسه اضافه شد");
      refetchEvents();
      handleAddEventSidebar();
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message || error?.response?.data?.error;

      if (error?.response?.status === 409) {
        toast.error(
          serverMessage ||
            "این جلسه با یک جلسه‌ی موجود تداخل دارد (زمان/گروه تکراری است)",
        );
      } else {
        toast.error(serverMessage || "خطا در افزودن جلسه");
      }

      console.error("AddSchedualSingle error:", error?.response?.data || error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleLock = async (checked) => {
    setActiveLock(checked);
    setSubmitting(true);
    try {
      await lockToRiase(checked, selectedEvent.id);
      toast.success(checked ? "حضور و غیاب قفل شد" : "حضور و غیاب باز شد");
      refetchEvents();
    } catch (error) {
      setActiveLock(!checked);
      toast.error("خطا در تغییر وضعیت قفل");
    } finally {
      setSubmitting(false);
    }
  };

  const CloseBtn = (
    <X className="cursor-pointer" size={15} onClick={handleAddEventSidebar} />
  );

  return (
    <Modal
      isOpen={open}
      className="sidebar-lg"
      toggle={handleAddEventSidebar}
      onClosed={handleResetInputValues}
      contentClassName="p-0 overflow-hidden"
      modalClassName="modal-slide-in event-sidebar"
    >
      <ModalHeader
        className="mb-1"
        toggle={handleAddEventSidebar}
        close={CloseBtn}
        tag="div"
      >
        <h5 className="modal-title">
          {isEditMode ? "جزئیات جلسه" : "افزودن جلسه"}
        </h5>
      </ModalHeader>
      <PerfectScrollbar options={{ wheelPropagation: false }}>
        <ModalBody className="flex-grow-1 pb-sm-0 pb-3">
          {isEditMode ? (
            <Fragment>
              <div className="mb-1">
                <Label className="form-label">عنوان</Label>
                <Input readOnly value={selectedEvent.title || ""} />
              </div>

              <div className="mb-1">
                <Label className="form-label">شروع</Label>
                <Input
                  readOnly
                  value={
                    selectedEvent.start
                      ? new Date(selectedEvent.start).toLocaleString("fa-IR")
                      : ""
                  }
                />
              </div>

              <div className="mb-1">
                <Label className="form-label">پایان</Label>
                <Input
                  readOnly
                  value={
                    selectedEvent.end
                      ? new Date(selectedEvent.end).toLocaleString("fa-IR")
                      : ""
                  }
                />
              </div>

              <div className="mb-1">
                <Label className="form-label">شماره هفته</Label>
                <Input
                  readOnly
                  value={selectedEvent.extendedProps?.weekNumber ?? ""}
                />
              </div>

              <div className="form-switch mb-2">
                <Input
                  id="activeLock"
                  type="switch"
                  className="me-1"
                  checked={activeLock}
                  disabled={submitting}
                  onChange={(e) => handleToggleLock(e.target.checked)}
                />
                <Label className="form-label" for="activeLock">
                  قفل حضور و غیاب (غایب نمی‌تواند شرکت کند)
                </Label>
              </div>

              <div className="d-flex mb-1">
                <Button
                  color="secondary"
                  onClick={handleAddEventSidebar}
                  outline
                >
                  بستن
                </Button>
              </div>
            </Fragment>
          ) : (
            <Form onSubmit={handleSubmit(onSubmitAdd)}>
              <div className="mb-1">
                <Label>مدرس</Label>
                <Input
                  type="select"
                  value={teacherId}
                  onChange={(e) => {
                    setTeacherId(e.target.value);
                    setCourseId("");
                    setCourseGroups([]);
                  }}
                >
                  <option value="">انتخاب مدرس</option>

                  {teachers.map((teacher) => (
                    <option key={teacher.teacherId} value={teacher.teacherId}>
                      {teacher.fullName}
                    </option>
                  ))}
                </Input>
              </div>

              <div className="mb-1">
                <Label>دوره</Label>
                <Input
                  type="select"
                  value={courseId}
                  disabled={!teacherId}
                  onChange={(e) => {
                    setCourseId(e.target.value);
                    setCourseGroups([]);
                  }}
                >
                  <option value="">انتخاب دوره</option>

                  {courses
                    .filter((course) => course.teacherId == teacherId)
                    .map((course) => (
                      <option key={course.courseId} value={course.courseId}>
                        {course.title}
                      </option>
                    ))}
                </Input>
              </div>

              <div className="mb-1">
                <Label className="form-label" for="courseGroupId">
                  گروه دوره <span className="text-danger">*</span>
                </Label>

                <Controller
                  name="courseGroupId"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Input
                      type="select"
                      id="courseGroupId"
                      invalid={!!errors.courseGroupId}
                      {...field}
                    >
                      <option value="">انتخاب گروه دوره</option>

                      {courseGroups.map((group) => (
                        <option
                          key={group.courseGroupId || group.id}
                          value={group.courseGroupId || group.id}
                        >
                          {group.groupName ||
                            group.title ||
                            `گروه ${group.courseGroupId || group.id}`}
                        </option>
                      ))}
                    </Input>
                  )}
                />
              </div>

              <div className="mb-1">
                <Label className="form-label" for="startDate">
                  تاریخ جلسه <span className="text-danger">*</span>
                </Label>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <DatePicker
                      id="startDate"
                      value={field.value}
                      onChange={(date) => field.onChange(date)}
                      calendar={persian}
                      locale={persian_fa}
                      calendarPosition="bottom-right"
                      inputClass={`form-control w-100 ${
                        errors.startDate ? "is-invalid" : ""
                      }`}
                      containerStyle={{ width: "100%" }}
                    />
                  )}
                />
              </div>

              <div className="mb-1">
                <Label className="form-label" for="startTime">
                  ساعت شروع
                </Label>
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field }) => (
                    <Input id="startTime" type="time" {...field} />
                  )}
                />
              </div>

              <div className="mb-1">
                <Label className="form-label" for="endTime">
                  ساعت پایان
                </Label>
                <Controller
                  name="endTime"
                  control={control}
                  render={({ field }) => (
                    <Input id="endTime" type="time" {...field} />
                  )}
                />
              </div>

              <div className="mb-1">
                <Label className="form-label" for="weekNumber">
                  شماره هفته
                </Label>
                <Controller
                  name="weekNumber"
                  control={control}
                  render={({ field }) => (
                    <Input id="weekNumber" type="number" min={1} {...field} />
                  )}
                />
              </div>

              <div className="mb-1">
                <Label className="form-label" for="rowEffect">
                  تعداد ردیف تأثیرپذیر
                </Label>
                <Controller
                  name="rowEffect"
                  control={control}
                  render={({ field }) => (
                    <Input id="rowEffect" type="number" min={1} {...field} />
                  )}
                />
              </div>

              <div className="d-flex mb-1">
                <Button
                  className="me-1"
                  type="submit"
                  color="primary"
                  disabled={submitting}
                >
                  {submitting ? "در حال افزودن..." : "افزودن"}
                </Button>

                <Button
                  color="secondary"
                  type="reset"
                  outline
                  onClick={handleAddEventSidebar}
                >
                  انصراف
                </Button>
              </div>
            </Form>
          )}
        </ModalBody>
      </PerfectScrollbar>
    </Modal>
  );
};

export default AddEventSidebar;
