// ** React Imports
import { Fragment, useEffect } from "react";

import { useForm } from "react-hook-form";

// ** Icons Imports
import { ArrowLeft, ArrowRight, Watch } from "react-feather";

// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from "reactstrap";

const AccountDetails = ({ stepper, type, data, onSubmit }) => {
  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (data) {
      Object.keys(data).forEach((key) => {
        if (key == "gender") {
          setValue(key, String(data[key]));
        } else {
          setValue(key, data[key]);
        }
      });
    }
  }, [data]);

  const OnSubmitForm = (myData) => {
    const finalData = {
      ...myData,
      gender: myData.gender === "true",
    };
    console.log(finalData)
    onSubmit(finalData);
    stepper.next();
  };

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات کاربر</h5>
        <small className="text-muted">اطلاعات کاربر را وارد کنید</small>
      </div>
      <Form onSubmit={handleSubmit(OnSubmitForm)}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`fName-${type}`}>
              نام
            </Label>
            <Input
              type="text"
              id={`fName-${type}`}
              innerRef={register("fName").ref}
              name={register("fName").name}
              onChange={register("fName").onChange}
              onBlur={register("fName").onBlur}
              placeholder="نام"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`lName-${type}`}>
              نام خانوادگی
            </Label>
            <Input
              type="text"
              id={`lName-${type}`}
              innerRef={register("lName").ref}
              name={register("lName").name}
              onChange={register("lName").onChange}
              onBlur={register("lName").onBlur}
              placeholder="نام خانوادگی"
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`gmail-${type}`}>
              ایمیل
            </Label>
            <Input
              type="text"
              id={`gmail-${type}`}
              innerRef={register("gmail").ref}
              name={register("gmail").name}
              onChange={register("gmail").onChange}
              onBlur={register("gmail").onBlur}
              placeholder="email@example.com"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`userName-${type}`}>
              نام کاربری
            </Label>
            <Input
              type="text"
              id={`userName-${type}`}
              innerRef={register("userName").ref}
              name={register("userName").name}
              onChange={register("userName").onChange}
              onBlur={register("userName").onBlur}
              placeholder="نام کاربری"
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`phoneNumber-${type}`}>
              شماره تماس
            </Label>
            <Input
              type="text"
              id={`phoneNumber-${type}`}
              innerRef={register("phoneNumber").ref}
              name={register("phoneNumber").name}
              onChange={register("phoneNumber").onChange}
              onBlur={register("phoneNumber").onBlur}
              placeholder="09111111111"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`nationalCode-${type}`}>
              کد ملی
            </Label>
            <Input
              type="text"
              id={`nationalCode-${type}`}
              innerRef={register("nationalCode").ref}
              name={register("nationalCode").name}
              onChange={register("nationalCode").onChange}
              onBlur={register("nationalCode").onBlur}
              placeholder="1234123456"
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`userAbout-${type}`}>
              درباره کاربر
            </Label>
            <Input
              type="textarea"
              style={{ height: "80px", resize: "none" }}
              id={`userAbout-${type}`}
              innerRef={register("userAbout").ref}
              name={register("userAbout").name}
              onChange={register("userAbout").onChange}
              onBlur={register("userAbout").onBlur}
              placeholder="درباره کاربر"
            />
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`homeAdderess-${type}`}>
              آدرس
            </Label>
            <Input
              type="textarea"
              style={{ height: "80px", resize: "none" }}
              id={`homeAdderess-${type}`}
              innerRef={register("homeAdderess").ref}
              name={register("homeAdderess").name}
              onChange={register("homeAdderess").onChange}
              onBlur={register("homeAdderess").onBlur}
              placeholder="آدرس محل سکونت"
            />
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`birthDay-${type}`}>
              تاریخ تولد
            </Label>
            <Input
              type="date"
              id={`birthDay-${type}`}
              innerRef={register("birthDay").ref}
              name={register("birthDay").name}
              onChange={register("birthDay").onChange}
              onBlur={register("birthDay").onBlur}
            />
            {/* <PickerDisabledRange /> */}
          </Col>
          <Col md="6" className="mb-1">
            <Label className="form-label">جنسیت</Label>
            <div className="demo-inline-spacing">
              <div className="form-check">
                <Input
                  type="radio"
                  id={`gender1-${type}`}
                  value={true}
                  className="cursor-pointer"
                  innerRef={register("gender").ref}
                  name={register("gender").name}
                  onChange={register("gender").onChange}
                  onBlur={register("gender").onBlur}
                />
                <Label className="form-check-label" for={`gender1-${type}`}>
                  مرد
                </Label>
              </div>
              <div className="form-check">
                <Input
                  type="radio"
                  id={`gender2-${type}`}
                  value={false}
                  className="cursor-pointer"
                  innerRef={register("gender").ref}
                  name={register("gender").name}
                  onChange={register("gender").onChange}
                  onBlur={register("gender").onBlur}
                />
                <Label className="form-check-label" for={`gender2-${type}`}>
                  زن
                </Label>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="6" className="mb-1">
            <div className="form-check form-check-inline">
              <Input
                type="checkbox"
                id={`twoStepAuth-${type}`}
                className="cursor-pointer"
                innerRef={register("twoStepAuth").ref}
                name={register("twoStepAuth").name}
                onChange={register("twoStepAuth").onChange}
                onBlur={register("twoStepAuth").onBlur}
              />
              <Label for={`twoStepAuth-${type}`} className="form-check-label">
                ورود دو مرحله ای
              </Label>
            </div>
            <div className="form-check form-check-inline">
              <Input
                type="checkbox"
                id={`receiveMessageEvent-${type}`}
                className="cursor-pointer"
                innerRef={register("receiveMessageEvent").ref}
                name={register("receiveMessageEvent").name}
                onChange={register("receiveMessageEvent").onChange}
                onBlur={register("receiveMessageEvent").onBlur}
              />
              <Label
                for={`receiveMessageEvent-${type}`}
                className="form-check-label"
              >
                دریافت رویداد پیام
              </Label>
            </div>
          </Col>
        </Row>
        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"
            ></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button type="submit" color="primary" className="btn-next">
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"
            ></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AccountDetails;
