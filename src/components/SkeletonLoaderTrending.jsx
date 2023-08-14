import React from "react";

const SkeletonLoaderTrending = () => {
  return (
    <div className=" relative w-full min-w-[240px] max-h-[140px]  animate-pulse lg:w-[470px] lg:max-h-[230px]">
      <div className="  max-w-[240px] h-[140px] rounded-lg  bg-gray-500"></div>
      <div className="absolute top-2 right-2 cursor-pointer bg-gray-700  w-8 h-8 rounded-full bg-[rgba(0,_0,_0,_0.2)]"></div>
      <div className="flex flex-col absolute bottom-4 left-4 z-10">
        <div className="flex gap-x-4 font-light text-xs">
          <div className="w-8 h-3  bg-gray-700"></div>
          <div className="flex gap-x-1">
            <div className="flex gap-x-2">
              <p className="opacity-50 -mt-[2px] text-gray-700">•</p>
              <div className="w-16 h-3  bg-gray-700"></div>
            </div>
          </div>
          <div className="flex gap-x-2">
            <p className="opacity-50 -mt-[2px] text-gray-700">•</p>
            <p className="w-4 h-3  bg-gray-700"></p>
          </div>
        </div>
        <h2 className="mt-2 w-20 h-6 bg-gray-700"></h2>
      </div>
    </div>
  );
};

export default SkeletonLoaderTrending;
