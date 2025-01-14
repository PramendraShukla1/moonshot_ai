import React, { useState } from "react";
import img from "../assets/logo.png";
import { Link, Navigate } from "react-router-dom";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!username || !email || !password) {
        setError(true);
      }
      const res = await axios.post("/user/register", {
        username,
        email,
        password,
      });
      if (res.data.success) {
        setRedirect(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10  flex justify-center items-center p-4 lg:p-0">
      <form
        onSubmit={onSubmitHandler}
        className="border border-gray-400 shadow-2xl h-full max-h-[500px] w-[500px] p-10 flex flex-col gap-5 bg-gray-100 rounded-2xl  items-center"
      >
        <div className="flex flex-row  justify-center items-center gap-3 mb-5">
          <img src={img} alt="logo" className="h-10" />
          <h1 className="text-3xl font-semibold">Moonshot AI</h1>
        </div>
        <div className="mt-0 w-full flex justify-center items-center h-full flex-col gap-5">
          <div className="flex items-center justify-center gap-3 w-full p-3 border border-gray-400 rounded-xl bg-white">
            <FaRegUser size={15} className="text-gray-700" />
            <input
              type="text"
              placeholder="Username"
              className="w-full outline-none bg-transparent  text-lg placeholder:text-sm text-gray-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          <button className="p-3 w-full outline-none border border-gray-400 rounded-xl hover:bg-black hover:text-white duration-200 text-lg font-medium">
            Register
          </button>
          <div>
            {error ? (
              <h1 className="text-red-700 text-sm underline underline-offset-4">
                All fields are required!
              </h1>
            ) : null}
          </div>
        </div>

        <div>
          <Link
            to="/login"
            className="text-sm font-normal text-gray-700 hover:text-black duration-200"
          >
            Already have an account login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
