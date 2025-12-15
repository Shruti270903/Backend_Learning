// const url = "mongodb+srv://shruti:23bca85@cluster0.6oth21r.mongodb.net/shorturl";
// const url ="mongodb+srv://shruti:23bca85@cluster0.6oth21r.mongodb.net/shorturlwithAuth";
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
async function connectToMongoDB(url) {
  return mongoose.connect(url);
}
module.exports = { connectToMongoDB };
