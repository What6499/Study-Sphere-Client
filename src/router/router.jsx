import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Auth from "../pages/auth/Auth";

import Register from "../pages/auth/Register";
import Assignments from "../pages/assignments/Assignments";
import SignIn from "../pages/auth/SignIn";
import CreateAssignment from "../pages/Create-Assignment/CreateAssignment";
import AssignmentDetails from "../../components/AssignmentDetails";
import MyAssignments from "../../Dashboard/MySubmissions";
import Dashboard from "../../Dashboard/Dashboard";
import UpdateAssignment from "../pages/UpdateAssignmnet/UpdateAssignment";
import PrivateRoute from "../../components/PrivateRoute";
import NotFound from "../../components/NotFound";
import PendingAssignments from "../pages/PendingAssignmnets/PendingAssignments";
import Leaderboard from "../pages/Leaderboard/Leaderboard";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "auth",
        Component: Auth,
      },
      {
        path: "/assignments",
        Component: Assignments,
      },
      {
        path: "/create-assignment",
        element: (
          <PrivateRoute>
            <CreateAssignment></CreateAssignment>
          </PrivateRoute>
        ),
      },
      {
        path: "/assignments/:id",
        element: (
          <PrivateRoute>
            <AssignmentDetails></AssignmentDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "update-assignment/:id",
        element: (
          <PrivateRoute>
            <UpdateAssignment></UpdateAssignment>
          </PrivateRoute>
        ),
      },
      {
        path: "/pending-assignments",
        element: (
          <PrivateRoute>
            <PendingAssignments></PendingAssignments>
          </PrivateRoute>
        ),
      },
      {
        path: "/leaderboard",
        Component: Leaderboard,
      },
    ],
  },
]);

export default router;
