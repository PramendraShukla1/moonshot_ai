import { useContext, useState } from "react";
import img from "../assets/aiImage_2.png";
import { Spinner } from "@material-tailwind/react";
import { AppContext } from "../context/AppContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Result = () => {
  const [image, setImage] = useState(img);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (prompt) {
      const image = await generateImage(prompt);
      if (image) {
        setIsImageLoaded(true);
        setImage(image);
      }
    }
    setLoading(false);
  };
  return (
    <>
      {" "}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form onSubmit={onSubmitHandler} className="flex flex-col min-h-[90vh]">
        <div className="flex justify-center mt-10 flex-col">
          <div className="flex flex-col gap-5 justify-center items-center">
            <h1 className="text-4xl font-semibold text-center">
              Generate your own AI Image
            </h1>
            <p className="text-center  text-gray-600">
              Welcome to the AI Image Generation Result page! Here, you can
              transform your creative prompts into stunning, AI-generated
              visuals with just a click.
            </p>
          </div>
          <div className="mt-10 flex justify-center">
            <div className="flex flex-col justify-center items-end relative w-fit">
              <img
                src={image}
                alt="img"
                className={`rounded-2xl shadow-xl ${loading ? "blur-sm" : ""}`}
              />
              {/* <span className="absolute  bottom-0 left-0 h-1.5 bg-red-500 w-full transition-all duration-[10s]"></span> */}
              <div
                className={`absolute justify-center items-center flex w-full h-full ${
                  loading ? "flex" : "hidden"
                }`}
              >
                <Spinner className="h-12 w-12 " color="red" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center lg:mt-10 mt-2">
          {!isImageLoaded && (
            <div className="flex lg:w-1/2 w-full p-1 h-14 pl-5 pr-1 rounded-full bg-[#6b6b6b]  lg:flex-row flex-col justify-between items-center relative">
              <input
                type="text"
                className="flex  outline-none bg-transparent placeholder:text-[#e0e0e0] placeholder:text-sm h-full w-full text-white text-base p-2 placeholder:font-normal"
                placeholder="Write your AI Image generation prompt here"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <button className="sm:static absolute top-16 left-0 justify-center text-center items-center rounded-full h-full lg:pl-10 lg:pr-10 bg-black text-white lg:text-sm text-base pr-20 pl-20 w-full lg:w-auto">
                Generate
              </button>
            </div>
          )}
        </div>
        <div className="lg:mt-5 mt-0  flex justify-center items-center w-full ">
          {isImageLoaded && (
            <div className=" flex gap-5 justify-between p-5 flex-col">
              <div className="flex flex-col justify-center items-center gap-5 p-5">
                <p className="text-xl font-bold ">Prompt:</p>
                <p className="text-lg font-medium text-center text-gray-600">
                  {prompt}
                </p>
              </div>

              <div className="flex justify-center items-center w-full">
                <div className=" flex gap-20 justify-between p-5 max-w-xl w-full">
                  <button
                    onClick={() => {
                      setIsImageLoaded(false);
                    }}
                    className=" rounded-full h-full pl-10 pr-10 p-4 bg-white border border-gray-700 text-black font-medium  text-sm hover:bg-black hover:text-white duration-200 text-center"
                  >
                    Generate Another
                  </button>
                  <a
                    href={image}
                    download
                    className=" rounded-full h-full pl-10 pr-10 p-4 bg-white border border-gray-700 text-black font-medium  text-sm hover:bg-black hover:text-white duration-200 flex gap-1"
                  >
                    Download <span className="lg:flex hidden">Image</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default Result;
