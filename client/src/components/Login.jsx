import React, { useContext, useState } from "react";
import img from "../assets/logo.png";
import { Link, Navigate } from "react-router-dom";
import { IoLockClosedOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser, loadCreditData } = useContext(AppContext);

  const handleloginSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setError(true);
        setErrorMessage("Both fields are required!");
      }
      const res = await axios.post("/user/login", {
        email,
        password,
      });

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        setRedirect(true);
        setUser(res.data);
        loadCreditData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10  flex justify-center items-center p-4 lg:p-0">
      <form className="border border-gray-400 shadow-2xl h-[450px] w-[500px] p-10 flex flex-col gap-5 bg-gray-100 rounded-2xl ">
        <div className="flex flex-row  justify-center items-center gap-3 mb-5">
          <img src={img} alt="logo" className="h-10" />
          <h1 className="text-3xl font-semibold">Moonshot AI</h1>
        </div>

        <div className="mt-0 w-full flex h-full flex-col gap-5 relative">
          <div className="flex items-center justify-center gap-3 w-full p-3 border border-gray-400 rounded-xl bg-white">
            <MdOutlineMailOutline size={20} className="text-gray-700" />
            <input
              type="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent  text-lg placeholder:text-sm text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 w-full p-3 border border-gray-400 rounded-xl bg-white">
            <IoLockClosedOutline size={18} className="text-gray-700" />
            <input
              type="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent  text-lg placeholder:text-sm text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-start items-start absolute bottom-3 right-0">
            <p className="text-gray-700 hover:text-black duration-150 text-sm font-normal cursor-pointer">
              Forgot password?
            </p>
          </div>

          <button
            onClick={handleloginSubmit}
            className="p-3 w-full outline-none border border-gray-400 rounded-xl hover:bg-black hover:text-white duration-200 text-lg font-medium"
          >
            Login
          </button>
          <div className="">
            {error ? (
              <h1 className="text-red-700 text-sm underline underline-offset-4">
                {errorMessage}
              </h1>
            ) : null}
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Link
            to="/register"
            className="text-sm font-normal text-gray-700 hover:text-black duration-200"
          >
            Don't have an account sign up here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
