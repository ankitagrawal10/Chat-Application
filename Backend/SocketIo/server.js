
import { Server } from 'socket.io';
import http from "http";
import express from "express";
import { log } from "console";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:['http://localhost:5173', 'http://chatapp.com'],
    credentials: true,
    method: ["GET,POST"],
  },
});
// realtime goes here
export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("Hello", users);
  }
  io.emit("getonlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
    delete users[userId];
    io.emit("getonlineUsers", Object.keys(users));
  });
});

export { app, io, server };
