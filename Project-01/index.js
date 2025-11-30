const fs = require("fs");
const express = require("express");
const users = require("./MOCK_DATA.json");
const app = express();
const PORT = 6000;

//midleware-plugin

app.use(express.urlencoded({ extended: false })); //builtin middleware
app.use(express.json()); // FIXED
app.use((req, res, next) => {
  req.myUserName = "shruti.dev";
  fs.appendFile(
    "log.txt",
    `${Date.now()}: ${req.ip}: ${req.method}: ${req.path}\n `,
    (err, data) => {
      next();
    }
  );
});
app.use((req, res, next) => {
  console.log("i'm your middleware 2", req.myUserName);
  next();
});
//ROUTES
app.get("/users", (req, res) => {
  const html = `<ul>${users
    .map((user) => `<li>${user.first_name}</li>`)
    .join(" ")}</ul>`;
  res.send(html);
});

//REST API
app.get("/api/users", (req, res) => {
  // res.setHeader("myName", "shruti");
  // console.log(req.headers);   //custom header
  res.setHeader("X-MyName", "shruti");
  //always add X to custom headers
  return res.send(users);
});
app.route("/api/users/:id").get((req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) return res.status(404).json({ status: "User Not Found" });
  return res.json(user);
});
app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = req.body;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ status: "User Not Found" });
  }
  users[userIndex] = { ...users[userIndex], ...data }; // FIXED
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), () => {
    return res.json({
      status: "updated successfully",
      updatedUser: users[userIndex],
    });
  });
});
app.delete("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ status: "User Not Found" });
  }
  users.splice(userIndex, 1);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), () => {
    return res.json({ status: "deleted successfully", deletedId: id });
  });
});
app.post("/api/users", (req, res) => {
  const data = req.body;
  const newUser = { id: users.length + 1, ...data };
  users.push(newUser);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), () => {
    res.json({
      status: "user created successfully",
      newUser,
    });
  });
});

app.listen(PORT, () => console.log("server started at 6000"));
