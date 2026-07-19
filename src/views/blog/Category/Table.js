// ** React Imports
import { useState, useMemo, Fragment } from "react";
import { useNavigate } from "react-router-dom";

// ** Table Columns
import { columns } from "./columns";
import Swal from "sweetalert2";
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
  Spinner,
} from "reactstrap";

// ** Third party Components
import classnames from "classnames";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { useForm, Controller } from "react-hook-form";
import { ChevronDown, Edit, Trash } from "react-feather";
// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useEffect } from "react";
import { getListNewsCategory } from "../../../core/Interceptor/Services/EditPageServices/get";
import { updateNewsCategory } from "../../../core/Interceptor/Services/BlogCategoryPageServices/put";

const CustomHeader = ({
  onAddClick,
  searchTerm,
  rowsPerPage,
  handlePerPage,
  handleFilter,
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
            <label htmlFor="search-category">جستجو:</label>
            <Input
              type="text"
              value={searchTerm}
              id="search-category"
              className="ms-50 w-100"
              onChange={(e) => handleFilter(e.target.value)}
            />
          </div>

          <Button
            className="add-permission mt-sm-0 mt-1"
            color="primary"
            onClick={onAddClick}
          >
            افزودن دسته‌بندی
          </Button>
        </div>
      </Col>
    </Row>
  );
};

const Table = () => {
  const navigate = useNavigate();

  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoryName: "",
      image: null,
      iconAddress: "",
      iconName: "",
      googleTitle: "",
      googleDescribe: "",
    },
  });
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);

      const response = await getListNewsCategory();

      setAllData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const matchesSearch = searchTerm
        ? item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchesSearch;
    });
  }, [allData, searchTerm]);

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

    setValue("categoryName", data.categoryName || "");
    setValue("googleTitle", data.googleTitle || "");
    setValue(
      "googleDescribe",
      data.GoogleDescribe || data.googleDescribe || "",
    );
    setValue("iconAddress", data.iconAddress || "");
    setValue("iconName", data.iconName || "");
    setValue("image", null);

    setImgPreview(data.iconAddress || data.image || null);

    setShow(true);
  };

  const handleModalClosed = () => {
    setSelected(null);
    setImgPreview(null);
    reset();
  };

  const onChangeImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("image", file);

    const reader = new FileReader();
    reader.onload = () => setImgPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const onUpdate = async (data) => {
    try {
      await updateNewsCategory({
        id: selected.id,
        ...data,
      });

      setAllData((prev) =>
        prev.map((item) =>
          item.id === selected.id ? { ...item, ...data } : item,
        ),
      );

      setShow(false);
      setSelected(null);
      reset();

      Swal.fire({
        title: "دسته‌بندی با موفقیت بروزرسانی شد",
        icon: "success",
        draggable: true,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "خطا در بروزرسانی دسته‌بندی",
        icon: "error",
        draggable: true,
      });
    }
  };

  const handleAddClick = () => {
    navigate("/pages/blog/add");
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
          </div>
        );
      },
    },
  ];

  const renderForm = () => {
    return (
      <Fragment>
        <Alert color="warning">
          <h6 className="alert-heading">هشدار!</h6>
          <div className="alert-body">
            با ویرایش دسته‌بندی، ممکن است عملکرد بخش‌های مرتبط دچار مشکل شود.
            لطفاً پیش از ادامه کاملاً مطمئن شوید.
          </div>
        </Alert>
        <Row tag={Form} onSubmit={handleSubmit(onUpdate)}>
          <Col xs={12} className="mb-2">
            <Label className="form-label" for="edit-category-name">
              نام دسته‌بندی *
            </Label>
            <Controller
              control={control}
              name="categoryName"
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  id="edit-category-name"
                  placeholder="نام دسته‌بندی"
                  invalid={!!errors.categoryName}
                  {...field}
                />
              )}
            />
            {errors.categoryName && (
              <FormFeedback>لطفاً نام دسته‌بندی را وارد کنید</FormFeedback>
            )}
          </Col>

          <Col xs={12} sm={6} className="mb-2">
            <Label className="form-label" for="edit-google-title">
              عنوان گوگل
            </Label>
            <Controller
              control={control}
              name="googleTitle"
              render={({ field }) => (
                <Input id="edit-google-title" {...field} />
              )}
            />
          </Col>

          <Col xs={12} sm={6} className="mb-2">
            <Label className="form-label" for="edit-icon-name">
              نام آیکون
            </Label>
            <Controller
              control={control}
              name="iconName"
              render={({ field }) => <Input id="edit-icon-name" {...field} />}
            />
          </Col>

          <Col xs={12} className="mb-2">
            <Label className="form-label" for="edit-google-describe">
              توضیح گوگل
            </Label>
            <Controller
              control={control}
              name="googleDescribe"
              render={({ field }) => (
                <Input
                  id="edit-google-describe"
                  type="textarea"
                  rows="2"
                  {...field}
                />
              )}
            />
          </Col>

          <Col xs={12} sm={6} className="mb-2">
            <Label className="form-label" for="edit-icon-address">
              آدرس آیکون
            </Label>
            <Controller
              control={control}
              name="iconAddress"
              render={({ field }) => (
                <Input id="edit-icon-address" {...field} />
              )}
            />
          </Col>

          <Col xs={12} sm={6} className="mb-2">
            <Label className="form-label" for="edit-category-image">
              تصویر
            </Label>
            <Input
              type="file"
              id="edit-category-image"
              accept=".jpg, .jpeg, .png, .gif"
              onChange={onChangeImage}
            />
            {imgPreview && (
              <img
                src={imgPreview}
                alt="پیش‌نمایش تصویر"
                className="rounded mt-1"
                width="100"
                height="70"
              />
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
              بروزرسانی
            </Button>
          </Col>
        </Row>
      </Fragment>
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
          progressPending={isLoading}
          progressComponent={
            <div className="d-flex w-100 align-items-center justify-content-center py-5">
              <Spinner color="primary" />
            </div>
          }
          paginationComponent={CustomPagination}
          data={dataToRender()}
          subHeaderComponent={
            <CustomHeader
              onAddClick={handleAddClick}
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
        <ModalBody className="p-3 pt-0">
          <div className="text-center mb-2">
            <h1 className="mb-1">ویرایش دسته‌بندی</h1>
            <p>دسترسی را مطابق نیاز خود ویرایش کنید.</p>
          </div>

          {renderForm()}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default Table;
