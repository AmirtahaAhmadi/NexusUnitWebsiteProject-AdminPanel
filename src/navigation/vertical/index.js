import { Mail, Home, Airplay, Circle } from "react-feather";
import { FileText } from "react-feather";
import { FilePlus } from "react-feather";
import { Book } from "react-feather";
import { Bookmark } from "react-feather";
import { Archive } from "react-feather";
import { Tool } from "react-feather";
import { PenTool } from "react-feather";
import { Briefcase } from "react-feather";
import { Settings } from "react-feather";
import { MessageSquare } from "react-feather";
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
    id: "courses",
    title: "دوره ها",
    icon: <Archive style={{ width: 20, height: 20 }} />,

    children: [
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
        title: "تنظیمات  دوره",
        icon: <Settings style={{ width: 20, height: 20 }} />,
        navLink: "/techupdate",
      },

      {
        id: "SocialGroup",
        title: "گروه هایه اجتمایی",
        icon: <MessageSquare style={{ width: 20, height: 20 }} />,
        navLink: "/SocialGroup",
      },
    ],
  },
  {
    id: "jobs",
    title: "مشاغل کمکی",
    icon: <Briefcase style={{ width: 20, height: 20 }} />,

    children: [
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
    ],
  },
];
