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
import Addnewjob from "./addnewjob";
// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";
import Editjob from "./Editjob";

const Updatejobsmenu = () => {
  return (
    <Fragment>
      <Breadcrumbs
        title="بروزرسانی مشاغل"
        data={[{ title: "منو" }, { title: "بروزرسانی مشاغل" }]}
      />
      <Editjob />
      <Addnewjob />
    </Fragment>
  );
};

export default Updatejobsmenu;
