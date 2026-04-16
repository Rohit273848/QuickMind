import { io } from "socket.io-client";

let socket;

export function initializeSocketConnection(userId) {
  socket = io("http://localhost:3000", {
    withCredentials: true,
  });

  socket.on("connect", () => {
    console.log("Connected to socket:", socket.id);

    // 🔥 join user room
    socket.emit("join", userId);
  });

  return socket;
}

export function getSocket() {
  return socket;
}