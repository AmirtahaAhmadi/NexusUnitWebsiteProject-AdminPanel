import { useState, Fragment, useEffect } from "react";
import { dateToLocal } from "../../core/Interceptor/reusablefunctions/DateTolocal";
import { saveAs } from "file-saver";
import { FindFormat } from "../../core/Interceptor/findFormat.js/FindFormat";
import { Card, CardBody, Button, Modal, ModalHeader } from "reactstrap";
import toast from "react-hot-toast";
import { DeleteSessionFileCall } from "../../core/Interceptor/Courses/DeleteSessionFileCall";
import { useRefresh } from "../../redux/zustan/refreshCourselvl";

const SessionDetailWithID = ({ getcourse, GetHomeWork }) => {
  const refresh = useRefresh((state) => state.refresh);
  const setRefresh = useRefresh((state) => state.setRefresh);
  const [show, setShow] = useState(false);
  const [getcourse1, setgetcourse1] = useState([]);
  const [HomeWorks, SethomeWorks] = useState([]);

  useEffect(() => {
    setgetcourse1(getcourse);
    SethomeWorks(GetHomeWork);
  }, [getcourse, refresh, HomeWorks]);

  useEffect(() => {
    console.log("HomeWorks", HomeWorks.data);
  }, [HomeWorks]);

  const handleRemove = async (id) => {
    const result = await DeleteSessionFileCall(id);
    if (result) {
      setRefresh();
      toast.success("عملیات انجام شد");
    } else {
      toast.error("عملیات با خطا مواجه شد");
    }
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="t-mt-6">
            <h4 className="t-border-b-2">تکالیف جلسه</h4>

            {HomeWorks?.data?.length > 0 ? (
              HomeWorks.data.map((item) => (
                <div
                  key={item.homeWorkId}
                  className="t-p-4 t-mb-4 t-border t-border-gray-200 t-rounded-xl t-bg-gray-50">
                  <div className="t-flex t-gap-2 t-mb-2 t-flex-wrap">
                    <span className="t-font-bold t-min-w-[90px]">عنوان:</span>
                    <span className="t-text-gray-700">{item.hwTitle}</span>
                  </div>

                  <div className="t-flex t-gap-2 t-mb-2 t-flex-wrap">
                    <span className="t-font-bold t-min-w-[90px]">توضیحات:</span>
                    <span className="t-text-gray-700">{item.hwDescribe}</span>
                  </div>

                  <div className="t-flex t-gap-2 t-mb-2 t-flex-wrap">
                    <span className="t-font-bold t-min-w-[90px]">
                      نام گروه:
                    </span>
                    <span className="t-text-gray-700">{item.groupName}</span>
                  </div>

                  <div className="t-flex t-gap-2 t-mb-2 t-flex-wrap">
                    <span className="t-font-bold t-min-w-[90px]">تاریخ:</span>
                    <span className="t-text-gray-700">
                      {dateToLocal(item.homeWorkDate)}
                    </span>
                  </div>

                  <div className="t-flex t-gap-2 t-flex-wrap">
                    <span className="t-font-bold t-min-w-[90px]">شناسه:</span>
                    <span className="t-text-gray-700">{item.homeWorkId}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="t-p-4 t-text-center t-text-gray-500 t-border t-border-dashed t-border-gray-300 t-rounded-xl">
                تکلیفی وجود ندارد
              </div>
            )}
          </div>

          {getcourse1?.sessionFileDtos?.length > 0 && (
            <h4 className="t-border-b-2 t-mb-2 t-mt-6">
              {getcourse1.sessionTitle}
            </h4>
          )}

          {getcourse1?.sessionFileDtos?.length > 0 ? (
            getcourse1.sessionFileDtos.map((item) => (
              <div
                key={item.id}
                className="t-p-4 t-mb-4 t-border  t-border-gray-200 t-rounded-xl t-bg-gray-50">
                <div className="t-flex t-gap-2 t-mb-2 t-flex-wrap">
                  <span className="t-font-bold t-min-w-[90px]">نام فایل:</span>
                  <span>{item.fileName}</span>
                </div>

                <div className="t-flex t-gap-2 t-mb-2 t-flex-wrap">
                  <span className="t-font-bold t-min-w-[90px]">
                    شناسه فایل:
                  </span>
                  <span>{item.id}</span>
                </div>

                <div className="t-flex t-gap-2 t-mb-2 t-flex-wrap">
                  <span className="t-font-bold t-min-w-[90px]">فرمت فایل:</span>
                  <span>{FindFormat(item.fileFormat)}</span>
                </div>

                <div className="t-flex t-gap-2 t-mb-2 t-flex-wrap">
                  <span className="t-font-bold t-min-w-[90px]">تاریخ ثبت:</span>
                  <span>{dateToLocal(item.insertDate)}</span>
                </div>

                <div className="t-flex t-gap-2 t-mt-4 t-flex-wrap">
                  <Button
                    className="t-my-1"
                    onClick={() => saveAs(item.fileAddress, item.fileName)}
                    color="primary">
                    دانلود
                  </Button>

                  <Button
                    outline
                    className="t-my-1"
                    onClick={() => handleRemove(item.id)}
                    color="secondary">
                    حذف
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="t-p-4 t-text-center t-border t-border-dashed t-border-gray-300 t-rounded-xl">
              فایل ها خالیست
            </div>
          )}
        </CardBody>
      </Card>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg">
        <ModalHeader toggle={() => setShow(false)}>Edit User</ModalHeader>
      </Modal>
    </Fragment>
  );
};

export default SessionDetailWithID;
