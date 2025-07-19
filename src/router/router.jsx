import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Auth from "../pages/auth/Auth";

import Register from "../pages/auth/Register";
import Assignments from "../pages/assignments/Assignments";
import SignIn from "../pages/auth/SignIn";
import CreateAssignment from "../pages/Create-Assignment/CreateAssignment";
import AssignmentDetails from "../../components/AssignmentDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "auth",
        Component: Auth,
        children: [
          {
            path: "sign-in",
            Component: SignIn,
          },
          {
            path: "register",
            Component: Register,
          },
        ],
      },
      {
        path: "/assignments",
        Component: Assignments,
      },
      {
        path: "/create-assignment",
        Component: CreateAssignment,
      },
      {
        path: "/assignments/:id",
        Component: AssignmentDetails,
      },
    ],
  },
]);

export default router;
