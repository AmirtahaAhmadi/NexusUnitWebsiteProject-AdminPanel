import { useState, Fragment, useEffect } from "react";
import Rec from "./Rectangle.png";
import { dateToLocal } from "../../core/Interceptor/reusablefunctions/DateTolocal";
import {
  Card,
  CardBody,
  Button,
  Badge,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Input,
  Label,
} from "reactstrap";
import ShareProjectExample from "./ShareProjectExample";
const roleColors = {
  admin: "danger",
  editor: "info",
  author: "warning",
  maintainer: "success",
  subscriber: "primary",
};

const statusColors = {
  active: "success",
  pending: "warning",
  inactive: "secondary",
};

const UserInfoCard = ({ getcourse }) => {
  const [show, setShow] = useState(false);
  const [getcourse1, setgetcourse1] = useState([]);

  useEffect(() => {
    setgetcourse1(getcourse);
    console.log("asd", getcourse1);
  }, [getcourse]);

  const selectedUser = {
    fullName: "John Doe",
    username: "johndoe",
    email: "john@mail.com",
    role: "admin",
    status: "active",
    contact: "1234567890",
    avatar: "",
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className=" t-w-[90%] t-mx-auto">
            <img className="t-w-full" src={Rec} />
          </div>

          <h5 className="fw-bold border-bottom pb-50 p-4 t-text-[25px] ">
            {getcourse1.title}
          </h5>

          <div className="t-flex t-justify-between t-text-[20px] t-p-8 t-w-[80%] ">
            <div className="t-flex t-flex-col t-gap-2">
              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>فعال:</div>
                <div>{getcourse1.active ? "بله" : "خیر"}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>موجودی:</div>
                <div>{getcourse1.capacity}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>قیمت:</div>
                <div>{getcourse1.cost}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>تعداد کامنت:</div>
                <div>{getcourse1.courseCommentTotal}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>تعداد گروه:</div>
                <div>{getcourse1.courseGroupTotal}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>کد کورس:</div>
                <div>{getcourse1.courseId}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>کد سطح دوره:</div>
                <div>{getcourse1.courseLvlId}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>برنامه‌ها:</div>
                {/* <ShareProjectExample /> */}
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>وضعیت دوره:</div>
                <div>{getcourse1.courseStatusName}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>تعداد دانش آموزان</div>
                <ShareProjectExample array={getcourse1.courseStudent} />
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>تعداد مدرس‌ها:</div>
                {/* <ShareProjectExample /> */}
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>فعال</div>
                <div>{getcourse1.isActive ? "بله" : "خیر"}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>حذف شده:</div>
                <div>{getcourse1.isDelete ? "بله" : "خیر"}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>تعداد لایک:</div>
                <div>{getcourse1.likeCount}</div>
              </div>
            </div>

            <div className="t-flex t-flex-col t-gap-2">
              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>لایک کاربر فعلی:</div>
                <div>{getcourse1.currentUserLike}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>توضیحات:</div>
                <div>{getcourse1.describe}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>تعداد دیسلایک:</div>
                <div>{getcourse1.dissLikeCount}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>پایان دوره:</div>
                <div>{getcourse1.endTime}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>توضیح کوتاه:</div>
                <div>{getcourse1.miniDescribe}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>تعداد لایک دوره:</div>
                <div>{getcourse1.courseLikeTotal}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>تعداد پرداخت‌ها:</div>
                {/* <div>{getcourse1.payments?.length || 0}</div> */}
                <div className="t-px-3 t-py-2 t-text-[#f8f8f8] t-text-[14px] t-rounded-[8px] t-bg-[#7367f0] t-cursor-pointer">
                  مشاهده
                </div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>تعداد رزرو:</div>
                <div>{getcourse1.reserveUserTotal}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>شروع دوره:</div>
                <div>{getcourse1.startTime}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>کد وضعیت:</div>
                <div>{getcourse1.statusId}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>نام وضعیت:</div>
                <div>{getcourse1.statusName}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>کد مدرس:</div>
                <div>{getcourse1.teacherId}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>نام مدرس:</div>
                <div>{getcourse1.teacherName}</div>
              </div>

              <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                <div>امتیاز دوره:</div>
                <div>{getcourse1.courseRate}</div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              اصلاح
            </Button>

            <Button color="danger" outline className="ms-1">
              حذف
            </Button>
            <Button color="danger" outline className="ms-1">
              غیرفعال
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg">
        <ModalHeader toggle={() => setShow(false)}>Edit User</ModalHeader>

        <ModalBody>
          <Row className="gy-1">
            <Col md={6}>
              <Label>First Name</Label>
              <Input defaultValue="John" />
            </Col>

            <Col md={6}>
              <Label>Last Name</Label>
              <Input defaultValue="Doe" />
            </Col>

            <Col md={12}>
              <Label>Username</Label>
              <Input defaultValue={selectedUser.username} />
            </Col>

            <Col md={6}>
              <Label>Email</Label>
              <Input defaultValue={selectedUser.email} />
            </Col>

            <Col md={6}>
              <Label>Contact</Label>
              <Input defaultValue={selectedUser.contact} />
            </Col>

            <Col md={12} className="text-center mt-2">
              <Button color="primary" className="me-1">
                Save
              </Button>

              <Button color="secondary" outline onClick={() => setShow(false)}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default UserInfoCard;
