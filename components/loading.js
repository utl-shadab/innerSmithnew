import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-24 h-24 border-16 border-solid border-black border-t-4 border-t-gray-500 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
