const { v4: uuidv4 } = require("uuid");

const User = require("../models/userSchema");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;

  await User.create({
    name,
    email,
    password,
  });
  console.log("SIGNUP BODY:", req.body);
  return res.render("/");
}
async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });
  console.log("LOGIN BODY:", req.body);

  if (!user) {
    return res.render("login", { error: "invalid username or password" });
  }

  const sessionId = uuidv4();
  setUser(sessionId, user);

  res.cookie("uid", sessionId, {
    httpOnly: true,
    sameSite: "lax",
  });

  return res.redirect("/");
}


async function handleHome(req, res) {
  // 1️ Not logged in → redirect to login
  if (!req.user) {
    return res.redirect("/login");
  }

  try {
    // 2️ Fetch URLs created by logged-in user
    const allUrls = await URL.find({
      createdBy: req.user._id,
    });

    // 3️ Render home page
    return res.render("home", {
      urls: allUrls,
      user: req.user,
    });
  } catch (error) {
    console.error("Home controller error:", error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  handleHome,
};
module.exports = {
    handleHome,
  handleUserSignup,
  handleUserLogin,
};

// async function handleUserLogin(req, res) {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email, password });
//   console.log("LOGIN BODY:", req.body);

//   if (!user) {
//     return res.render("login", { error: "invalid username or password" });
//   }

//   const sessionId = uuidv4();
//   setUser(sessionId, user);

//   res.cookie("uid", sessionId, {
//     httpOnly: true,
//     sameSite: "lax",
//   });

//   return res.redirect("/");
// }
