// ** React Imports
import { useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import Address from "./steps/Address";
import SocialLinks from "./steps/SocialLinks";
import PersonalInfo from "./steps/PersonalInfo";
import AddCourseDetail from "./steps/AddCourseDetail";
import SelectOptions from "../select/SelectOptions";
const WizardVertical = () => {
  // ** Ref
  const ref = useRef(null);

  // ** State
  const [stepper, setStepper] = useState(null);

  const steps = [
    {
      id: "account-details",
      title: "جزئیات کورس",
      subtitle: "جزئیات کورس را وارد کنید",
      content: <AddCourseDetail stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "personal-info",
      title: "Personal Info",
      subtitle: "Add Personal Info",
      content: <PersonalInfo stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "step-address",
      title: "Address",
      subtitle: "Add Address",
      content: <Address stepper={stepper} type="wizard-vertical" />,
    },
    {
      id: "social-links",
      title: "Social Links",
      subtitle: "Add Social Links",
      content: <SocialLinks stepper={stepper} type="wizard-vertical" />,
    },
  ];

  return (
    <div className="vertical-wizard">
      <Wizard
        type="vertical"
        ref={ref}
        steps={steps}
        options={{
          linear: false,
        }}
        instance={(el) => setStepper(el)}
      />
    </div>
  );
};

export default WizardVertical;
