import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Auth from "../pages/auth/Auth";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Assignments from "../pages/assignments/Assignments";

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
            path: "login",
            Component: Login,
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
    ],
  },
]);

export default router;
