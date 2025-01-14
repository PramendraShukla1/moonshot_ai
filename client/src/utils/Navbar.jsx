import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useContext, useState } from "react";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { AppContext } from "../context/AppContext";
import { MdMenu } from "react-icons/md";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";

const Navbar = () => {
  const { user, logout, credit } = useContext(AppContext);
  const [openRight, setOpenRight] = useState(false);

  const openDrawerRight = () => setOpenRight(true);
  const closeDrawerRight = () => setOpenRight(false);

  const navigate = useNavigate();

  const handlePricing = () => {
    navigate("/buy");
    setOpenRight(false);
  };
  const handleLogin = () => {
    navigate("/login");
    setOpenRight(false);
  };

  return (
    <>
      <div className="pt-5 pb-2 lg:flex justify-between items-center hidden">
        <div className="flex items-center gap-1">
          <Link to="/" className="flex items-center gap-1">
            <img src={logo} alt="logo" className="lg:h-10 h-10 bg-cover" />
            <h1 className="lg:text-3xl  md:text-2xl font-semibold">
              Moonshot AI
            </h1>
          </Link>
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-5">
              <button
                onClick={() => navigate("/buy")}
                className="text-black  hover:scale-95 duration-200 rounded-full bg-zinc-800 p-2 lg:pr-8 lg:pl-8 pr:6 pl:6 md:pr:8 md:pl:8 flex items-center gap-2 border border-gray-700 font-medium lg:text-base text-sm"
              >
                <FaWandMagicSparkles />
                Credit left:{" "}
                <span className="font-bold text-red-600">{credit}</span>
              </button>
              <button className="rounded-full relative group  flex items-center gap-2 text-black">
                Hi, {user.name}
                <span className=" rounded-full p-2 bg-[#f9fefd]">
                  <FaUser />
                </span>
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black   rounded pt-12">
                  <ul>
                    <li
                      onClick={logout}
                      className="bg-white text-black px-3 py-3 flex items-center rounded-full gap-2 duration-200 hover:text-red-600 border shadow-md"
                    >
                      Logout <FaSignOutAlt />
                    </li>
                  </ul>
                </div>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <button
                onClick={() => navigate("/buy")}
                className="text-gray-600 hover:text-black hover:scale-95 duration-200 lg:text-lg text-sm"
              >
                Pricing
              </button>
              <button
                onClick={() => navigate("/login")}
                className="text-black  hover:scale-95 duration-200 rounded-full bg-zinc-800 p-2 lg:pr-8 lg:pl-8 pr:6 pl:6 md:pr:8 md:pl:8 flex items-center gap-2 border border-gray-700 font-medium lg:text-base text-sm"
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="pt-5 pb-2 flex justify-between flex-row items-center lg:hidden w-full">
        <div>
          <Link to="/" className="flex items-center gap-1">
            <img src={logo} alt="logo" className="lg:h-10 h-10 bg-cover" />
            <h1 className="lg:text-3xl  md:text-2xl font-semibold">
              Moonshot AI
            </h1>
          </Link>
        </div>
        <div>
          <MdMenu size={25} onClick={openDrawerRight} />
          <Drawer
            placement="right"
            open={openRight}
            onClose={closeDrawerRight}
            className="p-4"
          >
            <div className="mb-6 flex items-center justify-between">
              <Typography variant="h5" color="blue-gray">
                <Link to="/" className="flex items-center gap-1">
                  <img
                    src={logo}
                    alt="logo"
                    className="lg:h-10 h-10 bg-cover"
                  />
                  <h1 className="lg:text-3xl  md:text-2xl font-semibold">
                    Moonshot AI
                  </h1>
                </Link>
              </Typography>
              <IconButton
                variant="text"
                color="blue-gray"
                onClick={closeDrawerRight}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </IconButton>
            </div>
            <hr className="w-full h-1 mt-0" />
            <div className="mt-4">
              {user ? (
                <div className="flex items-center gap-5 flex-col w-full justify-between h-full">
                  <button
                    onClick={handlePricing}
                    className="text-black  hover:scale-95 duration-200 rounded-full bg-zinc-800 p-2 lg:pr-8 lg:pl-8 pr:6 pl:6 md:pr:8 md:pl:8 gap-2 border border-gray-700 font-medium lg:text-base text-sm w-full flex justify-center items-center"
                  >
                    <FaWandMagicSparkles />
                    Credit left:{" "}
                    <span className="font-bold text-red-600">{credit}</span>
                  </button>
                  <div className="flex flex-col h-[480px] justify-between">
                    <button className="rounded-full relative group  flex items-center gap-2 text-black">
                      <span className=" rounded-full p-2 bg-[#f9fefd]">
                        <FaUser />
                      </span>
                      Hi, {user.name}
                      <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black   rounded pt-12"></div>
                    </button>
                    <button
                      onClick={logout}
                      className="text-lg border border-red-600 w-full rounded-full p-3 font-medium text-red-600 flex justify-center items-center gap-2"
                    >
                      Logout
                      <FaSignOutAlt />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-5 flex-col">
                  <button
                    onClick={handlePricing}
                    className="text-black hover:scale-95 duration-200 text-lg"
                  >
                    Pricing
                  </button>

                  <button
                    onClick={handleLogin}
                    className="text-black hover:scale-95 duration-200 text-lg"
                  >
                    Login
                  </button>
                </div>
              )}
            </div>
          </Drawer>
        </div>
      </div>
    </>
  );
};

export default Navbar;
