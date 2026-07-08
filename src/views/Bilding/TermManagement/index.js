import { useEffect, useState, Fragment } from "react";

import Swal from "sweetalert2";

import { columns } from "./columns";
import {
  getTerms,
  getTermById,
} from "../../../core/Interceptor/Services/TermManagementPageServies/get";
import {
  createTerm,
  addTermCloseDate,
} from "../../../core/Interceptor/Services/TermManagementPageServies/post";
import {
  updateTerm,
  updateTermCloseDate,
} from "../../../core/Interceptor/Services/TermManagementPageServies/put";
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

import classnames from "classnames";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { useForm, Controller } from "react-hook-form";
import { ChevronDown, Edit, X } from "react-feather";

import "@styles/react/libs/tables/react-dataTable-component.scss";
const CustomHeader = ({
  setShow,
  searchTerm,
  rowsPerPage,
  handlePerPage,
  handleFilter,
}) => {
  return (
    <Row className="text-nowrap w-100 my-75 g-0 building-header">
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
            <label className="mb-0" htmlFor="search-building">
              جستجو:
            </label>
            <Input
              type="text"
              value={searchTerm}
              id="search-building"
              className="ms-50 w-100"
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
          <Button
            className="add-building mt-sm-0 mt-1"
            color="primary"
            onClick={() => setShow(true)}
          >
            افزودن ترم
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
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      termName: "",
      departmentId: "",
      startDate: "",
      endDate: "",
    },
  });
  const [allTerms, setAllTerms] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const fetchTerms = async () => {
    setLoading(true);
    try {
      const response = await getTerms();
      setAllTerms(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  const filteredTerms = allTerms.filter((t) =>
    (t.termName || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const total = filteredTerms.length;

  const data = filteredTerms.slice(
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

    setValue("id", row.id);
    setValue("termName", row.termName);
    setValue("departmentId", row.departmentId);
    setValue("startDate", row.startDate?.slice(0, 10));
    setValue("endDate", row.endDate?.slice(0, 10));
    setShow(true);
  };
 

  const handleModalClosed = () => {
    reset();
    setSelected(null);
  };

  const onSubmit = async (formValues) => {
    try {
      const body = {
        id: selected?.id,
        termName: formValues.termName,
        departmentId: formValues.departmentId,
        startDate: formValues.startDate,
        endDate: formValues.endDate,
        expire: selected?.expire ?? false,
      };

      if (selected) {
        await updateTerm(body);
      } else {
        await createTerm(body);
      }

      await fetchTerms();

      Swal.fire({
        title: selected
          ? "ساختمان با موفقیت ویرایش شد."
          : "ساختمان با موفقیت ایجاد شد.",
        icon: "success",
        draggable: true,
        timer: 2000,
        showConfirmButton: false,
      });

      reset();
      setSelected(null);
      setShow(false);
    } catch (error) {
      console.log(error.response?.data);
    }
  };
  const updatedColumns = [
    ...columns,
    {
      name: "عملیات",
      cell: (row) => {
        return (
          <div className="d-flex align-items-center building-actions">
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
    setSelected(null);
    setShow(false);
  };

  const renderModalSubtitle = () => {
    if (selected !== null) {
      return "ساختمان را مطابق نیاز خود ویرایش کنید.";
    } else {
      return "ساختمان‌هایی که می‌توانید تعریف کرده و به کاربران خود اختصاص دهید.";
    }
  };

  const renderForm = () => {
    if (selected === null) {
      return (
        <Row tag={Form} onSubmit={handleSubmit(onSubmit)}>
          <Col xs={12}>
            <Label>نام ترم</Label>
            <Controller
              name="termName"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </Col>

          <Col xs={12} className="mt-1">
            <Label>دپارتمان</Label>
            <Controller
              name="departmentId"
              control={control}
              render={({ field }) => (
                <Input type="select" {...field}>
                  <option value="">انتخاب کنید</option>
                  {departments.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.depName}
                    </option>
                  ))}
                </Input>
              )}
            />
          </Col>

          <Col md={6} className="mt-1">
            <Label>تاریخ شروع</Label>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => <Input type="date" {...field} />}
            />
          </Col>

          <Col md={6} className="mt-1">
            <Label>تاریخ پایان</Label>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => <Input type="date" {...field} />}
            />
          </Col>

          <Col xs={12} className="mt-2">
            <Controller
              name="expire"
              control={control}
              render={({ field }) => (
                <Input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              )}
            />
            <Label className="ms-50">منقضی شده</Label>
          </Col>
          <Col xs={12} className="text-center mt-2">
            <Button type="submit" className="me-1" color="primary">
              افزودن ترم
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
              با ویرایش نام ساختمان، ممکن است عملکرد سیستم ساختمان‌ها دچار مشکل
              شود. لطفاً پیش از ادامه، کاملاً از این کار مطمئن باشید.
            </div>
          </Alert>
          <Row tag={Form} onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12}>
              <Label>نام ترم</Label>

              <Controller
                name="termName"
                control={control}
                render={({ field }) => <Input {...field} />}
              />
            </Col>

            <Col xs={12} className="mt-1">
              <Label>دپارتمان</Label>

              <Controller
                name="departmentId"
                control={control}
                render={({ field }) => (
                  <Input type="select" {...field}>
                    <option value="">انتخاب کنید</option>

                    {departments.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.depName}
                      </option>
                    ))}
                  </Input>
                )}
              />
            </Col>

            <Col md={6}>
              <Label>تاریخ شروع</Label>

              <Controller
                name="startDate"
                control={control}
                render={({ field }) => <Input type="date" {...field} />}
              />
            </Col>

            <Col md={6}>
              <Label>تاریخ پایان</Label>

              <Controller
                name="endDate"
                control={control}
                render={({ field }) => <Input type="date" {...field} />}
              />
            </Col>

            <Col xs={12} className="mt-2">
              <Controller
                name="expire"
                control={control}
                render={({ field }) => (
                  <Input
                    type="checkbox"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                  />
                )}
              />

              <Label className="ms-50">منقضی شده</Label>
            </Col>

            <Col xs={12} className="text-center mt-2">
              <Button color="primary">بروزرسانی</Button>
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
              {selected !== null ? "  ویرایش ترم" : "افزودن ترم جدید"}
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
