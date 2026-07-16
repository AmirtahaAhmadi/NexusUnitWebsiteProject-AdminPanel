// ** React Imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// ** Third Party Components
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Label,
  Input,
  Button,
  Spinner,
  FormFeedback,
} from "reactstrap";

// ** API Services
import { createNewsCategoryfilter } from "../../../../core/Interceptor/Services/BlogCategoryPageServices/post";

const AddCategory = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [imgPreview, setImgPreview] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      categoryName: "",
      googleTitle: "",
      googleDescribe: "",
      iconAddress: "",
      iconName: "",
    },
  });

  const handleBackToList = () => {
    navigate("/pages/blog/category");
  };

  const onChangeImage = (e) => {
    const file = e.target.files?.[0];

    console.log("===== Selected File =====");
    console.log(file);
    console.log("instanceof File:", file instanceof File);
    console.log("name:", file?.name);
    console.log("type:", file?.type);
    console.log("size:", file?.size);

    if (!file) return;

    setImgFile(file);

    const reader = new FileReader();
    reader.onload = () => setImgPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (formData) => {
    console.log("===== Form Values =====");
    console.log(formData);

    console.log("===== Image =====");
    console.log(imgFile);
    console.log("instanceof File:", imgFile instanceof File);
    setIsSaving(true);
    try {
      await createNewsCategoryfilter({
        ...formData,
        image: imgFile,
      });

      Swal.fire({
        title: "دسته‌بندی با موفقیت ایجاد شد",
        icon: "success",
        draggable: true,
        timer: 2000,
        showConfirmButton: false,
      });

      handleBackToList();
    } catch (error) {
      console.log("=========== ERROR ===========");
      console.log(error);

      console.log("Status:");
      console.log(error.response?.status);

      console.log("Response:");
      console.log(error.response?.data);

      console.log("Headers:");
      console.log(error.response?.headers);

      console.log("Request:");
      console.log(error.config);

      console.error("API ERROR:", error);
      Swal.fire({
        title: "خطا در ایجاد دسته‌بندی",
        icon: "error",
        draggable: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="category-add-wrapper">
      <Breadcrumbs
        title="افزودن دسته‌بندی"
        data={[{ title: "صفحات" }, { title: "وبلاگ" }, { title: "دسته‌بندی" }]}
      />
      <Row>
        <Col sm="12">
          <Card>
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="category-name">
                      نام دسته‌بندی *
                    </Label>
                    <Controller
                      control={control}
                      name="categoryName"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Input
                          id="category-name"
                          placeholder="نام دسته‌بندی"
                          invalid={!!errors.categoryName}
                          {...field}
                        />
                      )}
                    />
                    {errors.categoryName && (
                      <FormFeedback>
                        لطفاً نام دسته‌بندی را وارد کنید
                      </FormFeedback>
                    )}
                  </Col>

                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="category-google-title">
                      عنوان گوگل
                    </Label>
                    <Controller
                      control={control}
                      name="googleTitle"
                      render={({ field }) => (
                        <Input id="category-google-title" {...field} />
                      )}
                    />
                  </Col>

                  <Col md="6" className="mb-2">
                    <Label
                      className="form-label"
                      for="category-google-describe"
                    >
                      توضیح گوگل
                    </Label>
                    <Controller
                      control={control}
                      name="googleDescribe"
                      render={({ field }) => (
                        <Input
                          id="category-google-describe"
                          type="textarea"
                          rows="2"
                          {...field}
                        />
                      )}
                    />
                  </Col>

                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="category-icon-name">
                      نام آیکون
                    </Label>
                    <Controller
                      control={control}
                      name="iconName"
                      render={({ field }) => (
                        <Input id="category-icon-name" {...field} />
                      )}
                    />
                  </Col>

                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="category-icon-address">
                      آدرس آیکون
                    </Label>
                    <Controller
                      control={control}
                      name="iconAddress"
                      render={({ field }) => (
                        <Input id="category-icon-address" {...field} />
                      )}
                    />
                  </Col>

                  <Col md="6" className="mb-2">
                    <Label className="form-label" for="category-image">
                      تصویر
                    </Label>
                    <Input
                      type="file"
                      id="category-image"
                      accept=".jpg, .jpeg, .png, .gif"
                      onChange={onChangeImage}
                    />
                    {imgPreview && (
                      <img
                        src={imgPreview}
                        alt="پیش‌نمایش تصویر"
                        className="rounded mt-1"
                        width="120"
                        height="80"
                      />
                    )}
                  </Col>

                  <Col sm="12" className="mt-1">
                    <Button
                      color="primary"
                      className="me-1"
                      type="submit"
                      disabled={isSaving}
                    >
                      {isSaving && <Spinner size="sm" className="me-50" />}
                      ایجاد دسته‌بندی
                    </Button>
                    <Button
                      color="secondary"
                      outline
                      type="button"
                      disabled={isSaving}
                      onClick={handleBackToList}
                    >
                      انصراف
                    </Button>
                  </Col>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddCategory;
