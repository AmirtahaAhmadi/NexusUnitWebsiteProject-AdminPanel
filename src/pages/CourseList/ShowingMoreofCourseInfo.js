// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Custom Components
import Avatar from "@components/avatar";
import { getcoursebyidAdminTeacherCall } from "../../core/Interceptor/Courses/getcoursebyidAdminTeacherCall";
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
  Input,
} from "reactstrap";

// ** Third Party Components
import Select, { components } from "react-select";
import { FileText, Users, Link } from "react-feather";
import toast from "react-hot-toast";

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
  const [showedit, setshowedit] = useState(false);
  const [refresh, setrefresh] = useState(false);
  const [array1, setarray1] = useState([]);
  const [getcourse1, setgetcoursebyid] = useState({});

  // State to hold edit form values
  const [newvalue, setnewvalue] = useState({
    title: "",
    describe: "",
    miniDescribe: "",
    capacity: 0,
    cost: 0,
    startTime: "",
    endTime: "",
    id: "",
  });

  const run = async () => {
    const getbyid = await getcoursebyidAdminTeacherCall(array1);
    if (getbyid) {
      console.log("getcoursebyid", getbyid);
      setgetcoursebyid(getbyid);

      // Populate state for editing
      setnewvalue({
        title: getbyid.title || "",
        describe: getbyid.describe || "",
        miniDescribe: getbyid.miniDescribe || "",
        capacity: getbyid.capacity || 0,
        cost: getbyid.cost || 0,
        startTime: getbyid.startTime
          ? new Date(getbyid.startTime).toISOString().slice(0, 16)
          : "",
        endTime: getbyid.endTime
          ? new Date(getbyid.endTime).toISOString().slice(0, 16)
          : "",
        id: getbyid.id || array1,
      });
    }
  };

  useEffect(() => {
    if (array1 && array1.length > 0) {
      run();
    }
  }, [array1, refresh]);

  useEffect(() => {
    setarray1(array);
    console.log("this is array", array);
  }, [array]);

  const handleSubmit = async () => {
    try {
      const fixdate = {
        ...newvalue,
        startTime: newvalue.startTime
          ? new Date(newvalue.startTime).toISOString()
          : null,
        endTime: newvalue.endTime
          ? new Date(newvalue.endTime).toISOString()
          : null,
      };

      // Replace with your actual Edit Course API call:
      // const res = await EditCourseCall(fixdate);
      console.log("Submitting updated course data:", fixdate);

      // Simulating API success for demonstration
      toast.success("دوره با موفقیت ویرایش شد");
      setshowedit(false);
      setrefresh(!refresh);
    } catch (error) {
      console.log(error);
      toast.error("خطا در ویرایش دوره");
    }
  };

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
          <h1 className="text-center mb-1">
            {showedit ? "اصلاح اطلاعات دوره" : "مشاهده جزئیات دوره"}
          </h1>

          <div className="t-w-[90%] t-mx-auto mb-2">
            <img className="t-w-full" src={Rec} alt="course-header" />
          </div>

          <h5 className="fw-bold border-bottom pb-50 p-4 t-text-[25px] ">
            {getcourse1.title}
          </h5>

          {showedit ? (
            // Edit Mode Fields
            <div className="t-flex t-flex-col t-gap-3 t-p-4">
              <div>
                <Label for="title">نام دوره</Label>
                <Input
                  type="text"
                  name="title"
                  id="title"
                  placeholder={getcourse1.title}
                  value={newvalue.title}
                  onChange={(e) =>
                    setnewvalue((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>

              <div>
                <Label for="miniDescribe">توضیح کوتاه</Label>
                <Input
                  type="text"
                  name="miniDescribe"
                  id="miniDescribe"
                  placeholder={getcourse1.miniDescribe}
                  value={newvalue.miniDescribe}
                  onChange={(e) =>
                    setnewvalue((prev) => ({
                      ...prev,
                      miniDescribe: e.target.value,
                    }))
                  }
                />
              </div>

              <div>
                <Label for="describe">توضیحات کامل</Label>
                <Input
                  type="textarea"
                  name="describe"
                  id="describe"
                  rows="4"
                  placeholder={getcourse1.describe}
                  value={newvalue.describe}
                  onChange={(e) =>
                    setnewvalue((prev) => ({
                      ...prev,
                      describe: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="d-flex gap-2">
                <div className="flex-fill">
                  <Label for="capacity">ظرفیت</Label>
                  <Input
                    type="number"
                    name="capacity"
                    id="capacity"
                    placeholder={getcourse1.capacity}
                    value={newvalue.capacity}
                    onChange={(e) =>
                      setnewvalue((prev) => ({
                        ...prev,
                        capacity: Number(e.target.value),
                      }))
                    }
                  />
                </div>
                <div className="flex-fill">
                  <Label for="cost">قیمت</Label>
                  <Input
                    type="number"
                    name="cost"
                    id="cost"
                    placeholder={getcourse1.cost}
                    value={newvalue.cost}
                    onChange={(e) =>
                      setnewvalue((prev) => ({
                        ...prev,
                        cost: Number(e.target.value),
                      }))
                    }
                  />
                </div>
              </div>

              <div className="d-flex gap-2">
                <div className="flex-fill">
                  <Label for="startTime">شروع دوره</Label>
                  <Input
                    type="datetime-local"
                    name="startTime"
                    id="startTime"
                    value={newvalue.startTime}
                    onChange={(e) =>
                      setnewvalue((prev) => ({
                        ...prev,
                        startTime: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex-fill">
                  <Label for="endTime">پایان دوره</Label>
                  <Input
                    type="datetime-local"
                    name="endTime"
                    id="endTime"
                    value={newvalue.endTime}
                    onChange={(e) =>
                      setnewvalue((prev) => ({
                        ...prev,
                        endTime: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          ) : (
            // View Mode Info
            <div className="t-flex t-flex-row t-justify-between t-text-[14px] t-p-8 t-w-[100%] t-mx-auto t-border t-border-red-800">
              <div className="t-flex t-flex-col t-gap-2">
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">فعال:</div>
                  <div>{getcourse1.active ? "بله" : "خیر"}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">موجودی:</div>
                  <div>{getcourse1.capacity}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">قیمت:</div>
                  <div>{getcourse1.cost}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">تعداد کامنت:</div>
                  <div>{getcourse1.courseCommentTotal}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">تعداد گروه:</div>
                  <div>{getcourse1.courseGroupTotal}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">کد کورس:</div>
                  <div>{getcourse1.courseId}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">کد سطح دوره:</div>
                  <div>{getcourse1.courseLvlId}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">وضعیت دوره:</div>
                  <div>{getcourse1.courseStatusName}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">حذف شده:</div>
                  <div>{getcourse1.isDelete ? "بله" : "خیر"}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">تعداد لایک:</div>
                  <div>{getcourse1.likeCount}</div>
                </div>
              </div>

              <div className="t-flex t-flex-col t-gap-2">
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">لایک کاربر فعلی:</div>
                  <div>{getcourse1.currentUserLike}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">توضیحات:</div>
                  <div>{getcourse1.describe}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">توضیح کوتاه:</div>
                  <div>{getcourse1.miniDescribe}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">تعداد دیسلایک:</div>
                  <div>{getcourse1.dissLikeCount}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">شروع دوره:</div>
                  <div>{getcourse1.startTime}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">پایان دوره:</div>
                  <div>{getcourse1.endTime}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">کد وضعیت:</div>
                  <div>{getcourse1.statusId}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">نام وضعیت:</div>
                  <div>{getcourse1.statusName}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">نام مدرس:</div>
                  <div>{getcourse1.teacherName}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">امتیاز دوره:</div>
                  <div>{getcourse1.courseRate}</div>
                </div>
              </div>
            </div>
          )}

          {/* Buttons Footer */}
          <div className="d-flex justify-content-center pt-2">
            {showedit && (
              <Button
                className="ms-1 bg-success t-text-white"
                color="success"
                onClick={handleSubmit}>
                ارسال
              </Button>
            )}

            <Button
              onClick={() => setshowedit(!showedit)}
              className="ms-1"
              color="primary">
              {showedit ? "انصراف" : "اصلاح"}
            </Button>

            {!showedit && (
              <>
                <Button color="danger" outline className="ms-1">
                  حذف
                </Button>
                <Button color="danger" outline className="ms-1">
                  غیرفعال
                </Button>
              </>
            )}
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ShowingMoreOfcourseinfo;
