import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-24 h-24 border-[16px] border-1 border-black border-t-gray-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
