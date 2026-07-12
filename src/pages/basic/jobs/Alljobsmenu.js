// ** React Imports
import { Fragment } from "react";

// ** Demo Components
import CardTitles from "../CardTitles";
import CardImages from "../CardImages";
import CardLayout from "../CardLayout";
import CardNavigation from "../CardNavigation";
import CardHeaderFooter from "../CardHeaderFooter";
import CardContentTypes from "../CardContentTypes";
import CardTextAlignment from "../CardTextAlignment";
import CardStyleVariation from "../CardStyleVariation";
import JobsTable from "./JobsTable";
// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
import Editjob from "./Editjob";

const Alljobsmenu = () => {
  return (
    <Fragment>
      <Breadcrumbs
        title="تمام مشاغل"
        data={[{ title: "منو" }, { title: "تمام مشاغل" }]}
      />

      <JobsTable />
    </Fragment>
  );
};

export default Alljobsmenu;
