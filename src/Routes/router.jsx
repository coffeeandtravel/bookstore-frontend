import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Homepage from "../Pages/HomePage/Homepage";
import Store from "../Pages/Store/Store";
import About from "../Components/About";
import Blog from "../Components/Blog";
import SingleBook from "../Pages/Store/SingleBook";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import UploadBook from "../Pages/Dashboard/UploadBook";
import Dashboard from "../Pages/Dashboard/Dashboard";
import ManageBooks from "../Pages/Dashboard/ManageBooks";
import EditBooks from "../Pages/Dashboard/EditBooks";
import SIgnUp from "../Components/SIgnUp";
import Login from "../Components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/store", element: <Store /> },
      { path: "/about", element: <About /> },
      { path: "/blog", element: <Blog /> },
      {
        path: "/book/:id",
        element: <SingleBook />,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_BACKEND_URL}/books/book/${params.id}`),
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "", element: <PrivateRoute><Dashboard/></PrivateRoute> }, // Default child route for "/admin/dashboard"
      { path: "upload", element: <UploadBook /> },
      { path: "manage", element: <ManageBooks /> },
      { 
        path: "edit/:id", 
        element: <EditBooks/>,
        loader:({params})=>fetch(`${import.meta.env.VITE_BACKEND_URL}/books/book/${params.id}`)
    },
    ],
  },
  {
    path: "sign-up",
    element: <SIgnUp/>
  },
  {
    path:'sign-in',
    element:<Login/>
  }
]);

export default router;
