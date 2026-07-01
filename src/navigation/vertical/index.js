import { Mail, Home, Airplay, Circle } from "react-feather";
import { FileText } from "react-feather";
export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "secondPage",
    title: "Second Page",
    icon: <Mail size={20} />,
    navLink: "/second-page",
  },
  {
    id: "smaplePage",
    title: "Sample Page",
    icon: <Airplay size={20} />,
    // navLink: "/sample",
    children: [
      {
        id: "invoiceList",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/invoice/list",
      },
    ],
  },
  {
    id: "AllCourses",
    title: "تمام کورسها",
    icon: <FileText size={20} />,
    navLink: "/AllCourses",
  },
  {
    id: "updateCourses",
    title: "بروزرسانی کورس ها",
    icon: <FileText size={20} />,
    navLink: "/updateCourses",
  },
];
