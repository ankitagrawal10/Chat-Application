import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function Users({ users }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === users._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(users._id);
  console.log(isOnline);

  return (
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(users)}
    >
      <div className="flex space-x-4 px-6 py-4 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
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
