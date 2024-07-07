import React from "react";
import useConversation from "../../zustand/useConversation.js";

function Users({ users }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === users._id;

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(users)}
    >
      <div className="flex space-x-4 px-6 py-4 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              alt="User Avatar"
            />
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <h1 className="font-bold truncate mt-2">{users.fullName}</h1>
          {/* <span className="block truncate">{users.email}</span> */}
        </div>
      </div>
    </div>
  );
}

export default Users;
