import React from 'react';
import { Badge, Card, CardHeader, Progress } from "reactstrap";

import { Check, ChevronDown, Trash2, X } from "react-feather";
import DataTable from "react-data-table-component";

import "@styles/react/libs/tables/react-dataTable-component.scss";

import Avatar from "@components/avatar";

import { useEffect, useState } from "react";
import { getCourseDetails, getCourseGroupId, getUserCourseReserve } from "../../../../core/Interceptor/Services/UserServices/get";
import { dateToLocal } from "../store/DateToLocalFunction";
import { DelCourseReserve, GetCourseTeacherId, SendReserveToCourse } from '../store/functions';
import { Link } from "react-router-dom";

const renderClient = (row, rowName) => {
  if (row != null) {
    return (
      <Avatar className="me-1" img={row} width="32" height="32" />
    );
  } else {
    return (
      <Avatar
        initials
        className="me-1"
        color={"light-primary"}
        content={rowName || ""}
      />
    );
  }
};

const statusColors = {
  true: "light-success",
  false: "light-danger",
};

const UserReservedCoursesList = ({ currentUserDetails, setUserDetailsRenderCount }) => {
  const columns2 = [
    {
      sortable: true,
      minWidth: "250px",
      name: "نام دوره",
      selector: (row) => row.courseName,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          {renderClient(userRCoursesImageAddress[row.courseId], row.courseName)}
          <div style={{ gap: "2px" }} className="d-flex">
            <span className="fw-bolder">{row.courseName || '--'}</span>
          </div>
        </div>
      ),
    },
    {
      name: "تاریخ رزرو",
      selector: (row) => dateToLocal(row.insertDate),
    },
    {
      name: "وضعیت",
      selector: (row) => row.accept,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div style={{ gap: "2px" }} className="d-flex">
            <Badge
              className="text-capitalize"
              color={statusColors[row.accept]}
            >
              {row.accept ? 'تایید شده' : 'تایید نشده'}
            </Badge>
          </div>
        </div>
      ),
    },
    {
      name: "عملیات",
      selector: (row) => row.accept,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <div style={{ gap: "6px" }} className="d-flex">
            {!row.accept && (
              <>
                <button type='button' style={{ background: "none", border: "none" }} onClick={() => {
                  SendReserveToCourse(row.courseId, userRCoursesGroupId[row.courseId], row.userId)
                  setUserDetailsRenderCount(prev => prev + 1)
                }}>
                  <Badge
                    style={{ background: 'none' }}
                    className="text-capitalize cursor-pointer"
                    color='success'
                  >
                    <Check size={20} />
                  </Badge>
                </button>
              </>
            )}
            <button type='button' style={{ background: "none", border: "none" }} onClick={() => {
              DelCourseReserve(row.id)
              setUserDetailsRenderCount(prev => prev + 1)
            }}>
              <Trash2 size={20} className='text-danger' />
            </button>
          </div>
        </div>
      ),
    },
  ];
  const [userRCoursesGroupId, setUserRCoursesGroupId] = useState({});
  const [userRCoursesImageAddress, setUserRCoursesImageAddress] = useState({});
  const fetchGetUserReservedCourses = async () => {
    try {
      const requests = currentUserDetails.courseReserve.map((vals) =>
        getCourseDetails(vals.courseId),
      );
      const responses = await Promise.all(requests);
      const imageAddresses = {};
      responses.forEach((r) => {
        imageAddresses[r.data.courseId] = r.data.imageAddress;
      });
      setUserRCoursesImageAddress(imageAddresses);
      const groupIdRequests = responses.map((r) => getCourseGroupId(r.data.teacherId, r.data.courseId));
      const groupIdResponses = await Promise.all(groupIdRequests);
      // console.log(groupIdResponses)
      const groupIdMap = {};
      groupIdResponses.forEach((result) => {
        groupIdMap[result.data[0]?.CourseId] = result.data[0]?.groupId || '';
      });
      setUserRCoursesGroupId(groupIdMap);
      // console.log(responses);
    } catch (error) {
      console.error("userCoursesGroupList error:", error);
    }
  };
  useEffect(() => {
    fetchGetUserReservedCourses();
  }, []);

  // useEffect(() => {
  //   console.log(userRCoursesGroupId)
  //   console.log(userRCoursesImageAddress)
  // }, [userRCoursesGroupId]);

  return (
    <>
      <Card>
        <CardHeader tag="h4">دوره های رزرو شده</CardHeader>
        <div className="react-dataTable user-view-account-projects">
          <DataTable
            noHeader
            responsive
            columns={columns2}
            data={currentUserDetails.courseReserve}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
          />
        </div>
      </Card>
    </>
  );
}

export default UserReservedCoursesList;