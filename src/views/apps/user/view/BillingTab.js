// ** React Imports
import { Fragment, useEffect, useState } from "react";

import { ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import { Card, CardHeader, Progress } from "reactstrap";

import "@styles/react/libs/tables/react-dataTable-component.scss";
import { getUserPayments } from "../../../../core/Interceptor/Services/UserServices/get";

export const columns1 = [
  {
    sortable: true,
    minWidth: "350px",
    name: "آیدی",
    selector: (row) => row.id,
  },
  {
    name: "آیدی دوره",
    selector: (row) => row.courseId,
  },
  {
    name: "آیدی گروه دوره",
    selector: (row) => row.courseGroupId,
  },
];

const BillingTab = ({ currentUserDetails }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userPayments, setUserPayments] = useState([]);

  const fetchUserPayments = async () => {
    setIsLoading(true)
    try {
      const response = await getUserPayments({
        courseId: '8db2fd23-78ca-43bd-8f32-4c0d5c8d1f97',
        // studentId: currentUserDetails.id,
      })
      console.log(response.data)
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
            // columns={''}
            // data={''}
            className="react-dataTable"
            sortIcon={<ChevronDown size={10} />}
          />
        </div>
      </Card>
    </Fragment>
  );
};

export default BillingTab;
