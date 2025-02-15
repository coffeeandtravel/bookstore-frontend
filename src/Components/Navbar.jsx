import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBlog } from "react-icons/fa";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
// import Logo from '../assets/logo.png'
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setStickey] = useState(false);

  const {user} = useContext(AuthContext);
  // console.log(user)
  const {logOut} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.pathname || "/";
  
  const LogOut = () =>{
    logOut().then(()=>{
      alert("Log Out successfull!");
      navigate(from, {replace:true});
    })
    .catch()

  }
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setStickey(true);
      } else {
        setStickey(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    }; 
  });
  
  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Store", path: "/store" },
    { link: "Sell Books", path: "/admin/dashboard" },
    
  ];
  return (
    <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300 z-10">
      <nav className={`py-4 lg:px-24 px-4 ${isSticky?"sticky top-0 left-0 right-0 bg-purple-300":""}`}>
        <div className="flex justify-between items-center text-base gap-8">
          {/*logo*/}
          <Link
            to="/"
            className="text-2xl font-bold text-purple-700 flex items-center gap-2"
          >
            {" "}
            <FaBlog className="inline-block" />
            Book Joint
          </Link>
          {/* navitems here for large devices  */}
          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className="block text-base text-black uppercase cursor-pointer hover:text-purple-700"
              >
                {link}
              </Link>
            ))}
          </ul>
          <div className="space-x-12 hidden lg:flex items-center">
            <button>
              <FaBarsStaggered className="w-5 hover:text-purple-700 lg:hidden" />
            </button>
            {
              user?<button className="py-1 px-3 rounded-md text-white bg-purple-600" onClick={LogOut} >Log Out</button>:<button className="py-1 px-3 rounded-md text-white bg-purple-600"> <Link to='/sign-in'>Log In</Link> </button>
            }
          </div>
          {/* Menu for smaller screens */}
          <div className="md:hidden lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-black outline-none transition-transform"
            >
              {isOpen ? (
                <FaXmark className="h-5 w-5 text-black transition-transform" />
              ) : (
                <FaBarsStaggered className="h-5 w-5 text-black transition-transform" />
              )}
            </button>
          </div>
        </div>
        {/* render navitems for sm devices */}
        <div className={`space-y-4 px-4 mt-16 py-4 overflow-scroll bg-purple-700 text-white ${isOpen?"block top-0 right-0 left-0": "hidden"}`}>
        {navItems.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className="block text-base text-black uppercase cursor-pointer hover:text-white"
              >
                {link}
              </Link>
            ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
