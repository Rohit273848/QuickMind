import { Server } from "socket.io";

let io;

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  console.log("Socket.io server is running...");

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // 👇 join room (important for later)
    socket.on("join", (userId) => {
      socket.join(userId);
      console.log("User joined room:", userId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

export function getIo() {
  if (!io) {
    throw new Error("Socket not initialized");
  }
  return io;
}