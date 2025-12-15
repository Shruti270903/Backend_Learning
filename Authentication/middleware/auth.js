const { getUser } = require("../service/auth");

function restrictToLoggedInUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) {
    return res.redirect("/login");
  }

  const user = getUser(userUid);

  if (!user) {
    return res.redirect("/login");
  }

  req.user = user; 
  next();
}

function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  if (!userUid) {
    req.user = null;
    return next();
  }

  const user = getUser(userUid);
  req.user = user || null; 

  next();
}

module.exports = {
  restrictToLoggedInUserOnly,
  checkAuth,
};
