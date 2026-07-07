import { useEffect, useState, Fragment } from "react";

import { columns } from "./columns";

import { getBuildings } from "../../core/Interceptor/Services/BildingPageServices/get";
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
import { ChevronDown, Edit, Trash } from "react-feather";

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
            افزودن ساختمان
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
  } = useForm({ defaultValues: { buildingName: "" } });

  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [allBuildings, setAllBuildings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchBuildings = async () => {
    setLoading(true);
    try {
      const response = await getBuildings();
      setAllBuildings(response.data);
      console.log("دیتای دریافتی",response.data);
      

    } catch (eror) {
      console.error("خطا در دریافت لیست ساختمان‌ها:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  const filteredBuildings = allBuildings.filter((b) =>
    (b.buildingName || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const total = filteredBuildings.length;

  const data = filteredBuildings.slice(
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
    setValue("buildingName", row.buildingName);
    setShow(true);
  };

  const handleModalClosed = () => {
    setSelected(null);
    setValue("buildingName", "");
  };

  const onSubmit = (formValues) => {
    if (formValues.buildingName.length) {
      if (selected !== null) {
      } else {
      }
      setShow(false);
    } else {
      setError("buildingName", {
        type: "manual",
      });
    }
  };

  const handleDeleteClick = (id) => {
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
            <Button
              size="sm"
              color="transparent"
              className="btn btn-icon"
              onClick={() => handleDeleteClick(row.id)}
            >
              <Trash className="font-medium-2" />
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
            <Label className="form-label" for="building-name">
              نام ساختمان
            </Label>
            <Controller
              control={control}
              id="buildingName"
              name="buildingName"
              render={({ field }) => (
                <Input
                  placeholder="نام ساختمان"
                  invalid={errors.buildingName && true}
                  {...field}
                />
              )}
            />
            {errors && errors.buildingName && (
              <FormFeedback>لطفاً یک نام ساختمان معتبر وارد کنید</FormFeedback>
            )}
          </Col>
          <Col xs={12} className="mt-75">
            <div className="form-check">
              <Input type="checkbox" id="core-building-checkbox" />
              <Label className="form-check-label" for="core-building-checkbox">
                تنظیم به عنوان ساختمان اصلی
              </Label>
            </div>
          </Col>
          <Col xs={12} className="text-center mt-2">
            <Button className="me-1" color="primary">
              ایجاد ساختمان
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
            <Col xs={12} sm={9}>
              <Label className="form-label" for="building-name">
                نام ساختمان
              </Label>
              <Controller
                control={control}
                id="buildingName"
                name="buildingName"
                render={({ field }) => (
                  <Input
                    placeholder="نام ساختمان"
                    invalid={errors.buildingName && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.buildingName && (
                <FormFeedback>
                  لطفاً یک نام ساختمان معتبر وارد کنید
                </FormFeedback>
              )}
            </Col>
            <Col xs={12} sm={3} className="p-sm-0">
              <Button className="mt-2" color="primary">
                به‌روزرسانی
              </Button>
            </Col>
            <Col xs={12} className="mt-75">
              <div className="form-check">
                <Input type="checkbox" id="core-building-checkbox" />

                <Label
                  className="form-check-label"
                  for="core-building-checkbox"
                >
                  تنظیم به عنوان ساختمان اصلی
                </Label>
              </div>
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
              {selected !== null ? "ویرایش ساختمان" : "افزودن ساختمان جدید"}
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
