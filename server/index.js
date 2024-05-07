const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const queue = { preparing: [], serving: [] };

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  socket.emit("update_queue", queue);

  socket.on("update_preparing", (data) => {
    queue.preparing.push(data);
    io.emit("update_queue", queue);
  });

  socket.on("move_to_serving", (index) => {
    if (index >= 0 && index < queue.preparing.length) {
      queue.serving.push(queue.preparing.splice(index, 1)[0]);
      io.emit("update_queue", queue);
    }
  });

  socket.on("delete_preparing", (index) => {
    if (index >= 0 && index < queue.preparing.length) {
      queue.preparing.splice(index, 1);
      io.emit("update_queue", queue);
    }
  });

  socket.on("delete_serving", (index) => {
    if (index >= 0 && index < queue.serving.length) {
      queue.serving.splice(index, 1);
      io.emit("update_queue", queue);
    }
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
