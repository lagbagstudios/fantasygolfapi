const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("join room", (room) => {
    socket.join(room);
    console.log(`User joined room ${room}`);
  });

  socket.on("leave room", (room) => {
    socket.leave(room);
    console.log(`User left room ${room}`);
  });

  socket.on("chat message", (room, msg) => {
    console.log(`sent message ${msg} to room ${room}`);
    io.to(room).emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
