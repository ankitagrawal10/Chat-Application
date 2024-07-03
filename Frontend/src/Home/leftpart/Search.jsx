import React from "react";
import { FaSearch } from "react-icons/fa";

function Search() {
  return (
    <div className="h-[10vh] p-2">
      <form action="">
        <div className="flex space-x-3">
          <div className="flex items-center border border-gray-700 bg-slate-900 rounded-lg p-3 w-full">
            <input
              type="text"
              className="w-full bg-slate-900 text-white outline-none"
              placeholder="Search"
            />
            <FaSearch className="text-xl" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Search;
