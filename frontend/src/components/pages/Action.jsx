import React from "react";

const Action = () => {
  return (
    <div className="w-full h-[92vh] flex flex-row gap-[10px] bg-gray-900 justify-center items-center ">
      <div className="user-field w-[40%] h-[80vh] flex flex-col justify-center gap-[20px] items-center bg-transparent rounded-[10px]  text-white">
        <nav className="w-full h-[50px] rounded-[10px] bg-gray-800"></nav>

        <main className="w-full h-[70vh] bg-black rounded-2xl"></main>
      </div>

      <div className="w-[50%] h-[80vh] rounded-[10px] bg-black border border-l-gray-700"></div>
    </div>
  );
};

export default Action;
