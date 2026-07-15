import React from "react";

export const SingleCourseDetail = ({ getcourse1 }) => {
  return (
    <div className="t-flex t-flex-row t-justify-between t-text-[14px] t-p-8 t-w-[100%] t-mx-auto t-border t-border-red-800">
      <div className="t-flex t-flex-col t-gap-2">
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
  );
};
