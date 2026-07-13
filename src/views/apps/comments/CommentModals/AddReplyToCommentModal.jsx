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
import { getAccountProfileInfo } from '../../../../core/Interceptor/Services/UserServices/get';
import { AddCourseCommentReply, AddNewsCommentReply } from '../store/functions';

const AddReplyToCommentModal = ({ courseOrNewsId, commentId, addReplyToCommentModalShow, setAddReplyToCommentModalShow, commentType, setRenderCount }) => {
  const [accountInfo, setAccountInfo] = useState({});

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const fetchAccountInfo = async () => {
    try {
      const response = await getAccountProfileInfo();
      console.log(response.data)
      setAccountInfo(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchAccountInfo();
  }, [])

  const onSubmit = async (data) => {
    // console.log(data);
    if (commentType == "coursesC") {
      AddCourseCommentReply(courseOrNewsId, commentId, data.title, data.describe);
    } else {
      AddNewsCommentReply(courseOrNewsId, data.title, data.describe, accountInfo.id);
    }
    setRenderCount(prev => prev + 1)
    setAddReplyToCommentModalShow(false)
  };

  return (
    <>
      <Modal
        isOpen={addReplyToCommentModalShow}
        toggle={() => setAddReplyToCommentModalShow(false)}
        className="modal-dialog-centered modal-md"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setAddReplyToCommentModalShow(false)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div className="text-center mb-4">
            <h1>پاسخ دادن به کامنت</h1>
          </div>
          <Form style={{ justifyContent: 'space-around', alignItems: 'center' }} onSubmit={handleSubmit(onSubmit)} className='d-flex flex-column'>
            <Row style={{ width: "100%" }}>
              <Col md="15" className="mb-1">
                <Label className="form-label" for="title">
                  عنوان پاسخ <span className="text-danger">*</span>
                </Label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="text"
                      id="title"
                      placeholder="عنوان کامنت"
                      invalid={!!errors.title}
                      {...field}
                    />
                  )}
                />
              </Col>
            </Row>
            <Row style={{ width: "100%" }} className='mb-1'>
              <Col md="12" className="mb-1">
                <Label className="form-label" for="describe">
                  متن پاسخ <span className="text-danger">*</span>
                </Label>
                <Controller
                  name="describe"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="textarea"
                      id="describe"
                      style={{ height: "100px", resize: "none" }}
                      placeholder="متن کامنت"
                      invalid={!!errors.describe}
                      {...field}
                    />
                  )}
                />
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
                    {!isSubmitting ? "ارسال پاسخ" : "در حال ارسال..."}
                  </Button>
                  <Button type="reset" color="secondary" outline onClick={() => setAddReplyToCommentModalShow(false)}>
                    لغو
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default AddReplyToCommentModal;