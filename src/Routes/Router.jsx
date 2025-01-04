import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Authentication/Login/Login";
import Register from "../Authentication/Register/Register";
import ErrorPage from "../Pages/ErrorPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import UserProfile from "../Pages/Dashboard/Profiles/UserProfile";
import MealDetails from "../Components/Common/MealDetails";
import RequestedMeals from "../Pages/Dashboard/User/RequestedMeals";
import MyReviews from "../Pages/Dashboard/User/MyReviews";
import PaymentHistory from "../Pages/Dashboard/User/PaymentHistory";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import DasAllMeals from "../Pages/Dashboard/Admin/DasAllMeals";
import AllReviews from "../Pages/Dashboard/Admin/AllReviews";
import ServeMeals from "../Pages/Dashboard/Admin/ServeMeals";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import UserRoute from "./UserRoute";
import AddMeal from "../Pages/Dashboard/Admin/AddMeal";
import AllBlogs from "../Pages/AllBlogs/AllBlogs";

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
        path: "/mealDetails/:id",
        element: (
          <PrivateRoute>
            <MealDetails />
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
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "requestedMeals",
        element: (
          <PrivateRoute>
            <UserRoute>
              <RequestedMeals />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "myReviews",
        element: (
          <PrivateRoute>
            <UserRoute>
              <MyReviews />
            </UserRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <PrivateRoute>
            <UserRoute>
              <PaymentHistory />
            </UserRoute>
          </PrivateRoute>
        ),
      },

      // Admin Routes
      {
        path: "manageUsers",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "addMeal",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AddMeal />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "allMeals",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <DasAllMeals />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "allReviews",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllReviews />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "serveMeals",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ServeMeals />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
