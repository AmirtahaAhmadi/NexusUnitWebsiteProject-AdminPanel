import { Fragment, useEffect, useState } from "react";

import { Button, Modal, ModalBody, ModalHeader, Input } from "reactstrap";
import { EditTech } from "../../core/Interceptor/Courses/EditTech";
import toast from "react-hot-toast";
import { EditTechCall } from "../../core/Interceptor/Courses/EditTechCall";
const ShowSingleTechTab = ({ array, state }) => {
  const [refresh, setrefresh] = useState(false);
  const [show, setShow] = useState(false);
  const [showedit, setshowedit] = useState(false);
  const [newvalue, setnewvalue] = useState({
    techName: "",
    parentId: array.id,
    describe: "",
    iconAddress: "",
    id: array.id,
  });
  const [getcourse1, setgetcoursebyid] = useState({});

  const [showbottom, setshowbotom] = useState(state);

  useEffect(() => {
    setgetcoursebyid(array);
    console.log("this for array", array);
  }, [array, refresh]);

  useEffect(() => {
    if (state) {
      setShow(true);
    }
  }, []);

  const handleSubmit = async () => {
    const res = await EditTechCall(getcourse1);
    console.log("new valuedas", res);
    if (res) {
      toast.success("عملیات با موفقیت انجام شد");
      setshowedit(false);
      setrefresh(!refresh);
    } else {
      console.log("failed ", res);
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
          <h1 className="text-center mb-1">مشاهده جزئیات تکنولوژی</h1>

          <h5 className="fw-bold border-bottom pb-50 p-4 t-text-[25px]">
            {getcourse1.techName}
          </h5>

          {showedit ? (
            <div className="t-flex t-flex-col t-gap-3 t-p-4">
              <div>
                <label htmlFor="techName">نام تکنولوژی</label>
                <Input
                  type="text"
                  name="techName"
                  placeholder={getcourse1.techName}
                  value={newvalue.techName}
                  onChange={(e) => {
                    setnewvalue((prev) => ({
                      ...prev,
                      techName: e.target.value,
                    }));
                  }}
                />
              </div>

              <div>
                <label htmlFor="describe">توضیحات</label>
                <Input
                  type="textarea"
                  name="describe"
                  placeholder={getcourse1.describe}
                  value={newvalue.describe}
                  onChange={(e) => {
                    setnewvalue((prev) => ({
                      ...prev,
                      describe: e.target.value,
                    }));
                  }}
                />
              </div>

              <div>
                <label htmlFor="iconAddress">آدرس آیکون</label>
                <Input
                  type="text"
                  name="iconAddress"
                  placeholder={getcourse1.iconAddress}
                  value={newvalue.iconAddress}
                  onChange={(e) => {
                    setnewvalue((prev) => ({
                      ...prev,
                      iconAddress: e.target.value,
                    }));
                  }}
                />
              </div>

              {/* <div>
                <label htmlFor="parentId">شناسه والد</label>
                <Input
                  type="text"
                  name="parentId"
                  placeholder={getcourse1.id}
                  value={newvalue.id}
                  onChange={(e) => {
                    setnewvalue((prev) => ({
                      ...prev,
                      id: e.target.value,
                    }));
                  }}
                />
              </div> */}
            </div>
          ) : (
            <div className="t-flex t-flex-row t-justify-between t-text-[14px] t-p-8 t-w-[100%] t-mx-auto t-border t-border-gray-200">
              <div className="t-flex t-flex-col t-gap-2">
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">شناسه:</div>
                  <div>{getcourse1.id}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">نام تکنولوژی:</div>
                  <div>{getcourse1.techName}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">توضیحات:</div>
                  <div className="t-text-justify">{getcourse1.describe}</div>
                </div>
              </div>

              <div className="t-flex t-flex-col t-gap-2">
                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">آدرس آیکون:</div>
                  <div>{getcourse1.iconAddress}</div>
                </div>

                <div className="t-flex t-flex-row t-flex-wrap t-gap-2">
                  <div className="fw-bold">شناسه والد:</div>
                  <div>{getcourse1.parentId}</div>
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

export default ShowSingleTechTab;
