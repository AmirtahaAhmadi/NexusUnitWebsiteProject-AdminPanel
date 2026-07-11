import React from 'react';
import { Badge, Card, CardHeader, Progress } from "reactstrap";

import { Check, ChevronDown, X } from "react-feather";
import DataTable from "react-data-table-component";

import "@styles/react/libs/tables/react-dataTable-component.scss";

import { useEffect, useState } from "react";
import { getCourseDetails, getUserCourseReserve } from "../../../../core/Interceptor/Services/UserServices/get";
import { dateToLocal } from "../store/DateToLocalFunction";
import { DelCourseReserve, SendReserveToCourse } from '../store/functions';

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
    },
    {
      name: "نام دانشجو",
      selector: (row) => row.studentName,
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
            {row.accept ? 'رزرو تایید شده' : (
              <>
                <button type='button' style={{ background: "none", border: "none" }} onClick={() => {
                  SendReserveToCourse(row.courseId, 'cg1', row.userId)
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
                <button type='button' style={{ background: "none", border: "none" }} onClick={() => {
                  DelCourseReserve(row.id)
                  // setUserDetailsRenderCount(prev => prev + 1)
                }}>
                  <Badge
                    style={{ background: 'none' }}
                    className="text-capitalize cursor-pointer"
                    color='danger'
                  >
                    <X size={20} />
                  </Badge>
                </button>
              </>
            )}
          </div>
        </div>
      ),
    },
  ];
  // const [userRCourses, setUserRCourses] = useState([]);
  // const fetchGetUserReservedCourses = async () => {
  //   try {
  //     const requests = currentUserDetails.courseReserve.map((vals) =>
  //       getCourseDetails(vals.courseId),
  //     );
  //     const responses = await Promise.all(requests);
  //     responses.map((r) => setUserRCourses((prev) => [...prev, r.data]));
  //     console.log(responses);
  //     // console.log(userCourses);
  //   } catch (error) {
  //     console.error("userCoursesGroupList error:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchGetUserReservedCourses();
  // }, []);

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