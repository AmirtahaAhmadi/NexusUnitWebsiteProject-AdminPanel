import React, { useEffect, useState } from 'react'
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
import { postAddUserAccess } from '../../../../core/Interceptor/Services/UserServices/post';
import { handleError, handleSuccess, handleWarning } from '../../../extensions/sweet-alert/SweetAlerts';

const AddUserAccessModal = ({ selectedUser, roleAccessModalShow, setRoleAccessModalShow, setUserDetailsRenderCount }) => {
  const roles = [];
  const [rolesId, setRolesId] = useState([]);
  const [isRendered, setIsRendered] = useState(false);
  const [defaultValues, setDefaultValues] = useState(
    {
      isStudentRole: false,
      isAdminRole: false,
      isTeacherRole: false,
      isGodRole: false,
    }
  );

  useEffect(() => {
    selectedUser.roles?.map((role) => (roles.push(role.roleName)))
    setDefaultValues(() => ({
      isStudentRole: !!roles.includes('student'),
      isAdminRole: !!roles.includes('admin'),
      isTeacherRole: !!roles.includes('teacher'),
      isGodRole: !!roles.includes('God'),
    }))
    setIsRendered(true)
  }, [selectedUser])

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log(data);
    // console.log(rolesId)
    try {
      const requests = rolesId.map((roleId) =>
        postAddUserAccess(roleId, selectedUser.id),
      );
      const responses = await Promise.all(requests);
      if (responses[0]?.data.success == true || responses[1]?.data.success == true || responses[2]?.data.success == true) {
        setUserDetailsRenderCount(prev => prev + 1)
        setRoleAccessModalShow(false)
        handleSuccess("عملیات با موفقیت انجام شد!")
      } else {
        setRoleAccessModalShow(false)
        handleWarning("رولی اضافه نشد!")
      }
    } catch (error) {
      console.log("giveRole error: ", error);
      handleError("عملیات با مشکل روبرو شد!")
    }
  };

  useEffect(() => {
    if (defaultValues) {
      Object.keys(defaultValues).forEach((key) => {
        setValue(key, defaultValues[key]);
      });
    }
  }, [defaultValues]);

  return (
    <>
      <Modal
        isOpen={roleAccessModalShow}
        toggle={() => setRoleAccessModalShow(false)}
        className="modal-dialog-centered modal-md"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setRoleAccessModalShow(false)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center">
            <h1>رول کاربر</h1>
          </div>
        </ModalBody>
        <Form style={{ justifyContent: 'space-around', alignItems: 'center' }} onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column'>
          <Row className='mb-3'>
            <Col md="3" className="mb-1">
              <div className='d-flex flex-column mb-1'>
                <Label for="isStudentRole">رول دانشجو</Label>
                <div className="form-switch">
                  <Input
                    type="switch"
                    role="switch"
                    id="isStudentRole"
                    innerRef={register("isStudentRole").ref}
                    name={register("isStudentRole").name}
                    onChange={() => {
                      register("isStudentRole").onChange
                      setRolesId(prev => prev.includes(3) ? prev.filter((item) => item !== 3) : [...prev, 3])
                    }}
                    onBlur={register("isStudentRole").onBlur}
                    disabled={defaultValues.isStudentRole}
                  />
                </div>
              </div>
            </Col>
            <Col md="3" className="mb-1">
              <div className='d-flex flex-column mb-1'>
                <Label for="isTeacherRole">رول مربی</Label>
                <div className="form-switch">
                  <Input
                    type="switch"
                    role="switch"
                    id="isTeacherRole"
                    innerRef={register("isTeacherRole").ref}
                    name={register("isTeacherRole").name}
                    onChange={() => {
                      register("isTeacherRole").onChange
                      setRolesId(prev => prev.includes(2) ? prev.filter((item) => item !== 2) : [...prev, 2])
                    }}
                    onBlur={register("isTeacherRole").onBlur}
                    disabled={defaultValues.isTeacherRole}
                  />
                </div>
              </div>
            </Col>
            <Col md="3" className="mb-1">
              <div className='d-flex flex-column mb-1'>
                <Label for="isAdminRole">رول ادمین</Label>
                <div className="form-switch">
                  <Input
                    type="switch"
                    role="switch"
                    id="isAdminRole"
                    innerRef={register("isAdminRole").ref}
                    name={register("isAdminRole").name}
                    onChange={() => {
                      register("isAdminRole").onChange
                      setRolesId(prev => prev.includes(1) ? prev.filter((item) => item !== 1) : [...prev, 1])
                    }}
                    onBlur={register("isAdminRole").onBlur}
                    disabled={defaultValues.isAdminRole}
                  />
                </div>
              </div>
            </Col>
            <Col md="3" className="mb-1">
              <div className='d-flex flex-column mb-1'>
                <Label for="isGodRole">رول گاد</Label>
                <div className="form-switch">
                  <Input
                    type="switch"
                    role="switch"
                    id="isGodRole"
                    innerRef={register("isGodRole").ref}
                    name={register("isGodRole").name}
                    onBlur={register("isGodRole").onBlur}
                    disabled={true}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="12" className="mb-1">
              <div className='d-flex mb-1'>
                <Button
                  type="submit"
                  className="me-1"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {!isSubmitting ? "اعمال" : "در حال ارسال..."}
                </Button>
                <Button type="reset" color="secondary" outline onClick={() => setRoleAccessModalShow(false)}>
                  لغو
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default AddUserAccessModal