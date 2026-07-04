// ** React Imports
import { useEffect, useState } from "react";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Label,
} from "reactstrap";

// ** Utils
import { selectThemeColors } from "@utils";
import { getCourseCreateDataCall } from "../../core/Interceptor/Courses/getCreateStep1Call";
// ** Third Party Components
import axios from "axios";
import Select, { components } from "react-select"; // eslint-disable-line
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import AsyncSelect from "react-select/async";
import {
  File,
  Image,
  Figma,
  Globe,
  Slack,
  Chrome,
  GitHub,
  Gitlab,
  Twitter,
  Youtube,
  Facebook,
  Linkedin,
  Dribbble,
  FileText,
  Instagram,
} from "react-feather";
import { globalformData } from "../../redux/zustan/formdata";
const colorOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isFixed: true },
  { value: "purple", label: "Purple", color: "#5243AA", isFixed: true },
  { value: "red", label: "Red", color: "#FF5630", isFixed: false },
  { value: "orange", label: "Orange", color: "#FF8B00", isFixed: false },
  { value: "yellow", label: "Yellow", color: "#FFC400", isFixed: false },
];

const iconOptions = [
  {
    label: "Social Media",
    options: [
      {
        value: "facebook",
        label: "Facebook",
        icon: Facebook,
      },
      {
        value: "twitter",
        label: "Twitter",
        icon: Twitter,
      },
      {
        value: "linkedin",
        label: "Linkedin",
        icon: Linkedin,
      },
      {
        value: "github",
        label: "Github",
        icon: GitHub,
      },
      {
        value: "instagram",
        label: "Instagram",
        icon: Instagram,
      },
      {
        value: "dribbble",
        label: "Dribbble",
        icon: Dribbble,
      },
      {
        value: "gitlab",
        label: "Gitlab",
        icon: Gitlab,
      },
    ],
  },
  {
    label: "File Types",
    options: [
      { value: "pdf", label: "PDF", icon: File },
      { value: "txt", label: "txt", icon: FileText },
      { value: "image", label: "Image", icon: Image },
    ],
  },
  {
    label: "Others",
    options: [
      { value: "figma", label: "Figma", icon: Figma },
      { value: "chrome", label: "Chrome", icon: Chrome },
      { value: "safari", label: "Safari", icon: Globe },
      { value: "slack", label: "Slack", icon: Slack },
      { value: "youtube", label: "Youtube", icon: Youtube },
    ],
  },
];

const OptionComponent = ({ data, ...props }) => {
  const Icon = data.icon;

  return (
    <components.Option {...props}>
      <Icon className="me-50" size={14} />
      {data.label}
    </components.Option>
  );
};

const groupedOptions = [
  {
    label: "Ice Creams",
    options: [
      { value: "vanilla", label: "Vanilla" },
      { value: "Dark Chocolate", label: "Dark Chocolate" },
      { value: "chocolate", label: "Chocolate" },
      { value: "strawberry", label: "Strawberry" },
      { value: "salted-caramel", label: "Salted Caramel" },
    ],
  },
  {
    label: "Snacks",
    options: [
      { value: "Pizza", label: "Pizza" },
      { value: "Burger", label: "Burger" },
      { value: "Pasta", label: "Pasta" },
      { value: "Pretzel", label: "Pretzel" },
      { value: "Popcorn", label: "Popcorn" },
    ],
  },
];

const animatedComponents = makeAnimated();

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, color: "#626262", paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
};

const orderOptions = (values) => {
  if (values.length > 0)
    return values
      .filter((v) => v.isFixed)
      .concat(values.filter((v) => !v.isFixed));
};

const formatGroupLabel = (data) => (
  <div className="d-flex justify-content-between align-center">
    <strong>
      <span>{data.label}</span>
    </strong>
    <span>{data.options.length}</span>
  </div>
);

