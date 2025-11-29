//rest api creating
const express = require("express");
let users = require("./MOCK_DATA.json");   // use let, so we can update data
const app = express();
const PORT = 8000;
app.use(express.json()); // IMPORTANT for POST & PATCH body parsing
app.get("/users", (req, res) => {
  const html = `
<ul>
${users.map((user) => `<li>${user.first_name}</li>`).join("")}
</ul>
`;
  res.send(html);
});
app.get("/api/users", (req, res) => {
  return res.send(users);
});
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user || { message: "User not found" });
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { first_name, last_name, email } = req.body;
    if (first_name !== undefined) user.first_name = first_name;
    if (last_name !== undefined) user.last_name = last_name;
    if (email !== undefined) user.email = email;
    return res.json({ message: "User updated", user });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const oldLength = users.length;
    users = users.filter((user) => user.id !== id);
    if (users.length === oldLength) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User deleted successfully" });
  });
app.post("/api/users", (req, res) => {
  const { first_name, last_name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    first_name,
    last_name,
    email,
  };
  users.push(newUser);
  return res.status(201).json({ message: "User created", user: newUser });
});
app.listen(PORT, () => console.log("Server Started at port 8000"));
