// ** React Imports
import { useState, Fragment } from "react";

// ** Reactstrap Imports
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

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import {
  Check,
  Briefcase,
  X,
  CheckSquare,
  ShoppingBag,
  Edit,
} from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import UpdateUserInfoModal from "./UpdateUserInfoModal";
import AddUserAccessModal from "./AddUserAccessModal";

const roleColors = {
  "": "light-primary",
  admin: "light-danger",
  student: "light-success",
  teacher: "light-warning",
  GOD: "light-info",
};

const statusColors = {
  // pending: 'light-warning',
  true: "light-success",
  false: "light-danger",
};

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ selectedUser, setUserDetailsRenderCount }) => {
  // console.log(selectedUser)
  // ** State
  const [show, setShow] = useState(false);
  const [roleAccessModalShow, setRoleAccessModalShow] = useState(false);

  // ** Hook
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

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser.currentPictureAddress !== null) {
      return (
        <img
          height="110"
          width="110"
          alt="user-image"
          src={selectedUser.currentPictureAddress}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      return (
        <Avatar
          initials
          color={"light-primary"}
          className="rounded mt-3 mb-2"
          content={selectedUser.fName + " " + selectedUser.lName || ""}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "110px",
            width: "110px",
          }}
        />
      );
    }
  };

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

  const handleReset = () => {
    reset({
      username: selectedUser.username,
      lastName: selectedUser.fName?.split(" ")[1],
      firstName: selectedUser.lName?.split(" ")[0],
    });
  };

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: "از غیر فعال کردن این کاربر مطمعنید؟",
      // text: "You won't be able to revert user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "انصراف",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(function (result) {
      if (result.value) {
        MySwal.fire({
          icon: "success",
          title: "کاربر مورد نظر با موفقیت غیر فعال شد!",
          // text: "User has been suspended.",
          confirmButtonText: "متوجه شدم",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          icon: "error",
          title: "عملیات لغو شد!",
          // text: "Cancelled Suspension :)",
          confirmButtonText: "متوجه شدم",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>
                    {selectedUser !== null
                      ? selectedUser.fName + " " + selectedUser.lName || ""
                      : "کاربر"}
                  </h4>
                  <div
                    style={{ alignItems: "center", gap: "2px" }}
                    className="d-flex"
                  >
                    {selectedUser.roles?.length ? (
                      <>
                        {selectedUser.roles?.map((role) => (
                          <>
                            <Badge
                              key={role.roleName}
                              color={
                                role.roleName
                                  ? roleColors[role.roleName]
                                  : "light-info"
                              }
                              className="text-capitalize"
                            >
                              {role.roleName ? role.roleName : "User"}
                            </Badge>
                            <span> </span>
                          </>
                        ))}
                      </>
                    ) : null}
                    <button
                      type="button"
                      style={{ background: "none", border: "none" }}
                      onClick={() => setRoleAccessModalShow(true)}
                    >
                      <Edit className={`cursor-pointer ${'text-primary'}`} size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <ShoppingBag className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedUser.courseReserve?.length}</h4>
                <small>دوره های رزرو شده</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <CheckSquare className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{selectedUser.courses?.length}</h4>
                <small>دوره ها</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">اطلاعات کاربر</h4>
          <div className="info-container">
            {selectedUser !== null && selectedUser !== undefined ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام کاربری: </span>
                  <span>{selectedUser.userName || "--"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">ایمیل: </span>
                  <span>{selectedUser.gmail || "--"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">شماره تماس: </span>
                  <span>{selectedUser.phoneNumber || "--"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت: </span>
                  <Badge
                    className="text-capitalize"
                    color={statusColors[selectedUser.active]}
                  >
                    {selectedUser.active ? "فعال" : "غیر فعال"}
                  </Badge>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">کد ملی: </span>
                  <span className="text-capitalize">
                    {selectedUser.nationalCode || "--"}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">جنسیت: </span>
                  <span>{selectedUser.gender ? "مرد" : "زن"}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2">
            <Button color="primary" onClick={() => setShow(true)}>
              ویرایش اطلاعات
            </Button>
            <Button
              className="ms-1"
              color="danger"
              outline
              onClick={handleSuspendedClick}
            >
              غیر فعال کردن
            </Button>
          </div>
        </CardBody>
      </Card>

      <UpdateUserInfoModal
        selectedUser={selectedUser}
        show={show}
        setShow={setShow}
        setUserDetailsRenderCount={setUserDetailsRenderCount}
      />

      <AddUserAccessModal
        selectedUser={selectedUser}
        locationUsing={'userInfoCard'}
        roleAccessModalShow={roleAccessModalShow}
        setRoleAccessModalShow={setRoleAccessModalShow}
        setUserDetailsRenderCount={setUserDetailsRenderCount}
      />
    </Fragment>
  );
};

export default UserInfoCard;
