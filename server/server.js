import express from "express";
import "dotenv/config";
import cors from "cors";
import http, { createServer } from "http";
import { connectDB } from "./libs/db.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";
import { Server } from "socket.io";

//using http coz socket io support http server
const app = express();
const server = http.createServer(app);

//initialize socket.io server
export const io = new Server(server, { cors: { origin: "*" } });

//store online users
export const userSocketMap = {}; //userid, sockerid

//socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("user connected", userId);

  if (userId) userSocketMap[userId] = socket.id;

  //Emit online users to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("User disconnected ", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

//middleware
app.use(express.json({ limit: "4mb" }));
app.use(cors());

//route setup
app.use("/api/status", (req, res) => res.send("server is live"));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

//connect to mongodb
await connectDB();
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT;
  server.listen(PORT, () => console.log(`server is runnning on ${PORT}`));
}


//export server for vercel
export default server;
