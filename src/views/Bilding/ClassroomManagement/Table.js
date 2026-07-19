// ** React Imports
import { useEffect, useState, Fragment } from "react";

// ** Table Columns
import { columns } from "./columns";

import { getClassRooms } from "../../../core/Interceptor/Services/ClassRoomPageServices/get";
import { createClassRoom } from "../../../core/Interceptor/Services/ClassRoomPageServices/post";
import { updateClassRoom } from "../../../core/Interceptor/Services/ClassRoomPageServices/put";

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
            افزودن دپارتمان
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
      id: 0,
      classRoomName: "",
      capacity: "",
      buildingId: "",
    },
  });

  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [allClassRooms, setAllClassRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchClassRooms = async () => {
    setLoading(true);

    try {
      const response = await getClassRooms();
      setAllClassRooms(response.data);
      console.log("کلاس‌ها:", response.data);
    } catch (error) {
      console.error("خطا در دریافت لیست دپارتمان‌ها:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchClassRooms();
  }, []);
  const filteredClassRooms = Array.isArray(allClassRooms)
    ? allClassRooms.filter((item) =>
        (item.classRoomName || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase()),
      )
    : [];

  const total = filteredClassRooms.length;

  const data = filteredClassRooms.slice(
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
    setValue("classRoomName", row.classRoomName);
    setValue("capacity", row.capacity);
    setValue("buildingId", row.buildingId);
    setShow(true);
  };

  const handleModalClosed = () => {
    setSelected(null);
    reset();
  };

  const onSubmit = async (values) => {
    try {
      if (selected) {
        const updateBody = {
          id: selected.id,
          classRoomName: values.classRoomName,
          capacity: Number(values.capacity),
          buildingId: Number(values.buildingId),
        };

        await updateClassRoom(updateBody);
      } else {
        const createBody = {
          classRoomName: values.classRoomName,
          capacity: Number(values.capacity),
          buildingId: values.buildingId,
        };
        await createClassRoom(createBody);
      }

      await fetchClassRooms();
      setShow(false);
      setSelected(null);
      reset();
    } catch (error) {
      console.log("ERROR =>", error.response?.data || error);
    }
  };
  const handleDeleteClick = (id) => {};

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
    if (selected) {
      return "اطلاعات کلاس را ویرایش کنید.";
    }

    return "یک کلاس جدید در سیستم ایجاد کنید.";
  };

  const renderForm = () => {
    if (selected === null) {
      return (
        <Row tag={Form} onSubmit={handleSubmit(onSubmit)}>
          <Col xs={12}>
            <Label className="form-label" for="dep-name">
              نام کلاس
            </Label>
            <Controller
              control={control}
              name="classRoomName"
              render={({ field }) => (
                <Input
                  placeholder="نام کلاس"
                  invalid={!!errors.classRoomName}
                  {...field}
                />
              )}
            />
            {errors && errors.depName && (
              <FormFeedback>لطفاً یک نام کلاس معتبر وارد کنید</FormFeedback>
            )}
          </Col>
          <Col xs={12} className="mt-1">
            <Label className="form-label" for="building-id">
              شناسه ساختمان
            </Label>
            <Controller
              control={control}
              name="buildingId"
              render={({ field }) => (
                <Input
                  placeholder="شناسه ساختمان"
                  invalid={errors.buildingId && true}
                  {...field}
                />
              )}
            />
            {errors && errors.buildingId && (
              <FormFeedback>لطفاً یک ساختمان معتبر انتخاب کنید</FormFeedback>
            )}
          </Col>
          <Col xs={12} className="mt-1">
            <Label>ساختمان</Label>

            <Controller
              control={control}
              name="buildingId"
              rules={{
                required: true,
                validate: (value) => Number(value) > 0,
              }}
              render={({ field }) => (
                <Input type="select" {...field}>
                  <option value={0}>انتخاب ساختمان</option>

                  {buildings.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.buildingName}
                    </option>
                  ))}
                </Input>
              )}
            />

            {errors.buildingId && (
              <FormFeedback>انتخاب ساختمان الزامی است</FormFeedback>
            )}
          </Col>
          <Col xs={12} className="text-center mt-2">
            <Button className="me-1" color="primary">
              ایجاد دپارتمان
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
              با ویرایش نام کلاس، ممکن است عملکرد سیستم دچار مشکل شود. لطفاً پیش
              از ادامه، کاملاً از این کار مطمئن باشید.
            </div>
          </Alert>
          <Row tag={Form} onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12} sm={9}>
              <Label className="form-label" for="dep-name">
                نام کلاس
              </Label>
              <Controller
                control={control}
                name="classRoomName"
                render={({ field }) => (
                  <Input
                    placeholder="نام کلاس"
                    invalid={!!errors.classRoomName}
                    {...field}
                  />
                )}
              />
              {errors && errors.depName && (
                <FormFeedback>لطفاً یک نام کلاس معتبر وارد کنید</FormFeedback>
              )}
            </Col>
            <Col xs={12} sm={3} className="p-sm-0">
              <Button className="mt-2" color="primary">
                به‌روزرسانی
              </Button>
            </Col>
            <Col xs={12} className="mt-1">
              <Label className="form-label" for="building-id">
                شناسه ساختمان
              </Label>
              <Controller
                control={control}
                name="buildingId"
                render={({ field }) => (
                  <Input
                    placeholder="شناسه ساختمان"
                    invalid={errors.buildingId && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.buildingId && (
                <FormFeedback>لطفاً یک ساختمان معتبر انتخاب کنید</FormFeedback>
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
              {selected !== null ? "ویرایش کلاس" : " افزودن کلاس جدید"}
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
