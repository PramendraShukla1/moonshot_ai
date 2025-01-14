import { useContext } from "react";
import { FaStar } from "react-icons/fa";
import { FcAddImage } from "react-icons/fc";
import { FcMindMap } from "react-icons/fc";
import { FcWebcam } from "react-icons/fc";
import { AppContext } from "../context/AppContext";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BuyCredit = () => {
  const { user, loadCreditsData, token } = useContext(AppContext);
  const navigate = useNavigate();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post("/user/verify-razorpay", response, {
            headers: { token },
          });
          if (data.success) {
            loadCreditsData();
            navigate("/");
            toast.success("credits added successfully!");
          }
        } catch (error) {
          toast.error(error.message);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorPay = async (planId) => {
    try {
      if (!user) {
        return <Navigate to={"/login"} />;
      }
      const { data } = await axios.post(
        "/user/pay-razorpay",
        {
          planId,
        },
        {
          headers: { token },
        }
      );
      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-center my-20">
      <div className="mb-10 text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500 items-center">
        <p>Moonshot AI Pricing</p>
        <FaStar className="text-[#ffdf39]" />
      </div>
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="text-4xl font-semibold">Money Saving Plans</h1>
        <p className="text-center  text-gray-600">
          Discover our exclusive Money Saving Plans designed to give you maximum
          value for your AI image generation needs. Choose from flexible credit
          bundles that let you create stunning images while saving more with
          each plan.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-20 w-full mt-20 px-10">
        <div className="border border-gray-600 h-full w-full rounded-2xl bg-gray-200 hover:border-black hover:scale-105 duration-200 p-5 flex flex-col justify-start items-start gap-4">
          <div>
            <FcAddImage size={40} />
          </div>
          <div className="flex flex-col gap-1 justify-start items-start">
            <p className="text-2xl font-semibold">Personal Plan</p>
            <p className="text-gray-700">Best for personal use</p>
          </div>
          <div className="mt-5">
            <p className="text-2xl font-semibold text-gray-900">
              &#x20B9; 5,360.67{" "}
              <span className="text-xs text-gray-600">/ 100 credits</span>
            </p>
          </div>
          <div className="flex justify-center items-center w-full mt-2">
            <button
              onClick={() => paymentRazorPay("Basic")}
              className="border border-black w-full p-3 rounded-xl bg-black text-white hover:bg-white hover:text-black duration-200 font-medium"
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        </div>
        <div className="border border-gray-600 h-full w-full rounded-2xl bg-gray-200 hover:border-black hover:scale-105 duration-200 p-5 flex flex-col justify-start items-start gap-4">
          <div>
            <FcMindMap size={40} />
          </div>
          <div className="flex flex-col gap-1 justify-start items-start">
            <p className="text-2xl font-semibold">Business Plan</p>
            <p className="text-gray-700">Best for business use</p>
          </div>
          <div className="mt-5">
            <p className="text-2xl font-semibold text-gray-900">
              &#x20B9; 29,908.26{" "}
              <span className="text-xs text-gray-600">/ 1000 credits</span>
            </p>
          </div>
          <div className="flex justify-center items-center w-full mt-2">
            <button
              onClick={() => paymentRazorPay("Advanced")}
              className="border border-black w-full p-3 rounded-xl bg-black text-white hover:bg-white hover:text-black duration-200 font-medium"
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        </div>
        <div className="border border-gray-600 h-full w-full rounded-2xl bg-gray-200 hover:border-black hover:scale-105 duration-200 p-5 flex flex-col justify-start items-start gap-4">
          <div>
            <FcWebcam size={40} />
          </div>
          <div className="flex flex-col gap-1 justify-start items-start">
            <p className="text-2xl font-semibold">Enterprise Plan</p>
            <p className="text-gray-700">Best for enterprise use</p>
          </div>
          <div className="mt-5">
            <p className="text-2xl font-semibold text-gray-900">
              &#x20B9; 73,770.64{" "}
              <span className="text-xs text-gray-600">/ 5000 credits</span>
            </p>
          </div>
          <div className="flex justify-center items-center w-full mt-2">
            <button
              onClick={() => paymentRazorPay("Business")}
              className="border border-black w-full p-3 rounded-xl bg-black text-white hover:bg-white hover:text-black duration-200 font-medium"
            >
              {user ? "Purchase" : "Get Started"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCredit;
