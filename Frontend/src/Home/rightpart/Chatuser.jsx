import React from "react";
import useConversation from "../../zustand/useConversation";
import { useAuth } from "../../context/Authprovider";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const [authUser] = useAuth();
  console.log(selectedConversation);

  return (
    <div>
      {selectedConversation ? (
        <div className="flex items-center justify-center space-x-2 md:space-x-3 bg-gray-800 hover:bg-gray-700 duration-300 h-[8vh] px-2 md:px-4">
          <div className="avatar online">
            <div className="w-12 md:w-16 rounded-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="User Avatar"
              />
            </div>
          </div>
          <div>
            <h1 className="text-base md:text-xl">{selectedConversation.fullName}</h1>
            <span className="text-xs md:text-sm">Offline</span>
          </div>
        </div>
      ) : (
        <div className="flex h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-center">
              Welcome <span className="font-semibold text-xl">{authUser.user.fullName}</span>
            </h1>
            <p>No Chat Selected, Please Start a Conversation by selecting a contact.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatuser;
