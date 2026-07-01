// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** Demo Components
import WizardModern from "./WizardModern";
import WizardVertical from "./WizardVertical";
import WizardHorizontal from "./WizardHorizontal";
import WizardModernVertical from "./WizardModernVertical";
import InputFloating from "../detail/InputFloating";
// ** Custom Components
import BreadCrumbs from "@components/breadcrumbs";

const Wizard = () => {
  return (
    <Fragment>
      <BreadCrumbs
        title="بروزرسانی کورس ها"
        data={[{ title: "منو" }, { title: "بروز رسانی کورسها" }]}
      />
      <InputFloating />
      <Row>
        <Col sm="12">
          <WizardVertical />
        </Col>
      </Row>
    </Fragment>
  );
};
export default Wizard;
