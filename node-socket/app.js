// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

io.on('connection', (socket) => {
  //console.log('Client connected');

  // Handle events from the client
  socket.on('updateData', (data) => {
    console.log('Message from client:', data);

    // Broadcast the message to all connected clients
    io.emit('angular', data);
  });

  socket.on('disconnect', () => {
    //console.log('Client disconnected');
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
