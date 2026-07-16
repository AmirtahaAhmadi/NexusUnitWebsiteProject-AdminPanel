// ** React Imports
import { useEffect, useState, Fragment } from "react";

// ** Table Columns
import { columns } from "./columns";

import {
  getSocialGroups,
  getCoursesWithPagination,
} from "../../core/Interceptor/Services/SocialGroup/get";
import { createSocialGroup } from "../../core/Interceptor/Services/SocialGroup/post";

// ** Reactstrap Imports
import {
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
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { useForm, Controller } from "react-hook-form";
import { ChevronDown } from "react-feather";
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
    <Row className="text-nowrap w-100 my-75 g-0 social-group-header">
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
            <label className="mb-0" htmlFor="search-social-group">
              جستجو:
            </label>
            <Input
              type="text"
              value={searchTerm}
              id="search-social-group"
              className="ms-50 w-100"
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
          <Button
            className="add-social-group mt-sm-0 mt-1"
            color="primary"
            onClick={() => setShow(true)}
          >
            افزودن گروه اجتماعی
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
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      courseId: "",
      groupName: "",
      groupLink: "",
    },
  });

  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [allSocialGroups, setAllSocialGroups] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCourseId = (course) => course?.courseId ?? course?.id;

  const getCourseName = (course) =>
    course?.title ||
    course?.courseName ||
    course?.name ||
    course?.courseTitle ||
    `کورس #${getCourseId(course)}`;

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

  const fetchSocialGroups = async () => {
    setLoading(true);

    try {
      const response = await getSocialGroups();
      const extracted = extractArray(response.data);
      console.log("دیتای گروه‌های اجتماعی", response.data);
      setAllSocialGroups(extracted);
    } catch (error) {
      console.error("خطا در دریافت لیست گروه‌های اجتماعی:", error);
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
      setAllCourses(extractArray(response.data));
    } catch (error) {
      console.error("خطا در دریافت لیست کورس‌ها:", error);
    }
  };

  useEffect(() => {
    fetchSocialGroups();
    fetchCourses();
  }, []);

  const filteredSocialGroups = allSocialGroups.filter(
    (d) =>
      (d.course?.title || d.courseName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (d.groupName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.groupLink || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const total = filteredSocialGroups.length;

  const data = filteredSocialGroups.slice(
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

  const handleModalClosed = () => {
    reset();
  };

  const onSubmit = async (formValues) => {
    try {
      const body = {
        courseId: formValues.courseId,
        groupName: formValues.groupName,
        groupLink: formValues.groupLink,
      };

      await createSocialGroup(body);

      await fetchSocialGroups();

      setShow(false);
      reset();

      Swal.fire({
        title: "ایجاد شد!",
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

  const handleDiscard = () => {
    reset();
    setShow(false);
  };

  const renderForm = () => {
    return (
      <Row tag={Form} onSubmit={handleSubmit(onSubmit)}>
        <Col xs={12}>
          <Label className="form-label" for="course-id">
            کورس
          </Label>
          <Controller
            control={control}
            name="courseId"
            rules={{ required: true }}
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
          <Label className="form-label" for="group-name">
            نام گروه
          </Label>
          <Controller
            control={control}
            name="groupName"
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                type="text"
                id="group-name"
                invalid={errors.groupName && true}
                {...field}
              />
            )}
          />
          {errors && errors.groupName && (
            <FormFeedback>لطفاً نام گروه را وارد کنید</FormFeedback>
          )}
        </Col>
        <Col xs={12} className="mt-1">
          <Label className="form-label" for="group-link">
            لینک گروه
          </Label>
          <Controller
            control={control}
            name="groupLink"
            rules={{ required: true }}
            render={({ field }) => (
              <Input
                type="text"
                id="group-link"
                placeholder="https://t.me/..."
                invalid={errors.groupLink && true}
                {...field}
              />
            )}
          />
          {errors && errors.groupLink && (
            <FormFeedback>لطفاً لینک گروه را وارد کنید</FormFeedback>
          )}
        </Col>
        <Col xs={12} className="text-center mt-2">
          <Button className="me-1" color="primary">
            ایجاد گروه اجتماعی
          </Button>
          <Button outline type="reset" onClick={handleDiscard}>
            انصراف
          </Button>
        </Col>
      </Row>
    );
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
          columns={columns}
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
        <ModalBody className="px-sm-5 pb-5">
          <div className="text-center mb-2">
            <h1 className="mb-1">افزودن گروه اجتماعی جدید</h1>
            <p>گروه‌های اجتماعی مرتبط با هر کورس را ایجاد کنید.</p>
          </div>

          {renderForm()}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default Table;