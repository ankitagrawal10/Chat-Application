import React from "react";
import { IoSend } from "react-icons/io5";

function Typesend() {
  return (
    <div className="flex items-center bg-gray-800">
      <div className="w-full px-4">
        <input
          type="text"
          placeholder="Type here"
          className="border border-gray-700 outline-none px-4 py-3 w-full rounded-xl text-gray-300 bg-transparent"
        />
      </div>
      <button className="text-gray-300">
        <IoSend className="text-2xl md:text-3xl hover:text-gray-400 cursor-pointer" />
      </button>
    </div>
  );
}

export default Typesend;
