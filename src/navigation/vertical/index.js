import { Mail, Home, Airplay, Circle, User, Bookmark } from "react-feather";

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
    id: "userList",
    title: "مدیریت کاربران",
    icon: <User size={20} />,
    navLink: "/user/list",
  },
  {
    id: "commentsList",
    title: "کامنت ها",
    icon: <Bookmark size={20} />,
    navLink: "/comments/list",
  },
];
