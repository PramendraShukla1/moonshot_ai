import { FaEye } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { FaWandMagicSparkles } from "react-icons/fa6";
import aiImage from "../assets/aiImage_4.png";
import { motion } from "motion/react";

const Steps = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      transition={{ duration: 0.5 }}
      animate={{ scale: 1 }}
    >
      <div className="py-10 flex flex-col w-full justify-center items-center gap-5">
        <p className="font-semibold text-5xl">How it works</p>
        <p className="text-gray-700">Transform Words into Stunning Images</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-10 py-5 ">
        <div className="border border-gray-400 h-48 rounded-xl hover:border-black duration-200 grid grid-rows-3 gap-5 items-center place-items-center p-5 cursor-default hover:scale-105 ">
          <div>
            <FaEye size={30} className="text-gray-700" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold ">Describe Your Vision</p>
          </div>
          <div>
            <p className="text-center text-gray-700">
              Type a phrase, sentence, or peragraph that descrbes the image you
              want to create.
            </p>
          </div>
        </div>
        <div className="border border-gray-400 h-48 rounded-xl hover:border-black duration-200 grid grid-rows-3 gap-5 items-center place-items-center p-5 cursor-default hover:scale-105">
          <div>
            <FaWandMagicSparkles size={30} className="text-gray-700" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold ">Watch the Magic</p>
          </div>
          <div>
            <p className="text-center text-gray-700">
              Our AI-powered engine will transform your text inti a
              high-quality, unique image in seconds.
            </p>
          </div>
        </div>
        <div className="border border-gray-400 h-48 rounded-xl hover:border-black duration-200 grid grid-rows-3 gap-5 items-center place-items-center p-5 cursor-default hover:scale-105">
          <div>
            <FaDownload size={30} className="text-gray-700" />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold ">Download & Share</p>
          </div>
          <div>
            <p className="text-center text-gray-700">
              Instantly Download your creation or share it with the world
              directly from our platform.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-10 lg:px-20">
        <div className="py-10 flex flex-col w-full justify-center items-center lg:gap-5 gap-2">
          <p className="font-semibold lg:text-5xl text-4xl">Create AI Images</p>
          <p className="text-gray-700">Turn your imagination into visuals</p>
        </div>
        <div className="flex lg:flex-row flex-col gap-10 mt-10">
          <div className="lg:w-1/2 w-full h-full ">
            <img src={aiImage} alt="img" className="rounded-2xl shadow-lg" />
          </div>
          <div className="lg:w-1/2 w-full h-full flex flex-col gap-5 justify-center items-center p-10 pl-0 pr-0">
            <p className="text-4xl leading-[50px]">
              Introducing the AI-Powered Text to Image Generator
            </p>
            <p className="text-gray-600 text-sm">
              Easily bring your ideas to life with our free AI Image generator.
              Weather you need stunning visuals or unique imagery, our tool
              transforms your text into eye-catching images with just a few
              clicks. Imagine it describe it, and watch it come to life
              instantly.
              <br />
              <br />
              Simply type in a text prompt, and our cutting-edge AI will
              generate high-quality images in second. From product visuals to
              character designs and portraits, even concepts that don&apos;t yet
              exist can be visualized effortlessly. Powered by advanced AI
              technology, the creative possibilities are limitless!
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Steps;
