// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

import { getcoursebyidAdminTeacherCall } from "../../../core/Interceptor/Courses/getcoursebyidAdminTeacherCall";
import Rec from "./Rectangle.png";
// ** Reactstrap Imports
import {
  Card,
  Button,
  Label,
  Modal,
  CardBody,
  CardText,
  CardTitle,
  ListGroup,
  ModalBody,
  ModalHeader,
  DropdownMenu,
  DropdownItem,
  ListGroupItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Third Party Components
import Select, { components } from "react-select";
import { FileText, Users, Link } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Portrait Fallbacks
import portrait1 from "@src/assets/images/portrait/small/avatar-s-9.jpg";

const options = [
  { value: "Donna Frank", label: "Donna Frank" },
  { value: "Jane Foster", label: "Jane Foster" },
];

const OptionComponent = ({ data, ...props }) => {
  return (
    <components.Option {...props}>
      <div className="d-flex flex-wrap align-items-center">
        <div>{data.label}</div>
      </div>
    </components.Option>
  );
};

const ShowingMoreOfcourseinfo = ({ array }) => {
  const [show, setShow] = useState(false);
  const [array1, setarray1] = useState([]);
  const [getcourse1, setgetcoursebyid] = useState([]);
  const run = async () => {
    const getbyid = await getcoursebyidAdminTeacherCall(array1);
    if (getbyid) {
      console.log("getcoursebyid", getbyid);
      setgetcoursebyid(getbyid);
    }
  };
  useEffect(() => {
    run();
  }, [array1]);

  useEffect(() => {
    setarray1(array);
    console.log("this is array", array);
  }, [array]);

  return (
    <Fragment>
      <div
        className="text-truncate fw-bolder t-p-3 t-cursor-pointer t-bg-[#f3f2f7] t-rounded-[8px] hover:t-bg-[#6256e2] hover:t-text-[#f8f8f8] t-duration-300 t-transition-all"
        onClick={() => setShow(true)}>
        مشاهده
      </div>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg">
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}></ModalHeader>

        <ModalBody className="px-sm-5 mx-50 pb-4">
          <h1 className="text-center mb-1">مشاهده</h1>
          {/* <p className="text-center">Share project with team members</p> */}
          <div className="">
            <div>
              <div>
                <div className=" t-w-[90%] t-mx-auto">
                  <img className="t-w-full" src={Rec} />
                </div>

                <h5 className="fw-bold border-bottom pb-50 p-4 t-text-[25px] ">
                  {getcourse1.title}
                </h5>

                <div className="t-flex t-flex-row  t-justify-between t-text-[14px] t-p-8 t-w-[100%] t-mx-auto t-border t-border-red-800">
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
                      {/* <ShareProjectExample array={getcourse1.courseStudent} /> */}
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
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ShowingMoreOfcourseinfo;
