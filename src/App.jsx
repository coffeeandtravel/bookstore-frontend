import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AppFooter from "./Components/AppFooter";

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <AppFooter />
    </>
  );
}

export default App;
