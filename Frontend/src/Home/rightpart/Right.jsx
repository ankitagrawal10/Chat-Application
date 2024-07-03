import React from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";

function Right() {
  return (
    <div className="w-full bg-slate-900 text-gray-300 flex flex-col h-screen">
      <div className="flex-shrink-0">
        <Chatuser />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Messages />
      </div>
      <div className="flex-shrink-0">
        <Typesend />
      </div>
    </div>
  );
}

export default Right;
