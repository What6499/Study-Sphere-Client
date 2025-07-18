import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Auth from "../pages/auth/Auth";

import Register from "../pages/auth/Register";
import Assignments from "../pages/assignments/Assignments";
import SignIn from "../pages/auth/SignIn";

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
    ],
  },
]);

export default router;
