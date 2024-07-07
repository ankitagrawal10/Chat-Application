import React, { useEffect } from "react";
import { useSocketContext } from "./SocketContext";
import useConversation from "../zustand/useConversation";
import sound from "../assets/notification.mp3";

function useGetSocketMessage() {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessages([...messages, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, messages, setMessages]);
}

export default useGetSocketMessage;
