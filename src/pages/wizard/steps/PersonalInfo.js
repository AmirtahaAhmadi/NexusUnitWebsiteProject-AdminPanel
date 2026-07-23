// ** React Imports
import { Fragment, useEffect } from "react";

// ** Third Party Components
import { ArrowLeft, ArrowRight } from "react-feather";

// ** Reactstrap Imports
import { Label, Row, Col, Form, Input, Button } from "reactstrap";
import toast from "react-hot-toast";
// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { globalformData } from "../../../redux/zustan/formdata";
// import { postCreatestep2call } from "../../../core/Interceptor/Courses/postCreatestep2call";
import { postCreatestep2 } from "../../../core/Interceptor/Courses/postCreatestep2";
import { generate12DigitNumber } from "../../../core/Interceptor/Courses/generate12digitnumber";
import RichTextEditor from "./RichTextEditor";
import { CCstep2id } from "../../../redux/zustan/CCstep2id";

const PersonalInfo = ({ stepper, type }) => {
  const formData = globalformData((state) => state.formData);
  const updateformdata = globalformData((state) => state.updateformdata);
  const updatetheid = CCstep2id((state) => state.updatetheid);
  const theid = CCstep2id((state) => state.theid);
  const resetFormData = globalformData((state) => state.resetFormData);
  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: formData.Title,
    description: formData.Describe,
    instructor: {
      "@type": "Person",
      name: formData.TeacherName,
    },
  };

  useEffect(() => {
    console.log("this is the id", theid);
  }, [theid]);

  const handleSubmit = async () => {
    // const required = [
    //   formData.Title,
    //   formData.Describe,
    //   formData.Capacity,
    //   formData.CourseTypeId,
    //   formData.TremId,
    //   formData.ClassId,
    //   formData.CourseLvlId,
    //   formData.TeacherId,
    //   formData.Cost,
    //   formData.Image,
    //   formData.StartTime,
    //   formData.EndTime,
    // ].every(Boolean);

    // if (!required) {
    //   return toast.error("لطفا تمام گذینه ها را پر کنید");
    // }

    // updateformdata({
    //   GoogleSchema: JSON.stringify(schema),
    // });
    try {
      const response = await postCreatestep2(formData);
      console.log("course created bjhbjhb:", response.data);
      if (response.data.id) {
        updatetheid({ id: response.data.id });
        resetFormData();
        stepper?.next();
      }
    } catch (error) {
      console.error("submit error:", error);
    }
  };

  //   {id: '1ee1e4b2-0c11-44cc-8444-fcc99747ebd7', success: true, message: 'دوره شما ساخته شد'}
  // id
  // :
  // "1ee1e4b2-0c11-44cc-8444-fcc99747ebd7"
  // message
  // :
  // "دوره شما ساخته شد"
  // success
  // :
  // true

  return (
    <Fragment>
      <div className="content-header">
        <h5 className="mb-0">اطلاعات دوره</h5>
      </div>

      <Form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`Title-${type}`}>
              موضوع
            </Label>
            <Input
              type="text"
              name="Title"
              className=""
              id={`Title-${type}`}
              placeholder="موضوع کورس را وارد کنید"
              value={formData.Title}
              onChange={(e) =>
                updateformdata({
                  Title: e.target.value,
                })
              }
            />
          </Col>

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

          {/* <Col md="6" className="mb-1">
            <Label className="form-label" for={`ClassId-${type}`}>
              ای دی کلاس
            </Label>
            <Input
              type="text"
              name="ClassId"
              className=""
              id={`ClassId-${type}`}
              placeholder="ای کلاس را وارد کنید"
              value={formData.ClassId}
              onChange={(e) =>
                updateformdata({
                  ClassId: e.target.value,
                })
              }
            />
          </Col> */}
          {/* 
          <Col md="6" className="mb-1">
            <Label className="form-label" for={`TeacherId-${type}`}>
              ای دی مدرس
            </Label>
            <Input
              type="text"
              name="TeacherId"
              className=""
              id={`TeacherId-${type}`}
              placeholder="تعداد پرداخت فعلی"
              value={formData.ClassId}
              onChange={(e) =>
                updateformdata({
                  TeacherId: e.target.value,
                })
              }
            />
          </Col> */}

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
              ای دی دوره هایه پیش نیاز
            </Label>
            <Input
              type="text"
              name="CoursePrerequisiteId"
              id={`CoursePrerequisiteId-${type}`}
              placeholder="ای دی دوره هایه پیش نیاز"
              value={formData.CoursePrerequisiteId}
              onChange={(e) =>
                updateformdata({
                  CoursePrerequisiteId: e.target.value,
                })
              }
            />
          </Col>

          <Col md="6" className="mb-1">
            <Label className="form-label" for={`Image-${type}`}>
              ارسال تصویر
            </Label>
            <Input
              type="file"
              name="Image"
              id={`Image-${type}`}
              accept=".png,.jpg,.jpeg,image/png,image/jpeg"
              onChange={(e) =>
                updateformdata({
                  Image: e.target.files?.[0] || null,
                })
              }
            />
            <small className="text-muted">
              فقط فایل‌های PNG، JPG و JPEG مجاز هستند
            </small>
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
            <Label className="form-label" for={`UniqeUrlString-${type}`}>
              ادرس خاص
            </Label>
            <Input
              type="text"
              name="UniqeUrlString"
              id={`UniqeUrlString-${type}`}
              placeholder="لینک کوتاه"
              value={formData.UniqeUrlString}
              onChange={(e) =>
                updateformdata({
                  UniqeUrlString: `${e.target.value}${generate12DigitNumber()}`,
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
          <Label className="form-label" for={`MiniDescribe-${type}`}>
            توضیج کوتاه
          </Label>
          <Input
            type="textarea"
            name="MiniDescribe"
            className="t-w-full"
            id={`MiniDescribe-${type}`}
            placeholder="یک جمله کوتا"
            value={formData.MiniDescribe}
            onChange={(e) =>
              updateformdata({
                MiniDescribe: e.target.value,
              })
            }
          />
        </Col>
        <RichTextEditor />

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
            onClick={() => stepper?.previous()}>
            <ArrowLeft size={14} className="align-middle me-sm-25 me-0" />
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>

          <Button color="primary" className="btn-next">
            <span
              onClick={() => {
                handleSubmit();
              }}
              className="align-middle d-sm-inline-block d-none">
              ارسال اطلاعات
            </span>
            <ArrowRight size={14} className="align-middle ms-sm-25 ms-0" />
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default PersonalInfo;
