import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <p className="hover:scale-110 duration-200 hover:font-semibold ">
        <Link to="https://www.linkedin.com/in/pramendra-shukla-11812a221/">
          {" "}
          Created with ❤️ by Pramendra Shukla
        </Link>
      </p>
    </div>
  );
};

export default Footer;
