import { Sidebar } from "flowbite-react";
import { useContext } from "react";
import { BiBuoy } from "react-icons/bi";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import {
  HiArrowSmRight,
  HiArrowSmLeft,
  HiChartPie,
  HiTable,
} from "react-icons/hi";
import { AuthContext } from "../../context/AuthProvider";
import { useLocation, useNavigate, Link } from "react-router-dom";
const Sidebars = () => {
  const { logOut, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.pathname || "/";

  const LogOut = () => {
    logOut()
      .then(() => {
        alert("Log Out successfull!");
        navigate(from, { replace: true });
      })
      .catch();
  };

  return (
    <div>
      <Sidebar aria-label="Sidebar with content separator example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={FaGear}>
              <Link className="w-full" to="/admin/dashboard/manage">
                Manage
              </Link>
            </Sidebar.Item>
            <Sidebar.Item icon={FaCloudUploadAlt}>
              <Link className="w-full" to="/admin/dashboard/upload">
                Upload
              </Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiChartPie}>
              <Link to="/">Homepage</Link>
            </Sidebar.Item>




            {user?(<button className="w-full text-start" onClick={LogOut}>
              <Sidebar.Item icon={HiArrowSmLeft}>Sign Out</Sidebar.Item>
            </button>):
            (
            <Sidebar.Item icon={HiArrowSmRight}>
            <button ><Link to="/sign-in">Sign In</Link></button> 
         </Sidebar.Item>
          )}


          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default Sidebars;
