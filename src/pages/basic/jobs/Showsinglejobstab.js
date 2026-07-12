import { Fragment, useEffect, useState } from "react";
import { GetJobByIdCall } from "../../../core/Interceptor/Courses/getjobbyidcall";
import Rec from "./Rectangle.png";
import { Button, Modal, ModalBody, ModalHeader, Input } from "reactstrap";
import { Editjobs } from "../../../core/Interceptor/Courses/Editjobs";
import { EditJobscall } from "../../../core/Interceptor/Courses/EditJobscall";
import toast from "react-hot-toast";
const Showsinglejobstab = ({ array, state }) => {
  // '7OVVhTYiXDGLXj0l8Ph36'
  const [refresh, setrefresh] = useState(false);
  const [show, setShow] = useState(false);
  const [showedit, setshowedit] = useState(false);
  const [newvalue, setnewvalue] = useState({
    worktitle: "",
    workDescribe: "",
    assistanceId: "",
    workDate: "",
    id: array,
  });
  const [getcourse1, setgetcoursebyid] = useState({});

  const [showbottom, setshowbotom] = useState(state);
  const run = async () => {
    const getbyid = await GetJobByIdCall(array);
    if (getbyid) {
      console.log("getjobbyid", getbyid);
      setgetcoursebyid(getbyid.data);
      setnewvalue((prev) => ({
        ...prev,
        worktitle: getbyid.data.worktitle,
        workDescribe: getbyid.data.workDescribe,
        assistanceId: getbyid.data.assistanceId,
        workDate: new Date(getbyid.data.workDate).toISOString().slice(0, 16),
        id: array,
      }));
    }
  };

  useEffect(() => {
    run();
  }, [array, refresh]);

  useEffect(() => {
    if (state) {
      setShow(true);
    }
  }, []);

  const handleSubmit = async () => {
    const fixdate = {
      ...newvalue,
      workDate: new Date(newvalue.workDate).toISOString(),
    };
    const res = await EditJobscall(fixdate);
    console.log("new valuedas", res);
    if (res.data.success) {
      toast.success("عملیات با موفقیت انجام شد");
      setshowedit(false);
      setrefresh(!refresh);
    } else {
      toast.error("عملیات با شکست مواجه شد");
      setshowedit(false);
      setrefresh(!refresh);
    }
  };

  return (
    <Fragment>
      {!state && (
        <div
          className="text-truncate fw-bolder t-p-3 t-cursor-pointer t-bg-[#f3f2f7] t-rounded-[8px] hover:t-bg-[#6256e2] hover:t-text-[#f8f8f8] t-duration-300 t-transition-all"
          onClick={() => setShow(true)}>
          مشاهده
        </div>
      )}

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg">
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}></ModalHeader>

        <ModalBody className="px-sm-5 mx-50 pb-4">
          <h1 className="text-center mb-1">مشاهده جزئیات کار</h1>
          <div className=" t-w-[90%] t-mx-auto">
            <img className="t-w-full" src={Rec} alt="job-header" />
          </div>

          <h5 className="fw-bold border-bottom pb-50 p-4 t-text-[25px]">
            {getcourse1.worktitle}
          </h5>
          {showedit ? (
            <div className="t-flex t-flex-col t-gap-3 t-p-4">
              <div>
                <label htmlFor="worktitle">نام شغل</label>
                <Input
                  type="text"
                  name="worktitle"
                  placeholder={getcourse1.worktitle}
                  value={newvalue.worktitle}
                  onChange={(e) => {
                    setnewvalue((prev) => ({
                      ...prev,
                      worktitle: e.target.value,
                    }));
                  }}
                />
              </div>

              <div>
                <label htmlFor="workDescribe">توضیحات</label>
                <Input
                  type="textarea"
                  name="workDescribe"
                  placeholder={getcourse1.workDescribe}
                  value={newvalue.workDescribe}
                  onChange={(e) => {
                    setnewvalue((prev) => ({
                      ...prev,
                      workDescribe: e.target.value,
                    }));
                  }}
                />
              </div>

              <div>
                <label htmlFor="assistanceId">شناسه مشاور</label>
                <Input
                  type="text"
                  name="assistanceId"
                  placeholder={getcourse1.assistanceId}
                  value={newvalue.assistanceId}
                  onChange={(e) => {
                    setnewvalue((prev) => ({
                      ...prev,
                      assistanceId: e.target.value,
                    }));
                  }}
                />
              </div>

              <div>
                <label htmlFor="workDate">تاریخ</label>
                <Input
                  type="datetime-local"
                  name="workDate"
                  placeholder={getcourse1.workDate}
                  value={newvalue.workDate}
                  onChange={(e) => {
                    setnewvalue((prev) => ({
                      ...prev,
                      workDate: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="t-flex t-flex-row t-justify-between t-text-[14px] t-p-8 t-w-[100%] t-mx-auto t-border t-border-gray-200">
              <div className="t-flex t-flex-col t-gap-2">
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">شناسه کار:</div>
                  <div>{getcourse1.id}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">نام مشاور:</div>
                  <div>
                    {getcourse1.assistance?.user?.fName}{" "}
                    {getcourse1.assistance?.user?.lName}
                  </div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">تاریخ:</div>
                  <div>{getcourse1.workDate}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">توضیحات:</div>
                  <div className="t-text-justify">
                    {getcourse1.workDescribe}
                  </div>
                </div>
              </div>

              <div className="t-flex t-flex-col t-gap-2">
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">شناسه مشاور:</div>
                  <div>{getcourse1.assistanceId}</div>
                </div>
              </div>
            </div>
          )}

          <div className="">
            <div>
              <div className="d-flex justify-content-center pt-2">
                {showedit && (
                  <Button
                    className="ms-1 bg-success t-text-white"
                    color="bg-success"
                    onClick={() => {
                      handleSubmit();
                    }}>
                    ارسال
                  </Button>
                )}

                <Button
                  onClick={() => {
                    setshowedit(!showedit);
                  }}
                  className="ms-1 "
                  color="primary">
                  {showedit ? "انصراف" : "اصلاح"}
                </Button>

                <Button color="danger" outline className="ms-1">
                  حذف
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default Showsinglejobstab;
