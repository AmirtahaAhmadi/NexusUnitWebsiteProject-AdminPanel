// ** React Imports
import { Fragment, useEffect } from "react";

// ** Third Party Components
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { globalformData } from "../../../redux/zustan/formdata";

const PersonalInfo = ({ stepper, type }) => {
  const formData = globalformData((state) => state.formData);
  const updateformdata = globalformData((state) => state.updateformdata);

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات دوره</h5>
      </div>

      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`Capacity-${type}`}>
              موجودی
            </Label>
            <Input
              type="number"
              name="Capacity"
              className="t-text-end"
              id={`Capacity-${type}`}
              placeholder="موجودی را وارد کنید"
              value={formData.Capacity}
              onChange={(e) =>
                updateformdata({
                  Capacity: e.target.value,
                })
              }
            />
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for={`Cost-${type}`}>
              قیمت دوره
            </Label>
            <Input
              type="number"
              name="Cost"
              className="t-text-end"
              id={`Cost-${type}`}
              placeholder="قیمت دوره را وارد کنید"
              value={formData.Cost}
              onChange={(e) =>
                updateformdata({
                  Cost: e.target.value,
                })
              }
            />
          </Col>

          <Col md="6" className="mb-1">
            <Label
              className="form-label"
              for={`CurrentCoursePaymentNumber-${type}`}>
              تعداد پرداخت فعلی
            </Label>
            <Input
              type="number"
              name="CurrentCoursePaymentNumber"
              className="t-text-end"
              id={`CurrentCoursePaymentNumber-${type}`}
              placeholder="تعداد پرداخت فعلی"
              value={formData.CurrentCoursePaymentNumber}
              onChange={(e) =>
                updateformdata({
                  CurrentCoursePaymentNumber: e.target.value,
                })
              }
            />
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for={`SessionNumber-${type}`}>
              تعداد جلسات
            </Label>
            <Input
              type="number"
              name="SessionNumber"
              className="t-text-end"
              id={`SessionNumber-${type}`}
              placeholder="تعداد جلسات"
              value={formData.SessionNumber}
              onChange={(e) =>
                updateformdata({
                  SessionNumber: e.target.value,
                })
              }
            />
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for={`StartTime-${type}`}>
              زمان شروع
            </Label>
            <Input
              type="date"
              name="StartTime"
              id={`StartTime-${type}`}
              placeholder="زمان شروع"
              value={formData.StartTime}
              onChange={(e) =>
                updateformdata({
                  StartTime: e.target.value,
                })
              }
            />
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for={`EndTime-${type}`}>
              زمان پایان
            </Label>
            <Input
              type="date"
              name="EndTime"
              id={`EndTime-${type}`}
              placeholder="زمان پایان"
              value={formData.EndTime}
              onChange={(e) =>
                updateformdata({
                  EndTime: e.target.value,
                })
              }
            />
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for={`CoursePrerequisiteId-${type}`}>
              آی‌دی پیش‌نیاز دوره
            </Label>
            <Input
              type="text"
              name="CoursePrerequisiteId"
              id={`CoursePrerequisiteId-${type}`}
              placeholder="آی‌دی پیش‌نیاز دوره"
              value={formData.CoursePrerequisiteId}
              onChange={(e) =>
                updateformdata({
                  CoursePrerequisiteId: e.target.value,
                })
              }
            />
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for={`GoogleTitle-${type}`}>
              گوگل تایتل
            </Label>
            <Input
              type="text"
              name="GoogleTitle"
              id={`GoogleTitle-${type}`}
              placeholder="Google Title"
              value={formData.GoogleTitle}
              onChange={(e) =>
                updateformdata({
                  GoogleTitle: e.target.value,
                })
              }
            />
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for={`ShortLink-${type}`}>
              لینک کوتاه
            </Label>
            <Input
              type="text"
              name="ShortLink"
              id={`ShortLink-${type}`}
              placeholder="لینک کوتاه"
              value={formData.ShortLink}
              onChange={(e) =>
                updateformdata({
                  ShortLink: e.target.value,
                })
              }
            />
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for={`ImageAddress-${type}`}>
              آدرس تصویر
            </Label>
            <Input
              type="text"
              name="ImageAddress"
              id={`ImageAddress-${type}`}
              placeholder="آدرس تصویر"
              value={formData.ImageAddress}
              onChange={(e) =>
                updateformdata({
                  ImageAddress: e.target.value,
                })
              }
            />
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for={`TumbImageAddress-${type}`}>
              آدرس تصویر کوچک
            </Label>
            <Input
              type="text"
              name="TumbImageAddress"
              id={`TumbImageAddress-${type}`}
              placeholder="آدرس تصویر کوچک"
              value={formData.TumbImageAddress}
              onChange={(e) =>
                updateformdata({
                  TumbImageAddress: e.target.value,
                })
              }
            />
          </Col>
        </Row>

        <Col md="6" className="mb-1 t-w-full">
          <Label className="form-label" for={`Describe-${type}`}>
            توضیجات
          </Label>
          <Input
            type="textarea"
            name="Describe"
            className="t-w-full"
            id={`Describe-${type}`}
            placeholder="توضیحات"
            value={formData.Describe}
            onChange={(e) =>
              updateformdata({
                Describe: e.target.value,
              })
            }
          />
        </Col>
        <div className="d-flex justify-content-between mt-2">
          <Button
            color="primary"
            className="btn-prev"
            onClick={() => stepper.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0" />
            <span className="align-middle d-sm-inline-block d-none">
              Previous
            </span>
          </Button>

          <Button
            color="primary"
            className="btn-next"
            onClick={() => stepper.next()}>
            <span className="align-middle d-sm-inline-block d-none">Next</span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0" />
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default PersonalInfo;
