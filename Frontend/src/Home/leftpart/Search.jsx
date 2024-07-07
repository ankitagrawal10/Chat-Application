import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUser from "../../context/useGetAllUser";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUser(); // Destructuring allUsers from the hook
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;

    const conversation = allUsers.find((user) =>
      user.fullName?.toLowerCase().includes(search.toLowerCase())
    );

    console.log(allUsers);
    console.log(conversation);

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User Not Found");
    }
  };

  return (
    <div className="h-[10vh] p-2">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <div className="flex items-center border border-gray-700 bg-slate-900 rounded-lg p-3 w-full">
            <input
              type="text"
              className="w-full bg-slate-900 text-white outline-none"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="text-xl" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Search;
