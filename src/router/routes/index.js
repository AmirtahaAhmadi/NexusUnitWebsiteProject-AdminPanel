// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";
import Wizard from "../../pages/wizard";
import BasicCards from "../../pages/basic";
import Jobstitleanddata from "../../pages/basic/jobs/jobstitleanddata";
import Alljobsmenu from "../../pages/basic/jobs/Alljobsmenu";
import Updatejobsmenu from "../../pages/basic/jobs/updatejobsmenu";
// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";
// ** Utils
import { isObjEmpty } from "@utils";
import Assistance from "../../pages/basic/jobs/assistance";
import CourseSettingMenu from "../../pages/CourseSetting/CourseSettingMenu";
import JobsTable from "../../pages/basic/jobs/JobsTable";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/ecommerce";

const TermManagement = lazy(() => import("../../views/Bilding/TermManagement"));
const ClassroomManagement = lazy(() =>
  import("../../views/Bilding/ClassroomManagement"),
);
const CourseHelps = lazy(() => import("../../pages/CourseHelps"));
const Department = lazy(() => import("../../views/Bilding/Deportment"));
const Buildings = lazy(() => import("../../views/Bilding"));
const DashboardEcommerce = lazy(() =>
  import("../../Component/dashboard/ecommerce"),
);
const Calendar = lazy(() => import("../../views/apps/calendar"));
const Chat = lazy(() => import("../../views/apps/chat"));

const BlogList = lazy(() => import("../../views/blog/list"));
const BlogDetails = lazy(() => import("../../views/blog/details"));
const BlogEdit = lazy(() => import("../../views/blog/edit"));
const Category = lazy(() => import("../../views/blog/Category"));
const AddCategory = lazy(() => import("../../views/blog/Category/AddCategory"));

const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/ecommerce",
    element: <DashboardEcommerce />,
  },
  {
    element: <Calendar />,
    path: "/apps/calendar",
  },
    {
    path: '/apps/chat',
    element: <Chat />,
    meta: {
      appLayout: true,
      className: 'chat-application'
    }
  },
  {
    path: "/pages/blog/list",
    element: <BlogList />,
  },
  {
    path: "/pages/blog/detail/:id",
    element: <BlogDetails />,
  },
  {
    path: "/pages/blog/detail",
    element: <Navigate to="/pages/blog/detail/1" />,
  },

  {
    path: "/pages/blog/edit/:id",
    element: <BlogEdit />,
  },
  {
    path: "/pages/blog/edit",
    element: <Navigate to="/pages/blog/edit/b28b240b-2248-4b73-a6d5-5e9ab72e09dc" />,
  },
  {
    element: <Category />,
    path: "/pages/blog/category",
  },
  {
    path: "/pages/blog/add",
    element: <AddCategory />,
  },
  {
    element: <Buildings />,
    path: "/pages/Buildings/list",
  },
  {
    element: <Department />,
    path: "/pages/Buildings/department",
  },
  {
    element: <ClassroomManagement />,
    path: "/pages/Buildings/ClassroomManagement",
  },
  {
    element: <TermManagement />,
    path: "/pages/Buildings/TermManagement",
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },

  {
    path: "/updateCourses",
    element: <Wizard />,
  },
  {
    path: "/AllCourses",
    element: <BasicCards />,
  },
  {
    path: "/jobs",
    element: <Alljobsmenu />,
  },
  {
    path: "/updatejobs",
    element: <Updatejobsmenu />,
  },
  // {
  //   path: "/assistance",
  //   element: <Assistance />,
  // },
  {
    path: "/techupdate",
    element: <CourseSettingMenu />,
  },
  {
    path: "/CourseHelps",
    element: <CourseHelps />,
  },

];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
