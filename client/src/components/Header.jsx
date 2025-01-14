import { FaStar } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import aiImage_1 from "../assets/aiImage_1.png";
import aiImage_2 from "../assets/aiImage_2.png";
import aiImage_3 from "../assets/aiImage_3.png";
import aiImage_4 from "../assets/aiImage_4.png";
import aiImage_5 from "../assets/aiImage_5.png";
import aiImage_6 from "../assets/aiImage_6.png";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
const Header = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  console.log(user);

  const handleGenerateImages = () => {
    if (user) {
      navigate("/image-generator");
    } else {
      navigate("/login");
    }
  };
  return (
    <motion.div
      initial={{ scale: 0 }}
      transition={{ duration: 0.5 }}
      animate={{ scale: 1 }}
      className="flex flex-col justify-center items-center text-center my-20"
    >
      <div className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500 items-center">
        <p>Best text to image generator</p>
        <FaStar className="text-[#ffdf39]" />
      </div>
      <h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center"
      >
        Turn text to <span className="text-blue-600">image</span>, in seconds
      </h1>
      <p className="text-center max-w-xl mx-auto mt-5">
        Unleash your creativity with AI. Turn your imagination into visual art
        in seconds - just type, and watch the magic happen.
      </p>
      <button
        onClick={handleGenerateImages}
        className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full"
      >
        Generate Images <BsStars />
      </button>

      <div className="flex lg:flex-row gap-2 py-5 flex-wrap justify-center items-center mt-10 p-3 lg:p-0 lg:flex-nowrap">
        <img
          src={aiImage_1}
          alt="img"
          width={80}
          height={80}
          className="rounded-xl hover:scale-110 duration-200"
        />

        <img
          src={aiImage_2}
          alt="img"
          width={80}
          height={80}
          className="rounded-xl hover:scale-110 duration-200"
        />
        <img
          src={aiImage_3}
          alt="img"
          width={80}
          height={80}
          className="rounded-xl hover:scale-110 duration-200"
        />
        <img
          src={aiImage_4}
          alt="img"
          width={80}
          height={80}
          className="rounded-xl hover:scale-110 duration-200"
        />
        <img
          src={aiImage_5}
          alt="img"
          width={80}
          height={80}
          className="rounded-xl hover:scale-110 duration-200"
        />
        <img
          src={aiImage_6}
          alt="img"
          width={80}
          height={80}
          className="rounded-xl hover:scale-110 duration-200 "
        />
      </div>
      <p className="text-sm mt-2 text-neutral-600">
        Generated images from{" "}
        <span className="font-bold text-lg text-[#2e61ec]">Moonshot AI</span>
      </p>
    </motion.div>
  );
};

export default Header;
