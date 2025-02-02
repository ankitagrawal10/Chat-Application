import React from "react";
import useConversation from "../../zustand/useConversation";
import { useAuth } from "../../context/Authprovider";
import { useSocketContext } from "../../context/SocketContext";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const [authUser] = useAuth();
  const { onlineUsers } = useSocketContext();
  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "online" : "offline";
  };
  console.log(selectedConversation);

  return (
    <div>
      {selectedConversation ? (
        <div className="flex items-center justify-center space-x-2 md:space-x-3 bg-gray-800 hover:bg-gray-700 duration-300 h-[8vh] px-2 md:px-4">
          <div className="avatar">
            <div className="w-12 md:w-16 rounded-full">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="User Avatar"
              />
            </div>
          </div>
          <div>
            <h1 className="text-base md:text-xl">
              {selectedConversation.fullName}
            </h1>
            <span className="text-xs md:text-sm">
              {getOnlineUsersStatus(selectedConversation._id)}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-center">
              Welcome{" "}
              <span className="font-semibold text-xl">
                {authUser.user.fullName}
              </span>
            </h1>
            <p>
              No Chat Selected, Please Start a Conversation by selecting a
              contact.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatuser;
