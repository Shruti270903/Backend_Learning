const http = require("http");
const express = require("express");

const app = express();

app.get("/", (req, res)=>{
  return res.send('Hello by express home page')
});

app.get("/about", (req, res)=>{
  return res.send("Hello from About Page" + "hey you yes you " + req.query.name);
});

// const myServer = http.createServer(app);

// myServer.listen(8000, ()=> console.log("Server Started"));

app.listen(8000, ()=> console.log("Server started by express"));