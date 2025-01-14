import BuyCredit from "./pages/BuyCredit";
import Home from "./pages/Home";
import Result from "./pages/Result";
import { Routes, Route } from "react-router-dom";
import Layout from "./utils/Layout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import axios from "axios";

const App = () => {
  axios.defaults.baseURL = "http://localhost:4001/api";
  axios.defaults.withCredentials = true;
  return (
    <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-custom-gradient">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" index element={<Home />} />
          <Route path="/buy" element={<BuyCredit />} />
          <Route path="/image-generator" element={<Result />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;
