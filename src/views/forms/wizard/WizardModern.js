// ** React Imports
import { useEffect, useRef, useState } from "react";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Steps
import Address from "./steps/Address";
import SocialLinks from "./steps/SocialLinks";
import AccountDetails from "./steps/AccountDetails";

// ** Icons Imports
import { FileText, User, MapPin, Link } from "react-feather";

const WizardModern = ({ selectedUser, setShow, setUserDetailsRenderCount }) => {
  const ref = useRef(null);

  const [stepper, setStepper] = useState(null);
  const [userData, setUserData] = useState({
    accountDetails: {
      fName: "",
      lName: "",
      gmail: "",
      userName: "",
      phoneNumber: "",
      nationalCode: "",
      userAbout: "",
      homeAdderess: "",
      birthDay: "",
      gender: true,
      twoStepAuth: false,
      receiveMessageEvent: "",
    },
    address: {
      longitude: "",
      latitude: "",
    },
    socialLinks: {
      telegramLink: "",
      linkdinProfile: "",
    },
  });
  useEffect(() => {
    if (selectedUser) {
      setUserData({
        accountDetails: {
          fName: selectedUser.fName,
          lName: selectedUser.lName,
          gmail: selectedUser.gmail,
          userName: selectedUser.userName,
          phoneNumber: selectedUser.phoneNumber,
          nationalCode: selectedUser.nationalCode,
          userAbout: selectedUser.userAbout,
          homeAdderess: selectedUser.homeAdderess,
          birthDay: selectedUser.birthDay,
          gender: selectedUser.gender,
          twoStepAuth: selectedUser.twoStepAuth,
          receiveMessageEvent: selectedUser.receiveMessageEvent,
        },
        address: {
          longitude: selectedUser.longitude,
          latitude: selectedUser.latitude,
        },
        socialLinks: {
          telegramLink: selectedUser.telegramLink,
          linkdinProfile: selectedUser.linkdinProfile,
        },
      });
    }
  }, [selectedUser]);

  const steps = [
    {
      id: "account-details",
      title: "اطلاعات کاربر",
      subtitle: "اطلاعات کاربر را وارد کنید",
      icon: <FileText size={18} />,
      content: (
        <AccountDetails
          stepper={stepper}
          type="wizard-modern"
          data={userData.accountDetails}
          onSubmit={(val) =>
            setUserData((prev) => ({ ...prev, accountDetails: val }))
          }
        />
      ),
    },
    {
      id: "step-address",
      title: "آدرس",
      subtitle: "آدرس را وارد کنید",
      icon: <MapPin size={18} />,
      content: (
        <Address
          stepper={stepper}
          type="wizard-modern"
          data={userData.address}
          onSubmit={(val) => setUserData((prev) => ({ ...prev, address: val }))}
        />
      ),
    },
    {
      id: "social-links",
      title: "شبکه های اجتماعی",
      subtitle: "لینک شبکه های اجتماعی را وارد کنید",
      icon: <Link size={18} />,
      content: (
        <SocialLinks
          stepper={stepper}
          type="wizard-modern"
          data={userData.socialLinks}
          onSubmit={(val) => setUserData((prev) => ({ ...prev, socialLinks: val }))}
          fullData={userData}
          selectedUser={selectedUser}
          setShow={setShow}
          setUserDetailsRenderCount={setUserDetailsRenderCount}
        />
      ),
    },
  ];

  return (
    <div className="modern-horizontal-wizard">
      <Wizard
        type="modern-horizontal"
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

export default WizardModern;
