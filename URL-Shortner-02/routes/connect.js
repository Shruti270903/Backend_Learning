const url = "mongodb+srv://shruti:23bca85@cluster0.6oth21r.mongodb.net/shorturl";
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

async function connectToMongoDB() {
return mongoose.connect(url);
}

module.exports = { connectToMongoDB };