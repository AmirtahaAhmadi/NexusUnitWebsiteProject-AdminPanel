import {
  Mail,
  Home,
  MessageSquare,
  Calendar,
  Airplay,
  Circle,
  FileText,
  Book,
  FilePlus,
  Archive,
  Tool,
  Bookmark,
  Briefcase,
  PenTool,
} from "react-feather";

export default [
  {
    id: "eCommerceDash",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/ecommerce",
  },
  {
    id: "calendar",
    title: "تقویم",
    icon: <Calendar />,
    navLink: "/apps/calendar",
  },
  {
    id: "chat",
    title: "تیکت پشتیبانی",
    icon: <MessageSquare />,
    navLink: "/apps/chat",
  },
  // {
  //   id: "secondPage",
  //   title: "Second Page",
  //   icon: <Mail size={20} />,
  //   navLink: "/second-page",
  // },
  // {
  //   id: "smaplePage",
  //   title: "Sample Page",
  //   icon: <Airplay size={20} />,
  //   // navLink: "/sample",
  //   children: [
  //     {
  //       id: "invoiceList",
  //       title: "List",
  //       icon: <Circle size={12} />,
  //       navLink: "/apps/invoice/list",
  //     },
  //   ],
  // },
  {
    id: "AllCourses",
    title: "تمام کورسها",
    icon: <Book size={20} />,
    navLink: "/AllCourses",
    children: [
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
      {
        id: "SocialGroup",
        title: "گروه هایه اجتمایی",
        icon: <MessageSquare style={{ width: 20, height: 20 }} />,
        navLink: "/SocialGroup",
      },

      // {
      //   id: "assistance",
      //   title: "مشاوران",
      //   icon: <PenTool style={{ width: 20, height: 20 }} />,
      //   navLink: "/assistance",
      // },
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
    navLink: "/pages/Buildings",
    children: [
      {
        id: "Buildings",
        title: "  مدیریت ساختمان ها  ",
        icon: <Circle size={20} />,
        navLink: "/pages/Buildings/list",
      },
      {
        id: "department",
        title: "  مدیریت  دپارتمان ها ",
        icon: <Circle size={12} />,
        navLink: "/pages/Buildings/department",
      },
      {
        id: "classroomManagement",
        title: "  مدیریت  کلاس  ها ",
        icon: <Circle size={12} />,
        navLink: "/pages/Buildings/ClassroomManagement",
      },
      {
        id: "TermManagement",
        title: "  مدیریت    ترم ها ",
        icon: <Circle size={12} />,
        navLink: "/pages/Buildings/TermManagement",
      },
    ],
  },

];
