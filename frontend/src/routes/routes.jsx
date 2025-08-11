import Read from "../pages/Read";
import Edit from "../pages/Edit";
import Addstaff from "../pages/Addstaff";
import App from "../App";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Read2 from "../pages/Read2";
import Home from "../components/Home"
import Update from "../pages/Update";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/read",
    element: <Read />,
  },
  {
    path: "/read/:id",
    element: <Read />,
  },
  {
    path: "/read2/:id",
    element: <Read2 />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
  {
    path: "/update/:id",
    element: <Update />,
  },
  {
    path: "/addstaff",
    element: <Addstaff />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/main",
    element: <Home />,
  },
]);

export default routes;