const SelectOptions = () => {
  const [getcreatdata, setgetcreatdata] = useState([]);

  const run = async () => {
    const run = await getCourseCreateDataCall();
    if (run) {
      setgetcreatdata(run);
      console.log("getcreate", run);
    }
  };

  const [selectOptions, setSelectOptions] = useState({
    courseTypes: [],
    technologies: [],
    statuses: [],
    levels: [],
    teachers: [],
    terms: [],
    classrooms: [],
  });

  useEffect(() => {
    if (getcreatdata) {
      setSelectOptions({
        courseTypes:
          getcreatdata.courseTypeDtos?.map((item) => ({
            value: item.id,
            label: item.typeName,
          })) || [],

        technologies:
          getcreatdata.technologyDtos?.map((item) => ({
            value: item.id,
            label: item.techName,
          })) || [],

        statuses:
          getcreatdata.statusDtos?.map((item) => ({
            value: item.id,
            label: item.statusName,
          })) || [],

        levels:
          getcreatdata.courseLevelDtos?.map((item) => ({
            value: item.id,
            label: item.levelName,
          })) || [],

        teachers:
          getcreatdata.teachers?.map((item) => ({
            value: item.teacherId,
            label: item.fullName,
          })) || [],

        terms:
          getcreatdata.termDtos?.map((item) => ({
            value: item.id,
            label: item.termName,
          })) || [],

        classrooms:
          getcreatdata.classRoomDtos?.map((item) => ({
            value: item.id,
            label: item.classRoomName,
          })) || [],
      });
    }
  }, [getcreatdata]);

  const formData = globalformData((state) => state.formData);
  const updateformdata = globalformData((state) => state.updateformdata);

  // const [formData, setformData] = useState({
  //   courseTypeId: ["online"],
  //   technologyIds: [],
  //   statusId: [],
  //   levelId: [],
  //   teacherId: [],
  //   termId: [],
  //   classRoomId: [],
  // });

  useEffect(() => {
    run();
  }, []);

  // ** State
  const [query, setQuery] = useState("");
  const [selectedDBVal, setSelectedDBVal] = useState(null);
  const [fixedValue, setFixedValue] = useState(
    orderOptions([colorOptions[0], colorOptions[1], colorOptions[3]]),
  );

  const filterColors1 = (inputValue) => {
    return colorOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase()),
    );
  };

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(filterColors1(inputValue));
    }, 2000);
  };

  // const filterColors2 = (inputValue) => {
  //   return colorOptions.filter((i) =>
  //     i.label.toLowerCase().includes(inputValue.toLowerCase()),
  //   );
  // };

  const fixedOnChange = (value, { action, removedValue }) => {
    switch (action) {
      case "remove-value":
      case "pop-value":
        if (removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        value = colorOptions.filter((v) => v.isFixed);
        break;
      default:
        break;
    }

    value = orderOptions(value);
    setFixedValue(value);
  };

  const handleInputChange = (newValue) => {
    const val = newValue.replace(/\W/g, "");
    return val;
  };

  const handleDBInputChange = (newValue) => {
    setQuery(newValue);
  };

  // handle selection
  const handleDBChange = (value) => {
    setSelectedDBVal(value);
  };

  const promiseOptions = (inputValue) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors2(inputValue));
      }, 2000);
    });
  };

  const loadOptionsDB = () => {
    return axios.get("/api/select/data", { query }).then((res) => {
      return res.data;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle tag="h4">گذینه ها</CardTitle>
      </CardHeader>

      <CardBody>
        <Row>
          <Col className="mb-1" md="6" sm="12">
            <Label className="form-label">تکنولوژی ها</Label>
            <Select
              isMulti
              theme={selectThemeColors}
              options={selectOptions.technologies}
              className="react-select"
              classNamePrefix="select"
              placeholder="انتخاب"
              value={selectOptions.technologies.filter((item) =>
                formData.technologyIds?.includes(item.value),
              )}
              onChange={(selectedOptions) =>
                updateformdata({
                  technologyIds: selectedOptions
                    ? selectedOptions?.map((item) => item.value)
                    : [],
                })
              }
            />
          </Col>

          <Col className="mb-1" md="6" sm="12">
            <Label className="form-label">استاتوس</Label>
            <Select
              theme={selectThemeColors}
              options={selectOptions.statuses}
              className="react-select"
              placeholder="انتخاب"
              classNamePrefix="select"
              value={selectOptions.statuses.find(
                (item) => item?.value === formData.statusId,
              )}
              onChange={(selectedOption) =>
                updateformdata({
                  statusId: selectedOption ? selectedOption.value : null,
                })
              }
            />
          </Col>

          <Col className="mb-1" md="6" sm="12">
            <Label className="form-label">سطح</Label>
            <Select
              theme={selectThemeColors}
              options={selectOptions.levels}
              className="react-select"
              placeholder="انتخاب"
              classNamePrefix="select"
              value={selectOptions.levels.find(
                (item) => item?.value === formData.levelId,
              )}
              onChange={(selectedOption) =>
                updateformdata({
                  levelId: selectedOption ? selectedOption.value : null,
                })
              }
            />
          </Col>

          <Col className="mb-1" md="6" sm="12">
            <Label className="form-label">معلم</Label>
            <Select
              theme={selectThemeColors}
              options={selectOptions.teachers}
              className="react-select"
              classNamePrefix="select"
              placeholder="انتخاب"
              value={selectOptions.teachers.find(
                (item) => item?.value === formData.teacherId,
              )}
              onChange={(selectedOption) =>
                updateformdata({
                  teacherId: selectedOption ? selectedOption.value : null,
                })
              }
            />
          </Col>

          <Col className="mb-1" md="6" sm="12">
            <Label className="form-label">ترم</Label>
            <Select
              theme={selectThemeColors}
              options={selectOptions.terms}
              className="react-select"
              classNamePrefix="select"
              placeholder="انتخاب"
              value={selectOptions.terms.find(
                (item) => item?.value === formData.termId,
              )}
              onChange={(selectedOption) =>
                updateformdata({
                  termId: selectedOption ? selectedOption.value : null,
                })
              }
            />
          </Col>

          <Col className="mb-1" md="6" sm="12">
            <Label className="form-label">کلاس</Label>
            <Select
              theme={selectThemeColors}
              options={selectOptions.classrooms}
              className="react-select"
              classNamePrefix="select"
              placeholder="انتخاب"
              value={selectOptions.classrooms.find(
                (item) => item?.value === formData.classRoomId,
              )}
              onChange={(selectedOption) =>
                updateformdata({
                  classRoomId: selectedOption ? selectedOption.value : null,
                })
              }
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export default SelectOptions;
