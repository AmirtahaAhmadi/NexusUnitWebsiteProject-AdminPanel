// ** React Imports
import { Fragment } from "react";

// ** Demo Components
import CardTitles from "./CardTitles";
import CardImages from "./CardImages";
import CardLayout from "./CardLayout";
import CardNavigation from "./CardNavigation";
import CardHeaderFooter from "./CardHeaderFooter";
import CardContentTypes from "./CardContentTypes";
import CardTextAlignment from "./CardTextAlignment";
import CardStyleVariation from "./CardStyleVariation";

// ** Custom Components
import Breadcrumbs from "@components/breadcrumbs";

const BasicCards = () => {
  return (
    <Fragment>
      <Breadcrumbs
        title="تمام دوره ها"
        data={[{ title: "منو" }, { title: "تمام دوره ها" }]}
      />
      <CardTitles />
    </Fragment>
  );
};

export default BasicCards;
