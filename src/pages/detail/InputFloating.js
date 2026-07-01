import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Row,
  Col,
  Button,
} from "reactstrap";

const InputFloating = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">پیدا کردن کورس موجود</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col md="6" sm="12">
            <div className="input-group">
              <Input
                type="text"
                placeholder="ای دی را وارد کنید"
                className="form-control"
              />
              <Button color="primary" className="px-4">
                ارسال
              </Button>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default InputFloating;
