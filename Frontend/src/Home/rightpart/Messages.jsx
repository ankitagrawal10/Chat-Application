import React, { useEffect, useRef } from "react";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import Message from "./Message.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  };

  const { loading, messages } = useGetMessage();
  useGetSocketMessage();

  const lastMsgRef = useRef();
  let lastMessageDate = null;

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div
      className="flex-1 overflow-y-auto p-2 md:p-4"
      style={{ minHeight: "calc(92vh - 8vh)" }}
    >
      {loading ? (
        <Loading />
      ) : (
        messages.length > 0 &&
        messages.map((message, index) => {
          const messageDate = new Date(message.createdAt);
          const formattedDate = formatDate(messageDate);
          const showDate = lastMessageDate !== formattedDate;
          lastMessageDate = formattedDate;

          return (
            <div key={message._id || index} ref={lastMsgRef}>
              {showDate && (
                <div className="text-center text-gray-400 my-2">
                  {formattedDate}
                </div>
              )}
              <Message message={message} />
            </div>
          );
        })
      )}
      {!loading && messages.length === 0 && (
        <div>
          <p className="text-center mt-[20%]">
            Say! Hi to start the conversation
          </p>
        </div>
      )}
    </div>
  );
}

export default Messages;
