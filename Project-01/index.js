const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose"); 
const users = require("./MOCK_DATA.json");
const { error } = require("console");
const { type } = require("os");
const PORT = 6001;
const app = express();
//connection
mongoose 
.connect("mongodb+srv://shruti:23bca85@cluster0.6oth21r.mongodb.net/yt-app-1")
.then(()=> console.log("MongoDB Connected"))
.catch((err)=> console.log("Mongo Error", err));

//Schema
const userSchema = new mongoose.Schema({
  fisrtName:{
  type:String,
  required: true,
  }, 
  lastName:{
    type:String,
   
  },
  email:{
    type:String,
    required: true,
    unique:true
  },
  gender:{
    type:String,
    required:true
  },
  jobTitle:{
    type:String,
    required: true
  }

}, 
{timestamps: true});

const User = mongoose.model("user", userSchema);

//midleware-plugin

app.use(express.urlencoded({ extended: false })); //builtin middleware
app.use(express.json()); // FIXED
app.use((req, res, next) => {
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
app.get("/users", async(req, res) => {
  const allDbUsers = await User.find({});
  const html = `<ul>${allDbUsers
    .map((user) => `<li>${user.fisrtName} - ${user.email}</li>`)
    .join(" ")}</ul>`;
  res.send(html);
});

//REST API
app.get("/api/users", async(req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});
app.route("/api/users/:id")
.get(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User Not Found" });
  return res.json(user);
});
// app.patch("/api/users/:id", async(req, res) => {
//   try{
//     const mongoId = Number(req.params.id);
//   const data = req.data;
//   const mongoUpdated = await User.findByIdAndUpdate(mongoId, {$set: req.data},
//     {new: true}
//   );
//   if(!mongoUpdated){
//     return res.status(404).json({status: "User Not Found in MongoDB"});
//   }

//   const userIndex = users.findIndex((user) => user.id === mongoId);

//   if (userIndex === -1) {
//     return res.status(404).json({ status: "User Not Found" });
//   }

//   users[userIndex] = { ...users[userIndex], ...data };


//   return res.json({
//     status: "updated successfully",
//     updateUser: users[userIndex] || null,
//     mongoUser: mongoUpdated,
//   });
//   }catch(error){
//      return res.status(500).json({
//       status: "error",
//       message: error.message
//     });
//   }
// });
app.patch("/api/users/:id", async (req, res) => {
  try {
    const mongoId = req.params.id;   // <-- FIXED (NO Number())
    const data = req.body;           // <-- FIXED (no req.data)

    // 1. Update MongoDB
    const mongoUpdated = await User.findByIdAndUpdate(
      mongoId,
      { $set: data },
      { new: true }
    );

    if (!mongoUpdated) {
      return res.status(404).json({ status: "User Not Found in MongoDB" });
    }

    // 2. Update Local JSON Array (only if JSON also contains _id)
    const userIndex = users.findIndex((user) => user._id === mongoId); // <-- FIXED

    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...data };
    }

    return res.json({
      status: "updated successfully",
      mongoUser: mongoUpdated,
      jsonUser: users[userIndex] || null,   // for safety
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

app.delete("/api/users/:id", async(req, res) => {
  try{
  const mongoId = (req.params.id);
  const mongoDeleted = await User.findOneAndDelete(mongoId);

  if (!mongoDeleted) {
    return res.status(404).json({
       status: "User Not Found in MongoDB"
       });
  }
  const userIndex = users.findIndex((user) => user._id === mongoId);

    let deletedJsonUser = null;

    if (userIndex !== -1) {
      deletedJsonUser = users[userIndex];
      users.splice(userIndex, 1); // remove the user
    }

    return res.json({
      status: "deleted successfully",
      mongoUser: mongoDeleted,
      jsonUser: deletedJsonUser
    });
 
}catch(error){
      return res.status(500).json({
      status: "error",
      message: error.message
    });
}
});
app.post("/api/users", async(req, res) => {
  const data = req.body;
  if (
    !data ||
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.gender ||
    !data.job_title
  ) {

    return res.status(400).json("msg: Bad Request \n all credentials are required");
  }
  const newUser = { id: users.length + 1, ...data };
  //after using mongodb
  const result = await User.create({
    fisrtName: data.first_name,
    lastName: data.last_name,
    email: data.email,
    gender: data.gender,
    jobTitle: data.job_title,
  });

  console.log("result", result); 
 return res.status(201).json({msg: "success"});
  
});

app.listen(PORT, () => console.log(`server started at ${PORT}`));
