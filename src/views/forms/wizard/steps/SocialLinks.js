// ** React Imports
import { Fragment, useEffect } from "react";

// ** Icons Imports
import { ArrowLeft } from "react-feather";
import { useForm } from "react-hook-form";

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import { putUpdateUser } from "../../../../core/Interceptor/Services/UserServices/put";
import {
  handleError,
  handleSuccess,
} from "../../../extensions/sweet-alert/SweetAlerts";

const SocialLinks = ({
  stepper,
  type,
  data,
  onSubmit,
  fullData,
  selectedUser,
  setUserDetailsRenderCount,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm();

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        setValue(key, data[key]);
      });
    }
  }, [data]);

  const OnSubmitForm = async (myData) => {
    onSubmit(myData);
    console.log(fullData);
    console.log(selectedUser);
    try {
      const response = await putUpdateUser(
        selectedUser.id,
        fullData.accountDetails.fName,
        fullData.accountDetails.lName,
        fullData.accountDetails.userName,
        fullData.accountDetails.gmail,
        fullData.accountDetails.phoneNumber,
        selectedUser.active,
        selectedUser.isDelete,
        // isTeacher
        true,
        // isStudent
        true,
        selectedUser.recoveryEmail,
        fullData.accountDetails.twoStepAuth,
        fullData.accountDetails.userAbout,
        selectedUser.currentPictureAddress,
        fullData.socialLinks.linkdinProfile,
        fullData.socialLinks.telegramLink,
        Boolean(fullData.accountDetails.receiveMessageEvent),
        fullData.accountDetails.homeAdderess,
        fullData.accountDetails.nationalCode,
        Boolean(fullData.accountDetails.gender),
        fullData.address.latitude,
        fullData.address.longitude,
        selectedUser.insertDate,
        fullData.accountDetails.birthDay,
      );
      // console.log(response.data);
      if (response.data.success == true) {
        setUserDetailsRenderCount((prev) => prev + 1);
        setShow(false);
        handleSuccess("اطلاعات کاربر با موفقیت بروز شد!");
      }
    } catch (error) {
      console.log("updatingUserProfile error: ", error);
      handleError("عملیات با مشکل روبرو شد!");
    }
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">لینک شبکه های اجتماعی</h5>
        <small>لینک شبکه های اجتماعی را وارد کنید</small>
      </div>
      <Form onSubmit={handleSubmit(OnSubmitForm)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`linkdinProfile-${type}`}>
              لینکدین
            </Label>
            <Input
              type="text"
              id={`linkdinProfile-${type}`}
              innerRef={register("linkdinProfile").ref}
              name={register("linkdinProfile").name}
              onChange={register("linkdinProfile").onChange}
              onBlur={register("linkdinProfile").onBlur}
              placeholder="linkedin"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`telegramLink-${type}`}>
              تلگرام
            </Label>
            <Input
              type="text"
              id={`telegramLink-${type}`}
              innerRef={register("telegramLink").ref}
              name={register("telegramLink").name}
              onChange={register("telegramLink").onChange}
              onBlur={register("telegramLink").onBlur}
              placeholder="example"
            />
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}
          >
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button
            type="submit"
            color="success"
            disabled={isSubmitting}
            className="btn-submit"
          >
            {!isSubmitting ? "تایید" : "در حال ارسال..."}
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default SocialLinks;
