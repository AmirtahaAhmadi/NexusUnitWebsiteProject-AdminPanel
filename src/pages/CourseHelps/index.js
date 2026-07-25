// ** React Imports
import { useEffect, useState, Fragment } from "react";

// ** Table Columns
import { columns } from "./columns";

import {
  getCourseAssistances,
  getCoursesWithPagination,
  getTeachers,
} from "../../core/Interceptor/Services/CourseHelps/get";
import {
  createCourseAssistance,
  updateCourseAssistance,
} from "../../core/Interceptor/Services/CourseHelps/post";

// ** Reactstrap Imports
import {
  Alert,
  Row,
  Col,
  Label,
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormFeedback,
} from "reactstrap";

// ** Third party Components
import classnames from "classnames";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { useForm, Controller } from "react-hook-form";
import { ChevronDown, Edit } from "react-feather";
import Swal from "sweetalert2";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";

const CustomHeader = ({
  setShow,
  searchTerm,
  rowsPerPage,
  handlePerPage,
  handleFilter,
}) => {
  return (
    <Row className="text-nowrap w-100 my-75 g-0 course-assistance-header">
      <Col xs={12} lg={4} className="d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-center justify-content-lg-start">
          <label htmlFor="rows-per-page">نمایش</label>
          <Input
            className="mx-50"
            type="select"
            id="rows-per-page"
            value={rowsPerPage}
            onChange={handlePerPage}
            style={{ width: "5rem" }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Input>
          <label htmlFor="rows-per-page">ردیف</label>
        </div>
      </Col>
      <Col xs={12} lg={8}>
        <div className="d-flex align-items-center justify-content-lg-end justify-content-start flex-md-nowrap flex-wrap mt-lg-0 mt-1">
          <div className="d-flex align-items-center me-1">
            <label className="mb-0" htmlFor="search-course-assistance">
              جستجو:
            </label>
            <Input
              type="text"
              value={searchTerm}
              id="search-course-assistance"
              className="ms-50 w-100"
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
          <Button
            className="add-course-assistance mt-sm-0 mt-1"
            color="primary"
            onClick={() => setShow(true)}
          >
            افزودن دستیار کورس
          </Button>
        </div>
      </Col>
    </Row>
  );
};

const Table = () => {
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseId: "",
      userId: "",
    },
  });

  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [allCourseAssistances, setAllCourseAssistances] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const getCourseId = (course) => course?.courseId ?? course?.id;

  const getCourseName = (course) =>
    course?.title ||
    course?.courseName ||
    course?.name ||
    course?.courseTitle ||
    `کورس #${getCourseId(course)}`;

  const getTeacherId = (teacher) => teacher?.teacherId ?? teacher?.id;

  const getTeacherName = (teacher) =>
    teacher?.fullName ||
    teacher?.name ||
    teacher?.teacherName ||
    `استاد #${getTeacherId(teacher)}`;

  const extractArray = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.courseFilterDtos)) return payload.courseFilterDtos;
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.data?.data)) return payload.data.data;
    if (Array.isArray(payload?.data?.courseFilterDtos)) return payload.data.courseFilterDtos;
    return (
      payload?.items ||
      payload?.result ||
      payload?.list ||
      payload?.data?.items ||
      payload?.data?.result ||
      payload?.data?.list ||
      []
    );
  };

  const fetchCourseAssistances = async () => {
    setLoading(true);

    try {
      const response = await getCourseAssistances();
      const extracted = extractArray(response.data);
      setAllCourseAssistances(extracted);
    } catch (error) {
      console.error("خطا در دریافت لیست دستیاران کورس:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await getCoursesWithPagination({
        RowsOfPage: 1000,
        PageNumber: 1,
      });
      console.log("دیتای کورس‌ها", response.data);
      setAllCourses(extractArray(response.data));
    } catch (error) {
      console.error("خطا در دریافت لیست کورس‌ها:", error);
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await getTeachers();
      console.log("دیتای اساتید", response.data);
      setAllTeachers(extractArray(response.data));
    } catch (error) {
      console.error("خطا در دریافت لیست اساتید:", error);
    }
  };

  useEffect(() => {
    fetchCourseAssistances();
    fetchCourses();
    fetchTeachers();
  }, []);

  const filteredCourseAssistances = allCourseAssistances.filter(
    (d) =>
      (d.courseName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.assistanceName || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const total = filteredCourseAssistances.length;

  const data = filteredCourseAssistances.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handlePerPage = (e) => {
    const value = parseInt(e.currentTarget.value);
    setRowsPerPage(value);
    setCurrentPage(1);
  };

  const handleFilter = (val) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const CustomPagination = () => {
    const count = Number(Math.ceil(total / rowsPerPage));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={count || 1}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  const handleEditClick = (row) => {
    setSelected(row);
    setValue("courseId", row.courseId);
    setValue("userId", row.userId);
    setShow(true);
  };

  const handleModalClosed = () => {
    setSelected(null);
    reset();
  };

  const onSubmit = async (formValues) => {
    try {
      const body = {
        courseId: formValues.courseId,
        userId: Number(formValues.userId),
      };

      if (selected) {
        body.id = selected.id;
        await updateCourseAssistance(body);
      } else {
        await createCourseAssistance(body);
      }

      await fetchCourseAssistances();

      setShow(false);
      reset();

      Swal.fire({
        title: selected ? "ویرایش شد!" : "ایجاد شد!",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      console.log("جزئیات خطای سرور:", error?.response?.data);

      Swal.fire({
        title: "خطا!",
        icon: "error",
        draggable: true,
      });
    }
  };

  const updatedColumns = [
    ...columns,
    {
      name: "عملیات",
      cell: (row) => {
        return (
          <div className="d-flex align-items-center course-assistance-actions">
            <Button
              size="sm"
              color="transparent"
              className="btn btn-icon"
              onClick={() => handleEditClick(row)}
            >
              <Edit className="font-medium-2" />
            </Button>
          </div>
        );
      },
    },
  ];

  const handleDiscard = () => {
    reset();
    setShow(false);
  };

  const renderModalSubtitle = () => {
    if (selected !== null) {
      return "دستیار کورس را مطابق نیاز خود ویرایش کنید.";
    } else {
      return "دستیارانی که می‌توانید برای هر کورس تعریف و به اساتید اختصاص دهید.";
    }
  };

  const renderForm = () => {
    if (selected === null) {
      return (
        <Row tag={Form} onSubmit={handleSubmit(onSubmit)}>
          <Col xs={12}>
            <Label className="form-label" for="course-id">
              کورس
            </Label>
            <Controller
              control={control}
              name="courseId"
              render={({ field }) => (
                <Input
                  type="select"
                  invalid={errors.courseId && true}
                  {...field}
                >
                  <option value="">انتخاب کنید</option>
                  {allCourses.map((course, idx) => (
                    <option
                      key={getCourseId(course) ?? `course-${idx}`}
                      value={getCourseId(course) ?? ""}
                    >
                      {getCourseName(course)}
                    </option>
                  ))}
                </Input>
              )}
            />
            {errors && errors.courseId && (
              <FormFeedback>لطفاً یک کورس معتبر انتخاب کنید</FormFeedback>
            )}
          </Col>
          <Col xs={12} className="mt-1">
            <Label className="form-label" for="user-id">
              دستیار (استاد)
            </Label>
            <Controller
              control={control}
              name="userId"
              render={({ field }) => (
                <Input
                  type="select"
                  invalid={errors.userId && true}
                  {...field}
                >
                  <option value="">انتخاب کنید</option>
                  {allTeachers.map((teacher) => (
                    <option key={getTeacherId(teacher)} value={getTeacherId(teacher)}>
                      {getTeacherName(teacher)}
                    </option>
                  ))}
                </Input>
              )}
            />
            {errors && errors.userId && (
              <FormFeedback>لطفاً یک دستیار معتبر انتخاب کنید</FormFeedback>
            )}
          </Col>
          <Col xs={12} className="text-center mt-2">
            <Button className="me-1" color="primary">
              ایجاد دستیار کورس
            </Button>
            <Button outline type="reset" onClick={handleDiscard}>
              انصراف
            </Button>
          </Col>
        </Row>
      );
    } else {
      return (
        <Fragment>
          <Alert color="warning">
            <h6 className="alert-heading">هشدار!</h6>
            <div className="alert-body">
              با ویرایش دستیار کورس، ممکن است عملکرد سیستم دچار مشکل شود.
              لطفاً پیش از ادامه، کاملاً از این کار مطمئن باشید.
            </div>
          </Alert>
          <Row tag={Form} onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12} sm={9}>
              <Label className="form-label" for="course-id">
                کورس
              </Label>
              <Controller
                control={control}
                name="courseId"
                render={({ field }) => (
                  <Input
                    type="select"
                    invalid={errors.courseId && true}
                    {...field}
                  >
                    <option value="">انتخاب کنید</option>
                    {allCourses.map((course, idx) => (
                      <option
                        key={getCourseId(course) ?? `course-${idx}`}
                        value={getCourseId(course) ?? ""}
                      >
                        {getCourseName(course)}
                      </option>
                    ))}
                  </Input>
                )}
              />
              {errors && errors.courseId && (
                <FormFeedback>لطفاً یک کورس معتبر انتخاب کنید</FormFeedback>
              )}
            </Col>
            <Col xs={12} sm={3} className="p-sm-0">
              <Button className="mt-2" color="primary">
                به‌روزرسانی
              </Button>
            </Col>
            <Col xs={12} className="mt-1">
              <Label className="form-label" for="user-id">
                دستیار (استاد)
              </Label>
              <Controller
                control={control}
                name="userId"
                render={({ field }) => (
                  <Input
                    type="select"
                    invalid={errors.userId && true}
                    {...field}
                  >
                    <option value="">انتخاب کنید</option>
                    {allTeachers.map((teacher) => (
                      <option key={getTeacherId(teacher)} value={getTeacherId(teacher)}>
                        {getTeacherName(teacher)}
                      </option>
                    ))}
                  </Input>
                )}
              />
              {errors && errors.userId && (
                <FormFeedback>لطفاً یک دستیار معتبر انتخاب کنید</FormFeedback>
              )}
            </Col>
          </Row>
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      <div className="react-dataTable">
        <DataTable
          noHeader
          pagination
          subHeader
          responsive
          paginationServer
          columns={updatedColumns}
          sortIcon={<ChevronDown />}
          className="react-dataTable"
          progressPending={loading}
          paginationComponent={CustomPagination}
          data={data}
          subHeaderComponent={
            <CustomHeader
              setShow={setShow}
              searchTerm={searchTerm}
              rowsPerPage={rowsPerPage}
              handleFilter={handleFilter}
              handlePerPage={handlePerPage}
            />
          }
        />
      </div>
      <Modal
        isOpen={show}
        onClosed={handleModalClosed}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody
          className={classnames({
            "p-3 pt-0": selected !== null,
            "px-sm-5 pb-5": selected === null,
          })}
        >
          <div className="text-center mb-2">
            <h1 className="mb-1">
              {selected !== null
                ? "ویرایش دستیار کورس"
                : "افزودن دستیار کورس جدید"}
            </h1>
            <p>{renderModalSubtitle()}</p>
          </div>

          {renderForm()}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default Table;