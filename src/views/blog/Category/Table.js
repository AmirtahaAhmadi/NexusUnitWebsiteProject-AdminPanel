// ** React Imports
import { useState, useMemo, Fragment } from "react";

// ** Table Columns
import { columns } from "./columns";

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
  role,
  setShow,
  searchTerm,
  rowsPerPage,
  handlePerPage,
  handleFilter,
  handleAssignedToChange,
}) => {
  return (
    <Row className="text-nowrap w-100 my-75 g-0 permission-header">
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
          <label htmlFor="search-category">
  جستجو:
</label>
            <Input
              type="text"
              value={searchTerm}
id="search-category"              className="ms-50 w-100"
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>
          <div className="mt-50 width-200 me-1 mt-sm-0 mt-1">
            <Input
              type="select"
              name="select"
              value={role}
              onChange={(e) => handleAssignedToChange(e.target.value)}
            >
           <option value="">انتخاب نقش</option>
<option value="administrator">مدیر کل</option>
<option value="manager">مدیر</option>
<option value="user">کاربر</option>
<option value="support">پشتیبانی</option>
<option value="restricted-user">کاربر محدود</option>
            </Input>
          </div>
          <Button
            className="add-permission mt-sm-0 mt-1"
            color="primary"
            onClick={() => setShow(true)}
          >
            افزودن دسترسی
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
  } = useForm({ defaultValues: { permissionName: "" } });

  const [allData, setAllData] = useState([]);
  const [selected, setSelected] = useState(null);

  const [show, setShow] = useState(false);
  const [assignedTo, setAssignedTo] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const matchesSearch = searchTerm
        ? item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      const matchesRole = assignedTo
        ? item.assignedTo?.includes(assignedTo)
        : true;
      return matchesSearch && matchesRole;
    });
  }, [allData, searchTerm, assignedTo]);

  const total = filteredData.length;

  const dataToRender = () => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  };

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

  const handleAssignedToChange = (val) => {
    setAssignedTo(val);
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
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  const handleEditClick = (data) => {
    setSelected(data);
    setValue("permissionName", data.name);
    setShow(true);
  };

  const handleModalClosed = () => {
    setSelected(null);
    setValue("permissionName", "");
  };

  const handleDelete = (id) => {
    setAllData((prev) => prev.filter((item) => item.id !== id));
  };

  const onSubmit = (data) => {
    if (data.permissionName.length) {
      if (selected !== null) {
        setAllData((prev) =>
          prev.map((item) =>
            item.id === selected.id
              ? { ...item, name: data.permissionName }
              : item,
          ),
        );
      } else {
        setAllData((prev) => [
          ...prev,
          {
            id: Date.now(),
            name: data.permissionName,
            assignedTo: [],
            createdDate: new Date().toISOString(),
          },
        ]);
      }
      setShow(false);
    } else {
      setError("permissionName", {
        type: "manual",
      });
    }
  };

  const updatedColumns = [
    ...columns,
    {
      name: "عملیات",
      cell: (row) => {
        return (
          <div className="d-flex align-items-center permissions-actions">
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
              onClick={() => handleDelete(row.id)}
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
      return "دسترسی را مطابق نیاز خود ویرایش کنید.";
    } else {
      return "دسترسی‌هایی که می‌توانید استفاده کرده و به کاربران خود اختصاص دهید.";
    }
  };

  const renderForm = () => {
    if (selected === null) {
      return (
        <Row tag={Form} onSubmit={handleSubmit(onSubmit)}>
          <Col xs={12}>
            <Label className="form-label" for="permission-name">
  نام دسته‌بندی
            </Label>
            <Controller
              control={control}
              id="permissionName"
              name="permissionName"
              render={({ field }) => (
                <Input
  placeholder="نام دسته‌بندی"
                  invalid={errors.permissionName && true}
                  {...field}
                />
              )}
            />
            {errors && errors.permissionName && (
              <FormFeedback>لطفاً یک نام دسترسی معتبر وارد کنید</FormFeedback>
            )}
          </Col>
          <Col xs={12} className="mt-75">
            <div className="form-check">
              <Input type="checkbox" id="core-perm-checkbox" />
              <Label className="form-check-label" for="core-perm-checkbox">
                تنظیم به‌عنوان دسترسی اصلی
              </Label>
            </div>
          </Col>
          <Col xs={12} className="text-center mt-2">
            <Button className="me-1" color="primary">
ایجاد دسته‌بندی            </Button>
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
  <h6 className="alert-heading">
    توجه!
  </h6>

  <div className="alert-body">
    با ویرایش نام دسته‌بندی، اطلاعات مرتبط با آن نیز تحت تأثیر قرار می‌گیرد. لطفاً پیش از ذخیره تغییرات، از صحت اطلاعات اطمینان حاصل کنید.
  </div>
</Alert>
          <Row tag={Form} onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12} sm={9}>
              <Label className="form-label" for="permission-name">
                نام دسترسی
              </Label>
              <Controller
                control={control}
                id="permissionName"
                name="permissionName"
                render={({ field }) => (
                  <Input
                    placeholder="نام دسترسی"
                    invalid={errors.permissionName && true}
                    {...field}
                  />
                )}
              />
              {errors && errors.permissionName && (
          <FormFeedback>
  لطفاً نام دسته‌بندی را وارد کنید
</FormFeedback>
              )}
            </Col>
            <Col xs={12} sm={3} className="p-sm-0">
              <Button className="mt-2" color="primary">
                بروزرسانی
              </Button>
            </Col>
            <Col xs={12} className="mt-75">
              <div className="form-check">
                <Input type="checkbox" id="core-perm-checkbox" />

                <Label className="form-check-label" for="core-perm-checkbox">
                  تنظیم به‌عنوان دسترسی اصلی
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
          paginationComponent={CustomPagination}
          data={dataToRender()}
          subHeaderComponent={
            <CustomHeader
              setShow={setShow}
              assignedTo={assignedTo}
              searchTerm={searchTerm}
              rowsPerPage={rowsPerPage}
              handleFilter={handleFilter}
              handlePerPage={handlePerPage}
              handleAssignedToChange={handleAssignedToChange}
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
              {selected !== null ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"} دسترسی
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