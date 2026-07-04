// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Custom Components
import Avatar from "@components/avatar";
import pic from "./pic.png";
// ** Reactstrap Imports
import {
  Card,
  Button,
  Label,
  Modal,
  CardBody,
  CardText,
  CardTitle,
  ListGroup,
  ModalBody,
  ModalHeader,
  DropdownMenu,
  DropdownItem,
  ListGroupItem,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Third Party Components
import Select, { components } from "react-select";
import { FileText, Users, Link } from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Portrait Fallbacks
import portrait1 from "@src/assets/images/portrait/small/avatar-s-9.jpg";

const options = [
  { value: "Donna Frank", label: "Donna Frank" },
  { value: "Jane Foster", label: "Jane Foster" },
];

const OptionComponent = ({ data, ...props }) => {
  return (
    <components.Option {...props}>
      <div className="d-flex flex-wrap align-items-center">
        <div>{data.label}</div>
      </div>
    </components.Option>
  );
};

const ShareProjectExample = ({ array }) => {
  const [show, setShow] = useState(false);
  const [array1, setarray1] = useState([]);

  useEffect(() => {
    setarray1(array);
  }, [array]);

  return (
    <Fragment>
      <div
        className="t-px-3 t-py-2 t-text-[#f8f8f8] t-text-[14px] t-rounded-[8px] t-bg-[#7367f0] t-cursor-pointer"
        onClick={() => setShow(true)}>
        مشاهده
      </div>

      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg">
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}></ModalHeader>

        <ModalBody className="px-sm-5 mx-50 pb-4">
          <h1 className="text-center mb-1">نمایش دانش اموزان</h1>
          {/* <p className="text-center">Share project with team members</p> */}

          <Label
            for="addMemberSelect"
            className="form-label fw-bolder font-size font-small-4 mb-50"></Label>

          {/* <Select
            options={options}
            isClearable={false}
            id="addMemberSelect"
            theme={selectThemeColors}
            className="react-select"
            classNamePrefix="select"
            components={{ Option: OptionComponent }}
          /> */}

          <p className="fw-bolder pt-50 mt-2">{array1?.length} دانش اموز</p>

          <ListGroup flush className="mb-2">
            {array1?.map((item) => {
              const user = item.user;
              const group = item.courseGroup;

              return (
                <ListGroupItem
                  key={item.id}
                  className="d-flex align-items-start border-0 px-0">
                  <Avatar
                    className="me-75"
                    img={pic}
                    imgHeight={38}
                    imgWidth={38}
                  />

                  <div className="d-flex align-items-center justify-content-between w-100">
                    <div className="me-1">
                      <h5 className="mb-25">
                        {user.fName} {user.lName}
                      </h5>

                      <span className="d-block">{user.userName}</span>

                      <span className="d-block t-text-[14px]">
                        آیدی دانشجو: {user.id}
                      </span>

                      <span className="d-block t-text-[14px]">
                        کد عضویت: {item.id}
                      </span>

                      <span className="d-block t-text-[14px]">
                        کد دوره: {item.courseId}
                      </span>

                      <span className="d-block t-text-[14px]">
                        کد گروه: {item.courseGroupId}
                      </span>

                      <span className="d-block t-text-[14px] fw-bold t-mt-2">
                        گروه: {group.groupName}
                      </span>

                      <span className="d-block t-text-[14px]">
                        ظرفیت گروه: {group.groupCapacity}
                      </span>
                    </div>

                    {/* <UncontrolledDropdown>
                      <DropdownToggle color="flat-secondary" caret>
                        <span className="d-lg-inline-block d-none">
                          Student
                        </span>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem className="w-100">View</DropdownItem>
                        <DropdownItem className="w-100">Remove</DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown> */}
                  </div>
                </ListGroupItem>
              );
            })}
          </ListGroup>
          {/* 
          <div className="d-flex align-content-center justify-content-between flex-wrap">
            <div className="d-flex align-items-center me-2">
              <Users className="font-medium-2 me-50" />
              <p className="fw-bolder mb-0">Public to Vuexy</p>
            </div>
            <a
              className="fw-bolder"
              href="#"
              onClick={(e) => e.preventDefault()}>
              <Link className="font-medium-2 me-50" />
              <span>Copy project link</span>
            </a>
          </div> */}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ShareProjectExample;
