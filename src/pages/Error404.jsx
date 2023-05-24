import React from "react";
import ErrorImg from "../assets/404Img.png";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center j h-screen ">
      <img
        src={ErrorImg}
        alt="Error 404"
        className="w-full relative  md:w-[500px] md:h-[500px]"
      />
      <div className="absolute mt-[380px] flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-2">Error 404</h1>
        <p className="text-gray-600 mb-6">Page not found</p>
        <Link
          to="/"
          className="px-4 py-2 bg-darkBlue shadow shadow-white text-white rounded hover:bg-blue-600"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
