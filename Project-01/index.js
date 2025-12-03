const express = require("express");
const { connectMongoDb } = require("./connection");

const { logReqRes } = require("./middlewares");

const userRouter = require("./routes/user");

const app = express();
const PORT = 8000;

//connection
connectMongoDb(
  "mongodb+srv://shruti:23bca85@cluster0.6oth21r.mongodb.net/yt-app-1").then(() => {
  console.log("MongoDB connected successfully");
}).catch((err) => {
  console.log("MongoDB connection failed", err);
}); 

//midleware-plugin
app.use(express.urlencoded({ extended: false })); //builtin middleware
app.use(logReqRes("log.txt"));
//Routes
app.use("/api/users", userRouter);
app.listen(PORT, () => console.log(`server started at ${PORT}`));

