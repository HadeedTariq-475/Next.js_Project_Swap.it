import { Server } from "socket.io";

let io;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("🔌 Initializing Socket.IO server...");
    io = new Server(res.socket.server, {
      path: "/api/socket/io",
    });

    io.on("connection", (socket) => {
      console.log("⚡ New client connected");

      socket.on("join", (room) => {
        socket.join(room);
        console.log(`📦 User joined room: ${room}`);
      });

      socket.on("disconnect", () => {
        console.log("❌ Client disconnected");
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}

global.io = io;
