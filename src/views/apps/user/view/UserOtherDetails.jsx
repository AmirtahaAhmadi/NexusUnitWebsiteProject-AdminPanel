
import React from "react";

import { Card, CardBody, CardTitle, Input, Label, Button, Badge } from "reactstrap";
import { Check, X, Link } from "react-feather";

import linkedinIcon from "@src/assets/images/icons/social/linkedin.png";
import { dateToLocal } from "../store/DateToLocalFunction";


const statusColors = {
  true: "light-success",
  false: "light-danger",
};

const UserOtherDetails = ({ currentUserDetails }) => {

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className="mb-75">سایر اطلاعات کاربر</CardTitle>
          <div style={{ gap: '150px' }} className="d-flex align-item-center">
            <div className="d-flex flex-column mt-2">
              <div style={{ gap: '2px' }} className="d-flex align-item-center">
                <p className="fw-bolder me-25">درباره: </p>
                <span>{currentUserDetails.userAbout || '--'}</span>
              </div>
              <div style={{ gap: '2px' }} className="d-flex">
                <p className="fw-bolder me-25">ایمیل بازنشانی: </p>
                <span>{currentUserDetails.recoveryEmail || '--'}</span>
              </div>
              <div style={{ gap: '2px' }} className="d-flex">
                <p className="fw-bolder me-25">درصد تکمیل پروفایل: </p>
                <span>{currentUserDetails.profileCompletionPercentage} %</span>
              </div>
              <div style={{ gap: '2px' }} className="d-flex">
                <p className="fw-bolder me-25">ورود دو مرحله ای: </p>
                <span>
                  <Badge
                    className="text-capitalize"
                    color={statusColors[currentUserDetails.twoStepAuth]}
                  >
                    {currentUserDetails.twoStepAuth ? "فعال" : "غیر فعال"}
                  </Badge>
                </span>
              </div>
              <div style={{ gap: '2px' }} className="d-flex">
                <p className="fw-bolder me-25">تاریخ تولد: </p>
                <span>{dateToLocal(currentUserDetails.birthDay)}</span>
              </div>
              <div style={{ gap: '2px' }} className="d-flex">
                <p className="fw-bolder me-25">تاریخ عضویت: </p>
                <span>{dateToLocal(currentUserDetails.insertDate)}</span>
              </div>
            </div>
            <div className="d-flex flex-column mt-2">
              <div style={{ gap: '2px' }} className="d-flex">
                <p className="fw-bolder me-25">آدرس: </p>
                <span>{currentUserDetails.homeAdderess || '--'}</span>
              </div>
              <div style={{ gap: '2px' }} className="d-flex">
                <p className="fw-bolder me-25">مختصات طول جغرافیایی: </p>
                <span>{currentUserDetails.longitude || '--'}</span>
              </div>
              <div style={{ gap: '2px' }} className="d-flex">
                <p className="fw-bolder me-25">مختصات عرض جغرافیایی: </p>
                <span>{currentUserDetails.latitude || '--'}</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default UserOtherDetails;
