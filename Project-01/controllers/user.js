const User = require("../models/user");

async function handleGetAllUsers(req, res) {
 const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User Not Found" });
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
     try {
    const mongoId = req.params.id;   // <-- FIXED (NO Number())
    const data = req.body;           // <-- FIXED (no req.data)
    const mongoUpdated = await User.findByIdAndUpdate(
      mongoId,
      { $set: data },
      { new: true }
    );
    if (!mongoUpdated) {
      return res.status(404).json({ status: "User Not Found in MongoDB" });
    }
    const userIndex = users.findIndex((user) => user._id === mongoId); // <-- FIXED
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...data };
    }
    return res.json({
      status: "updated successfully",
      mongoUser: mongoUpdated,
    //   jsonUser: users[userIndex] || null,   // for safety
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
}

async function handleDeleteUserById(req, res) {
     try{
  const mongoId = (req.params.id);
  const mongoDeleted = await User.findByIdAndDelete(mongoId);
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
}

async function handleCreateNewUser(req, res) {
    const data = req.body;
  if (
    !data ||
    !data.firstName ||
    !data.lastName ||
    !data.email ||
    !data.gender ||
    !data.jobTitle
  ) {
    return res.status(400).json("msg: Bad Request \n all credentials are required");
  }
//   const newUser = { id: users.length + 1, ...data };
  //after using mongodb
  const result = await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    gender: data.gender,
    jobTitle: data.jobTitle,
  });
  console.log("result", result); 
 return res.status(201).json({msg: "success", id: result._id});
  
}
module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser
};