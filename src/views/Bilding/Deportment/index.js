import { useEffect, useState, Fragment } from "react";

import { columns } from "./columns";
import Swal from "sweetalert2";
import { getDepartments } from "../../../core/Interceptor/Services/DepartmentsPageServices/get";
import { createDepartment } from "../../../core/Interceptor/Services/DepartmentsPageServices/post";
import { updateDepartment } from "../../../core/Interceptor/Services/DepartmentsPageServices/put";

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

// Third party
import classnames from "classnames";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { useForm, Controller } from "react-hook-form";
import { ChevronDown, Edit } from "react-feather";

// Styles
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
          <label>نمایش</label>

          <Input
            className="mx-50"
            type="select"
            value={rowsPerPage}
            onChange={handlePerPage}
            style={{ width: "5rem" }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Input>

          <label>ردیف</label>
        </div>
      </Col>

      <Col xs={12} lg={8}>
        <div className="d-flex align-items-center justify-content-lg-end justify-content-start flex-wrap">
          <div className="d-flex align-items-center me-1">
            <label className="mb-0">جستجو:</label>

            <Input
              type="text"
              value={searchTerm}
              className="ms-50"
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>

          <Button color="primary" onClick={() => setShow(true)}>
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
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 0,
      depName: "",
      buildingId: "",
    },
  });
  const [show, setShow] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [allDepartments, setAllDepartments] = useState([]);

  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState(null);

  const fetchDepartments = async () => {
    setLoading(true);

    try {
      const response = await getDepartments();

      setAllDepartments(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const filteredDepartments = allDepartments.filter((item) =>
    (item.depName || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const total = filteredDepartments.length;

  const data = filteredDepartments.slice(
    (currentPage - 1) * rowsPerPage,

    currentPage * rowsPerPage,
  );

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handlePerPage = (e) => {
    setRowsPerPage(Number(e.target.value));

    setCurrentPage(1);
  };

  const handleFilter = (value) => {
    setSearchTerm(value);

    setCurrentPage(1);
  };

  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel=""
        nextLabel=""
        pageCount={Math.ceil(total / rowsPerPage) || 1}
        forcePage={currentPage - 1}
        onPageChange={handlePagination}
        activeClassName="active"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        containerClassName="pagination react-paginate justify-content-end my-2 pe-1"
      />
    );
  };

  const handleEditClick = (row) => {
    setSelected(row);

    setValue("id", row.id);
    setValue("depName", row.depName);
    setValue("buildingId", row.buildingId || "");

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
          depName: values.depName,
        };

        console.log("UPDATE BODY =>", updateBody);

        await updateDepartment(updateBody);
      } else {
        const createBody = {
          depName: values.depName,
          buildingId: Number(values.buildingId),
        };

        console.log("CREATE BODY =>", createBody);

        await createDepartment(createBody);
      }
await fetchDepartments();

Swal.fire({
  title: selected ? "ویرایش شد" : "ایجاد شد",
  icon: "success",
  draggable: true,
});

setShow(false);
setSelected(null);
reset();
    } catch (error) {
      console.log("ERROR =>", error.response?.data || error);
    }
  };

  const updatedColumns = [
    ...columns,

    {
      name: "عملیات",

      cell: (row) => (
        <Button
          size="sm"
          color="transparent"
          className="btn btn-icon"
          onClick={() => handleEditClick(row)}
        >
          <Edit />
        </Button>
      ),
    },
  ];
  const handleDiscard = () => {
    reset();
    setShow(false);
  };

  const renderModalSubtitle = () => {
    if (selected) {
      return "دپارتمان را ویرایش کنید.";
    }

    return "یک دپارتمان جدید در سیستم ایجاد کنید.";
  };

  const renderForm = () => {
    return (
      <Row tag={Form} onSubmit={handleSubmit(onSubmit)}>
        <Col xs={12}>
          <Label className="form-label">نام دپارتمان</Label>

          <Controller
            control={control}
            name="depName"
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <Input
                placeholder="نام دپارتمان"
                invalid={errors.depName && true}
                {...field}
              />
            )}
          />

          {errors.depName && (
            <FormFeedback>لطفاً نام دپارتمان را وارد کنید</FormFeedback>
          )}
        </Col>
        {!selected && (
          <Col xs={12} className="mt-1">
            <Label className="form-label">شناسه ساختمان</Label>

            <Controller
              control={control}
              name="buildingId"
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <Input
                  type="number"
                  placeholder="شناسه ساختمان"
                  invalid={errors.buildingId && true}
                  {...field}
                />
              )}
            />

            {errors.buildingId && (
              <FormFeedback>شناسه ساختمان الزامی است</FormFeedback>
            )}
          </Col>
        )}

        <Col xs={12} className="text-center mt-2">
          <Button type="submit" className="me-1" color="primary">
            {selected ? "به‌روزرسانی" : "ایجاد دپارتمان"}
          </Button>

          <Button outline type="button" onClick={handleDiscard}>
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
        <ModalHeader className="bg-transparent" toggle={() => setShow(!show)} />

        <ModalBody
          className={classnames({
            "p-3 pt-0": selected !== null,

            "px-sm-5 pb-5": selected === null,
          })}
        >
          <div className="text-center mb-2">
            <h1 className="mb-1">
              {selected ? "ویرایش دپارتمان" : "افزودن دپارتمان جدید"}
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
