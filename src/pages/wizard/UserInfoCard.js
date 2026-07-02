import { useState, Fragment } from "react";

import {
  Card,
  CardBody,
  Button,
  Badge,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Input,
  Label,
} from "reactstrap";

const roleColors = {
  admin: "danger",
  editor: "info",
  author: "warning",
  maintainer: "success",
  subscriber: "primary",
};

const statusColors = {
  active: "success",
  pending: "warning",
  inactive: "secondary",
};

const UserInfoCard = () => {
  const [show, setShow] = useState(false);

  const selectedUser = {
    fullName: "John Doe",
    username: "johndoe",
    email: "john@mail.com",
    role: "admin",
    status: "active",
    contact: "1234567890",
    avatar: "",
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          {/* Avatar */}
          <div className="text-center mb-2 t-border t-border-red-500">
            <img
              src="https://i.pravatar.cc/110"
              alt="avatar"
              className="rounded-circle"
              width="110"
              height="110"
            />

            <h4 className="mt-1">{selectedUser.fullName}</h4>

            <Badge color={roleColors[selectedUser.role]}>
              {selectedUser.role}
            </Badge>
          </div>

          {/* Details */}
          <h5 className="fw-bold border-bottom pb-50 mb-1 t-bg-[#1f1f1f]">
            Details
          </h5>

          <ul className="list-unstyled">
            <li className="mb-75">
              <strong>Username:</strong> {selectedUser.username}
            </li>

            <li className="mb-75">
              <strong>Email:</strong> {selectedUser.email}
            </li>

            <li className="mb-75">
              <strong>Status:</strong>{" "}
              <Badge color={statusColors[selectedUser.status]}>
                {selectedUser.status}
              </Badge>
            </li>

            <li className="mb-75">
              <strong>Contact:</strong> {selectedUser.contact}
            </li>
          </ul>

          {/* Buttons */}
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              اصلاح
            </Button>

            <Button color="danger" outline className="ms-1">
              حذف
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg">
        <ModalHeader toggle={() => setShow(false)}>Edit User</ModalHeader>

        <ModalBody>
          <Row className="gy-1">
            <Col md={6}>
              <Label>First Name</Label>
              <Input defaultValue="John" />
            </Col>

            <Col md={6}>
              <Label>Last Name</Label>
              <Input defaultValue="Doe" />
            </Col>

            <Col md={12}>
              <Label>Username</Label>
              <Input defaultValue={selectedUser.username} />
            </Col>

            <Col md={6}>
              <Label>Email</Label>
              <Input defaultValue={selectedUser.email} />
            </Col>

            <Col md={6}>
              <Label>Contact</Label>
              <Input defaultValue={selectedUser.contact} />
            </Col>

            <Col md={12} className="text-center mt-2">
              <Button color="primary" className="me-1">
                Save
              </Button>

              <Button color="secondary" outline onClick={() => setShow(false)}>
                Cancel
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default UserInfoCard;
