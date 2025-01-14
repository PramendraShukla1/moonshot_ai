import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);
  const [totalCredit, setTotalCredit] = useState(false);

  const baseURL = import.meta.env.VITE_PORT;

  const logout = async (e) => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  const loadCreditData = async () => {
    try {
      const { data } = await axios.get("/user/credits", { headers: { token } });

      if (data.success) {
        setCredit(data?.credits);
        setUser(data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        "/image/generate-image",
        {
          prompt,
        },
        { headers: { token } }
      );
      if (data.success) {
        loadCreditData();
        return data.resultImg;
      } else {
        console.log(data.message);
        loadCreditData();
        toast.error(data.message);
        if (data.creditBalance === 0) {
          setTotalCredit(true);
        }
      }
      if (setTotalCredit) {
        <Navigate to="/buy" />;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      loadCreditData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    baseURL,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditData,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
