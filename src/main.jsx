import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import router from "./Routes/router";
import "./index.css";
// import App from './App.jsx'
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <BrowserRouter> */}
    {/* <App /> */}
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>

    {/* </BrowserRouter> */}
  </StrictMode>
);
