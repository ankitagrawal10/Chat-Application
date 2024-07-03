import React from "react";
import Message from "./Message";

function Messages() {
  return (
    <div className="flex-1 overflow-y-auto p-2 md:p-4" style={{ minHeight: "calc(92vh - 8vh)" }}>
      <Message />
    </div>
  );
}

export default Messages;
