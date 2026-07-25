// ** React Import
import { useState } from "react";

// ** Custom Components
import Sidebar from "@components/sidebar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
import Select from "react-select";
import classnames from "classnames";
import { useForm, Controller } from "react-hook-form";

import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from "reactstrap";
import { Check, X } from "react-feather";
import { postCreateUser } from "../../../../core/Interceptor/Services/UserServices/post";

// ** Store & Actions
// import { addUser } from '../store'
// import { useDispatch } from 'react-redux'

// const countryOptions = [
//   { label: "Australia", value: "Australia" },
//   { label: "Bangladesh", value: "Bangladesh" },
//   { label: "Belarus", value: "Belarus" },
//   { label: "Brazil", value: "Brazil" },
//   { label: "Canada", value: "Canada" },
//   { label: "China", value: "China" },
//   { label: "France", value: "France" },
//   { label: "Germany", value: "Germany" },
//   { label: "India", value: "India" },
//   { label: "Indonesia", value: "Indonesia" },
//   { label: "Israel", value: "Israel" },
//   { label: "Italy", value: "Italy" },
//   { label: "Japan", value: "Japan" },
//   { label: "Korea", value: "Korea" },
//   { label: "Mexico", value: "Mexico" },
//   { label: "Philippines", value: "Philippines" },
//   { label: "Russia", value: "Russia" },
//   { label: "South", value: "South" },
//   { label: "Thailand", value: "Thailand" },
//   { label: "Turkey", value: "Turkey" },
//   { label: "Ukraine", value: "Ukraine" },
//   { label: "United Arab Emirates", value: "United Arab Emirates" },
//   { label: "United Kingdom", value: "United Kingdom" },
//   { label: "United States", value: "United States" },
// ];

const checkIsValid = (data) => {
  return Object.values(data).every((field) =>
    typeof field === "object" ? field !== null : field.length > 0,
  );
};

const SidebarNewUsers = ({ open, toggleSidebar, setRenderCount }) => {
  // ** States
  const [data, setData] = useState(null);
  // const [isStudent, setIsStudent] = useState(false);
  // const [isTeacher, setIsTeacher] = useState(false);

  // ** Vars
  const defaultValues = {
    lastName: "",
    firstName: "",
    gmail: "",
    password: "",
    phoneNumber: "",
    isStudent: false,
    isTeacher: false,
  };

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: defaultValues,
  });

  // ** Function to handle form submit
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await postCreateUser(
        data.lastName,
        data.firstName,
        data.gmail,
        data.password,
        data.phoneNumber,
        // data.isStudent,
        true,
        // data.isTeacher,
        true,
      );
      if (response.data.success == true) {
        toggleSidebar()
        setRenderCount(prev => prev + 1)
      }
      console.log(response.data)
    } catch (error) {
      console.log("creatingUser error: ", error.response.data.message);
    }
  };

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, "");
    }
  };

  return (
    <Sidebar
      size="lg"
      open={open}
      title="افزودن کاربر جدید"
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <Label className="form-label" for="firstName">
            نام <span className="text-danger">*</span>
          </Label>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: "نام الزامی است" }}
            render={({ field }) => (
              <Input
                id="firstName"
                placeholder="Amir"
                invalid={!!errors.firstName}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="lastName">
            نام خانوادگی <span className="text-danger">*</span>
          </Label>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: "نام خانوادگی الزامی است" }}
            render={({ field }) => (
              <Input
                id="lastName"
                placeholder="Ahmadi"
                invalid={!!errors.lastName}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="gmail">
            جیمیل <span className="text-danger">*</span>
          </Label>
          <Controller
            name="gmail"
            control={control}
            rules={{ required: "جیمیل الزامی است" }}
            render={({ field }) => (
              <Input
                type="email"
                id="gmail"
                placeholder="amir.ahmadi@example.com"
                invalid={!!errors.gmail}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="password">
            رمز عبور <span className="text-danger">*</span>
          </Label>
          <Controller
            name="password"
            control={control}
            rules={{
              required: "رمز عبور الزامی است",
              minLength: {
                value: 4,
                message: "رمز عبور حداقل 4 کاراکتر باید داشته باشد",
              },
            }}
            render={({ field }) => (
              <InputPasswordToggle
                htmlFor="password"
                className="input-group-merge"
                invalid={!!errors.password}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="phoneNumber">
            شماره تماس <span className="text-danger">*</span>
          </Label>
          <Controller
            name="phoneNumber"
            control={control}
            rules={{ required: "جیمیل الزامی است" }}
            render={({ field }) => (
              <Input
                id="phoneNumber"
                placeholder="09111111111"
                invalid={!!errors.phoneNumber}
                {...field}
              />
            )}
          />
        </div>
        {/* <div
          style={{ alignItems: "center", gap: "30px" }}
          className="d-flex mb-1"
        >
          <div className="mt-50 mt-sm-0">
            <Label for="isStudent">رول دانشجو</Label>
            <Controller
              name="isStudent"
              control={control}
              render={({ field: { value, onChange, ...field } }) => (
                <div className="form-switch">
                  <Input
                    type="switch"
                    role="switch"
                    checked={value}
                    id="isStudent"
                    {...field}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                  <Label className="form-check-label" for="isStudent">
                    <span className="switch-icon-left">
                      <Check size={14} />
                    </span>
                    <span className="switch-icon-right">
                      <X size={14} />
                    </span>
                  </Label>
                </div>
              )}
            />
          </div>
          <div className="mt-50 mt-sm-0">
            <Label for="isTeacher">رول مربی</Label>
            <Controller
              name="isTeacher"
              control={control}
              render={({ field: { value, onChange, ...field } }) => (
                <div className="form-switch">
                  <Input
                    type="switch"
                    role="switch"
                    checked={value}
                    id="isTeacher"
                    {...field}
                    onChange={(e) => onChange(e.target.checked)}
                  />
                  <Label className="form-check-label" for="isTeacher">
                    <span className="switch-icon-left">
                      <Check size={14} />
                    </span>
                    <span className="switch-icon-right">
                      <X size={14} />
                    </span>
                  </Label>
                </div>
              )}
            />
          </div>
        </div> */}
        <Button
          type="submit"
          className="me-1"
          color="primary"
          disabled={isSubmitting}
        >
          {!isSubmitting ? "ایجاد کاربر جدید" : "در حال ارسال..."}
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          لغو
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
