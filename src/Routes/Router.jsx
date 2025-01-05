import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import ErrorPage from "../Pages/ErrorPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import UserProfile from "../Pages/Dashboard/Profiles/UserProfile";
import PrivateRoute from "./PrivateRoute";
// import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import AllBlogs from "../Pages/AllBlogs/AllBlogs";
import BlogDetails from "../Pages/AllBlogs/BlogDetails";
import UpdateLawyerProfile from "../Pages/Dashboard/Lawyer/UpdateLawyerProfile";
import LawyerProfile from "../Pages/Dashboard/Profiles/LawyerProfile";
import ExpertLawyers from "../Pages/ExpertLawyers/ExpertLawyers";
import LawyerDetails from "../Pages/ExpertLawyers/LawyerDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/allBlogs",
        element: <AllBlogs />,
      },
      {
        path: "/expertLawyers",
        element: <ExpertLawyers />,
      },
      {
        path: "/lawyer/:id",
        element: (
          <PrivateRoute>
            <LawyerDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/blogDetails/:id",
        element: (
          <PrivateRoute>
            <BlogDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // User Routes
      {
        index: true,
        element: (
          <PrivateRoute>
            <LawyerProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "updateLawyerProfile",
        element: (
          <PrivateRoute>
            <UserRoute>
              <UpdateLawyerProfile />
            </UserRoute>
          </PrivateRoute>
        ),
      },

      // Admin Routes
      // {
      //   path: "manageUsers",
      //   element: (
      //     <PrivateRoute>
      //       <AdminRoute>
      //         <ManageUsers />
      //       </AdminRoute>
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },
]);

export default router;
