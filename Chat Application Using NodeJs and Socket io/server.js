const express = require("express");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 8000;

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

http.listen(PORT, () => {
  console.log(`Listing On port ${PORT}`);
});

//socket
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("Connected..");
  //listing the message from user
  socket.on("message", (msg) => {
    //sending message to clients or browser and// we can give any name here (data)
    socket.broadcast.emit("message", msg);
  });
});
