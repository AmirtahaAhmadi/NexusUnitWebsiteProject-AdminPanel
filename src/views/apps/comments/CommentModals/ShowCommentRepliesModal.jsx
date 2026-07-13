import React, { useEffect, useState } from "react";
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
  UncontrolledTooltip,
  Spinner,
} from "reactstrap";

import {
  Check,
  Briefcase,
  X,
  CheckSquare,
  ShoppingBag,
  Edit,
  ChevronDown,
  Eye,
} from "react-feather";
import { selectThemeColors } from "@utils";
import { handleError, handleSuccess, handleWarning } from '../../../extensions/sweet-alert/SweetAlerts';
import { getCourseReplyComment, getNewsReplyComment } from "../../../../core/Interceptor/Services/CommentServices/get";
import DataTable from "react-data-table-component";
import { dateToLocal } from "../../user/store/DateToLocalFunction";

const ShowCommentRepliesModal = ({ courseId, commentId, commentRepliesModal, setCommentRepliesModal, commentType, renderCount }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [CourseCommentReplies, setCourseCommentReplies] = useState([]);
  const [newsCommentReplies, setNewsCommentReplies] = useState([]);

  const fetchGetAllCourseCommentReplies = async () => {
    setIsLoading(true);
    try {
      const response = await getCourseReplyComment(courseId, commentId);
      // console.log(response.data);
      setCourseCommentReplies(response.data);
    } catch (error) {
      console.error("courseCommentReplies error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGetAllNewsCommentReplies = async () => {
    setIsLoading(true);
    try {
      const response = await getNewsReplyComment(commentId);
      // console.log(response.data);
      setNewsCommentReplies(response.data);
    } catch (error) {
      console.error("newsCommentReplies error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGetAllCourseCommentReplies();
    fetchGetAllNewsCommentReplies();
  }, [courseId, commentId, renderCount])

  const columns1 = [
    {
      name: "نام کاربر",
      sortable: true,
      minWidth: "150px",
      sortField: "title",
      selector: (row) => row.author,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{row.author || "--"}</span>
        </div>
      ),
    },
    {
      name: "عنوان پاسخ",
      sortable: true,
      minWidth: "100px",
      sortField: "title",
      selector: (row) => row.title,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{row.title || "--"}</span>
        </div>
      ),
    },
    {
      name: "متن پاسخ",
      sortable: true,
      minWidth: "120px",
      sortField: "text",
      selector: (row) => row.describe,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{row.describe || "--"}</span>
        </div>
      ),
    },
    {
      name: "تاریخ درج شدن",
      sortable: true,
      minWidth: "100px",
      sortField: "text",
      selector: (row) => row.insertDate,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{dateToLocal(row.insertDate)}</span>
        </div>
      ),
    },
  ];

  const columns2 = [
    {
      name: "آیدی کاربر",
      sortable: true,
      minWidth: "150px",
      sortField: "title",
      selector: (row) => row.userId,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{row.userId || "--"}</span>
        </div>
      ),
    },
    {
      name: "عنوان پاسخ",
      sortable: true,
      minWidth: "100px",
      sortField: "title",
      selector: (row) => row.title,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{row.title || "--"}</span>
        </div>
      ),
    },
    {
      name: "متن پاسخ",
      sortable: true,
      minWidth: "120px",
      sortField: "text",
      selector: (row) => row.describe,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{row.describe || "--"}</span>
        </div>
      ),
    },
    {
      name: "تاریخ درج شدن",
      sortable: true,
      minWidth: "100px",
      sortField: "text",
      selector: (row) => row.inserDate,
      cell: (row) => (
        <div className="d-flex justify-content-left align-items-center">
          <span className="fw-bolder">{dateToLocal(row.inserDate)}</span>
        </div>
      ),
    },
  ];

  return (
    <>
      <Modal
        isOpen={commentRepliesModal}
        toggle={() => setCommentRepliesModal(false)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setCommentRepliesModal(false)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 pt-50 pb-5">
          <div style={{ marginBottom: "20px" }} className="text-center">
            <h1>پاسخ های کامنت</h1>
          </div>
          {isLoading ? (
            <div
              style={{ width: "100%" }}
              className="d-flex justify-content-center"
            >
              <Spinner color="primary" />
            </div>
          ) : (
            <Row>
              <div className="react-dataTable">
                <DataTable
                  noHeader
                  responsive
                  columns={commentType == "coursesC" ? columns1 : columns2}
                  sortIcon={<ChevronDown />}
                  className="react-dataTable"
                  data={commentType == "coursesC" ? CourseCommentReplies : newsCommentReplies}
                />
              </div>
            </Row>
          )}
        </ModalBody>
      </Modal>
    </>
  )
}

export default ShowCommentRepliesModal;