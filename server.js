const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = 3000;

app.use(express.static(__dirname + "/public"));

// app.get("/", (req, res) => {
//   // res.header('Content-Type','text/html');
//   res.sendFile(__dirname + "/index.html");
// });
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

let readPlayerCount = 0;
io.on("connection", (socket) => {
let room;
  console.log("Client connected ", socket.id);
  socket.on("disconnect", () => {
    console.log("Client disconnected ", socket.id);
  });

  socket.on("ready", () => {
    console.log("Player ready ", socket.id);
    readPlayerCount++;
    if (readPlayerCount % 2 === 0) {
      io.emit("startGame", socket.id);
    }
  });

  socket.on('paddleMove', (paddleData) => {
    socket.broadcast.emit('paddleMove', paddleData);
  });

  socket.on('ballMove', (ballData) => {
    socket.broadcast.emit('ballMove', ballData);
  });
});
