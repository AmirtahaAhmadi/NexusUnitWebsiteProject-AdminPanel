// ** React Imports
import { Fragment } from "react";

// ** Icons Imports
import { ArrowLeft, ArrowRight } from "react-feather";
import SelectOptions from "../../select/SelectOptions";
// ** Reactstrap Imports
import { Label, Row, Col, Input, Form, Button } from "reactstrap";
import { useState } from "react";
import { getCourseCreateDataCall } from "../../../core/Interceptor/Courses/getCreateStep1Call";
import { useEffect } from "react";
const AddCourseDetail = ({ stepper, type }) => {
  const [getcreatdata, setgetcreatdata] = useState([]);

  const run = async () => {
    const run = await getCourseCreateDataCall();
    if (run) {
      setgetcreatdata(run);
      console.log("getcreate", run);
    }
  };

  useEffect(() => {
    run();
  }, []);

  return (
    <Fragment>
      {" "}
      <SelectOptions />
      <Form>
        <div className="d-flex justify-content-between">
          <Button color="secondary" className="btn-prev" outline disabled>
            <ArrowLeft
              size={14}
              className="align-middle me-sm-25 me-0"></ArrowLeft>
            <span className="align-middle d-sm-inline-block d-none">قبلی</span>
          </Button>
          <Button
            color="primary"
            className="btn-next"
            onClick={() => stepper.next()}>
            <span className="align-middle d-sm-inline-block d-none">بعدی</span>
            <ArrowRight
              size={14}
              className="align-middle ms-sm-25 ms-0"></ArrowRight>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default AddCourseDetail;
