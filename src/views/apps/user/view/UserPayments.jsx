// ** React Imports
import { Fragment, useEffect, useState } from "react";

import { Check, ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import { Badge, Card, CardHeader, Progress, UncontrolledTooltip } from "reactstrap";

import Avatar from "@components/avatar";

import "@styles/react/libs/tables/react-dataTable-component.scss";
import { getUserPayments } from "../../../../core/Interceptor/Services/UserServices/get";
import { dateToLocal } from "../store/DateToLocalFunction";

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

const statusObj = {
  true: "light-success",
  false: "light-danger",
};

const columns = [
  {
    sortable: true,
    minWidth: "200px",
    name: "نام دوره",
    selector: (row) => row.course.title,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        {renderClient(row.course.imageAddress, row.course.title)}
        <div style={{ gap: "2px" }} className="d-flex">
          <span className="fw-bolder">{row.course.title || '--'}</span>
        </div>
      </div>
    ),
  },
  {
    name: "مبلغ پرداختی",
    minWidth: "100px",
    selector: (row) => row.paid,
  },
  {
    name: "تاریخ پرداخت",
    minWidth: "100px",
    selector: (row) => dateToLocal(row.PeymentDate),
  },
  {
    name: "شناسه پرداخت",
    minWidth: "100px",
    selector: (row) => row.PaymentInvoiceNumber,
  },
  {
    name: "وضعیت",
    minWidth: "100px",
    sortable: true,
    sortField: "status",
    selector: (row) => row.accept,
    cell: (row) => (
      <Badge className="text-capitalize" color={statusObj[row.accept]} pill>
        {row.accept == true ? "تایید شده" : "تایید نشده"}
      </Badge>
    ),
  },
  {
    name: "عملیات",
    minWidth: "150px",
    cell: (row) => (
      <div style={{ alignItems: "center", gap: "6px" }} className="d-flex">
        {row.accept ? (
          <span>پرداخت تایید شده</span>
        ) : (
          <>
            <button
              id="acceptPTop"
              style={{ background: "none", border: "none" }}
            >
              <Badge
                style={{ background: "none" }}
                className="text-capitalize cursor-pointer"
                color="success"
              >
                <Check size={20} />
              </Badge>
            </button>
            <UncontrolledTooltip placement="top" target="acceptPTop">
              تایید کردن پرداخت
            </UncontrolledTooltip>
          </>
        )}
      </div>
    ),
  },
];

const UserPayments = ({ currentUserDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userPayments, setUserPayments] = useState([]);

  const fetchUserPayments = async () => {
    setIsLoading(true)
    try {
      const response = await getUserPayments({
        // courseId: '',
        studentId: currentUserDetails.id,
      })
      // console.log(response.data)
      setUserPayments(response.data)
    } catch (error) {
      console.log('userPayList error: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUserPayments()
  }, [])
  return (
    <Fragment>
      <Card>
        <CardHeader tag="h4">پرداخت ها</CardHeader>
        <div className="react-dataTable user-view-account-projects">
          <DataTable
            noHeader
            responsive
            columns={columns}
            data={userPayments}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default UserPayments;
