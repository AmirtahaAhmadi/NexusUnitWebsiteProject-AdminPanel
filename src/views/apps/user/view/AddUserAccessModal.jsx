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

const Role_Id = {
  student: 3,
  teacher: 2,
  admin: 1,
}

const AddUserAccessModal = ({ selectedUser, locationUsing, roleAccessModalShow, setRoleAccessModalShow, setUserDetailsRenderCount }) => {
  const [rolesId, setRolesId] = useState([]);

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      isStudentRole: false,
      isAdminRole: false,
      isTeacherRole: false,
      isGodRole: false,
    }
  });

  useEffect(() => {
    const currentRoles = locationUsing == 'userList' ? selectedUser?.roles || [] : selectedUser?.roles?.map((role) => role.roleName) || [];
    reset({
      isStudentRole: currentRoles.includes('student'),
      isAdminRole: currentRoles.includes('admin'),
      isTeacherRole: currentRoles.includes('teacher'),
      isGodRole: currentRoles.includes('GOD'),
    });
    setRolesId([]);
  }, [selectedUser, reset])

  const toggleRole = (roleName) => {
    const roleId = Role_Id[roleName];
    setRolesId(prev => prev.includes(roleId) ? prev.filter((item) => item != roleId) : [...prev, roleId])
  }

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
                  <Controller
                    name="isStudentRole"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="switch"
                        role="switch"
                        id="isStudentRole"
                        innerRef={field.ref}
                        checked={field.value || rolesId.includes(Role_Id.student)}
                        onChange={() => { toggleRole('student') }}
                        onBlur={field.onBlur}
                        disabled={field.value}
                      />
                    )}
                  />
                </div>
              </div>
            </Col>
            <Col md="3" className="mb-1">
              <div className='d-flex flex-column mb-1'>
                <Label for="isTeacherRole">رول مربی</Label>
                <div className="form-switch">
                  <Controller
                    name="isTeacherRole"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="switch"
                        role="switch"
                        id="isTeacherRole"
                        innerRef={field.ref}
                        checked={field.value || rolesId.includes(Role_Id.teacher)}
                        onChange={() => { toggleRole('teacher') }}
                        onBlur={field.onBlur}
                        disabled={field.value}
                      />
                    )}
                  />
                </div>
              </div>
            </Col>
            <Col md="3" className="mb-1">
              <div className='d-flex flex-column mb-1'>
                <Label for="isAdminRole">رول ادمین</Label>
                <div className="form-switch">
                  <Controller
                    name="isAdminRole"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="switch"
                        role="switch"
                        id="isAdminRole"
                        innerRef={field.ref}
                        checked={field.value || rolesId.includes(Role_Id.admin)}
                        onChange={() => { toggleRole('admin') }}
                        onBlur={field.onBlur}
                        disabled={field.value}
                      />
                    )}
                  />
                </div>
              </div>
            </Col>
            <Col md="3" className="mb-1">
              <div className='d-flex flex-column mb-1'>
                <Label for="isGodRole">رول گاد</Label>
                <div className="form-switch">
                  <Controller
                    name="isGodRole"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="switch"
                        role="switch"
                        id="isGodRole"
                        innerRef={field.ref}
                        checked={field.value}
                        onBlur={field.onBlur}
                        disabled={true}
                      />
                    )}
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