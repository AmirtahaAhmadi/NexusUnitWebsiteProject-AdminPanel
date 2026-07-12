import { FileText } from "react-feather";
import { FilePlus } from "react-feather";
import { Book } from "react-feather";
import { Bookmark } from "react-feather";
import { Archive } from "react-feather";
import { Tool } from "react-feather";
import { PenTool } from "react-feather";
import { Home } from "react-feather";
import { Mail } from "react-feather";
import { Briefcase } from "react-feather";
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
    id: "AllCourses",
    title: "تمام کورسها",
    icon: <Book size={20} />,
    navLink: "/AllCourses",
  },
  {
    id: "updateCourses",
    title: "بروزرسانی کورس ها",
    icon: <FilePlus size={20} />,
    navLink: "/updateCourses",
  },

  {
    id: "courses",
    title: "دوره ها",
    icon: <Archive style={{ width: 20, height: 20 }} />,
  },
  {
    id: "AllCourses",
    title: "تمام دوره ها",
    icon: <Book style={{ width: 20, height: 20 }} />,
    navLink: "/AllCourses",
  },
  {
    id: "updateCourses",
    title: "بروزرسانی دوره ها",
    icon: <Tool style={{ width: 20, height: 20 }} />,
    navLink: "/updateCourses",
  },
  {
    id: "reservedCourse",
    title: "دوره هایه رزرو شده",
    icon: <Bookmark style={{ width: 20, height: 20 }} />,
    navLink: "/reservedCourse",
  },
  {
    id: "techupdate",
    title: "تنظیمات دوره",
    icon: <FilePlus style={{ width: 20, height: 20 }} />,
    navLink: "/techupdate",
  },

  {
    id: "jobs",
    title: "تمام مشاغل",
    icon: <Briefcase style={{ width: 20, height: 20 }} />,
    navLink: "/jobs",
  },
  {
    id: "updatejobs",
    title: "بروزرسانی مشاغل",
    icon: <PenTool style={{ width: 20, height: 20 }} />,
    navLink: "/updatejobs",
  },
  // {
  //   id: "assistance",
  //   title: "مشاوران",
  //   icon: <PenTool style={{ width: 20, height: 20 }} />,
  //   navLink: "/assistance",
  // },
];
