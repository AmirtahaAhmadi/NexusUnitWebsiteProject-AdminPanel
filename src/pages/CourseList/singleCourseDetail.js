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
          <div className="t-flex t-flex-col t-gap-2">
            <div className="fw-bold">توضیحات:</div>

            <div
              className="
      t-w-full
      dark:t-text-gray-300

      [&_h1]:t-text-4xl [&_h1]:t-font-bold [&_h1]:t-my-4
      [&_h2]:t-text-3xl [&_h2]:t-font-bold [&_h2]:t-my-3
      [&_h3]:t-text-2xl [&_h3]:t-font-semibold [&_h3]:t-my-2

      [&_p]:t-my-3 [&_p]:t-leading-8

      [&_ul]:t-list-disc [&_ul]:t-pr-6 [&_ul]:t-my-3
      [&_ol]:t-list-decimal [&_ol]:t-pr-6 [&_ol]:t-my-3
      [&_li]:t-my-2

      [&_img]:t-max-w-full [&_img]:t-rounded-xl

      [&_.text-small]:t-text-sm
      [&_.text-big]:t-text-2xl
      [&_.text-huge]:t-text-4xl

      [&_.pen-green]:t-bg-green-300
      [&_.pen-red]:t-bg-red-300
      [&_.pen-yellow]:t-bg-yellow-300
    "
              dangerouslySetInnerHTML={{
                __html: getcourse1.describe || "",
              }}
            />
          </div>
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
