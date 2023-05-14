import React from "react";

const SkeletonLoaderMovies = () => {
  return (
    <div className="relative w-full  animate-pulse">
      <div className=" img mb-2 w-full rounded-lg min-h-[110px] bg-gray-500"></div>
      <div className=" bookmarkIcon absolute top-2 right-2 cursor-pointer w-8 h-8 rounded-full bg-[rgba(0,_0,_0,_0.2)]"></div>
      <div className="flex flex-col  bottom-4 left-4 z-10">
        <div className="flex gap-x-4 font-light text-xs">
          <div className="w-8 h-3  bg-gray-500"></div>
          <div className="flex gap-x-1">
            <div className="flex gap-x-2">
              <p className="opacity-50 -mt-[2px]">•</p>
              <div className="w-16 h-3  bg-gray-500"></div>
            </div>
          </div>
          <div className="flex gap-x-2">
            <p className="opacity-50 -mt-[2px]">•</p>
            <p className="w-4 h-3  bg-gray-500"></p>
          </div>
        </div>
        <h2 className="mt-2 w-20 h-6 bg-gray-500"></h2>
      </div>
    </div>
  );
};

export default SkeletonLoaderMovies;
