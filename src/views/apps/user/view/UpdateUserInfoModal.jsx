import React from 'react';
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

import {
  Check,
  Briefcase,
  X,
  CheckSquare,
  ShoppingBag,
  Edit,
} from "react-feather";
import { selectThemeColors } from "@utils";
import WizardModern from '../../../forms/wizard/WizardModern';

const UpdateUserInfoModal = ({ selectedUser, show, setShow, setUserDetailsRenderCount }) => {
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: selectedUser.username,
      lastName: selectedUser.lName?.split(" ")[1],
      firstName: selectedUser.fName?.split(" ")[0],
    },
  });

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      setShow(false);
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual",
          });
        }
      }
    }
  };

  return (
    <>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-xl"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <WizardModern selectedUser={selectedUser} setShow={setShow} setUserDetailsRenderCount={setUserDetailsRenderCount} />
      </Modal>
    </>
  )
}

export default UpdateUserInfoModal