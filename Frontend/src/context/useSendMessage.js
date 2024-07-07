import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import axios from "axios";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, setMessages, messages } = useConversation();
  const sendMessages = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );
      setMessages([...messages, res.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error in send messages", error);
      setLoading(false);
    }
  };
  return { loading, sendMessages };
}

export default useSendMessage;
