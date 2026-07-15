// ** React Imports
import { Fragment } from "react";

// ** Demo Components

import JobsTable from "./JobsTable";
// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

const Jobstitleanddata = () => {
  return (
    <Fragment>
      <Breadcrumbs
        title="لیست مشاغل"
        data={[{ title: "منو" }, { title: "لیست مشاغل" }]}
      />
      <JobsTable />
    </Fragment>
  );
};

export default Jobstitleanddata;
