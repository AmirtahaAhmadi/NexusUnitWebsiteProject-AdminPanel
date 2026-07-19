
import React from "react";

import { Card, CardBody, CardTitle, Input, Label, Button, Badge } from "reactstrap";
import { Check, X, Link, Linkedin, Send } from "react-feather";

import linkedinIcon from "@src/assets/images/icons/social/linkedin.png";
import { dateToLocal } from "../store/DateToLocalFunction";

const UserSocialMedia = ({ currentUserDetails }) => {

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle className="mb-75">شبکه های اجتماعی</CardTitle>
          <div className="d-flex flex-column mt-2">
            <div style={{ gap: '15px' }} className="d-flex align-item-center">
              <Linkedin className="text-primary" size={40} />
              <div className="d-flex flex-column align-item-center">
                <p style={{height:'7px'}} className="fw-bolder me-25">لینکدین: </p>
                <span>{currentUserDetails.linkdinProfile || '--'}</span>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column mt-2">
            <div style={{ gap: '15px' }} className="d-flex align-item-center">
              <Send className="text-primary" size={40} />
              <div className="d-flex flex-column align-item-center">
                <p style={{height:'7px'}} className="fw-bolder me-25">تلگرام: </p>
                <span>{currentUserDetails.telegramLink || '--'}</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default UserSocialMedia;
