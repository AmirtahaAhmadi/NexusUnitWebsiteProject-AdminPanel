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
import AssitanceList from "./assitanceList";
const Assistance = () => {
  return (
    <Fragment>
      <Breadcrumbs
        title="مشاوران"
        data={[{ title: "منو" }, { title: "مشاوران" }]}
      />
      <AssitanceList />
    </Fragment>
  );
};

export default Assistance;
