import { Mail, Home, Airplay, Circle, FileText } from "react-feather";

export default [
  {
    id: "eCommerceDash",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/ecommerce",
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
    id: "blogList",
    title: " وبلاگ ها",
    icon: <FileText size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/pages/blog/list",
    children: [
      {
        id: "blogList",
        title: "لیست وبلاگ ها",
        icon: <Circle />,
        navLink: "/pages/blog/list",
      },
      {
        id: "blogEdit",
        title: "ایجاد وبلاگ ",
        icon: <Circle />,
        navLink: "/pages/blog/edit",
      },
      {
        id: "category",
        title: "لیست  دسته بندی ها",
        icon: <Circle size={12} />,
        navLink: "/pages/blog/category",
      },
      {
        id: "categoryEdit",
        title: "ایجاد دسته بندی جدید ",
        icon: <Circle />,
        navLink: "/pages/blog/add",
      },
    ],
  },
  {
    id: "Buildings",
    title: "  ساختمان ها و دپارتمان ها",
    icon: <Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/pages/Buildings/list",
    children: [],
  },
];
