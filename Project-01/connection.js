const mongoose = require("mongoose");

async function connectMongoDb(url){
return mongoose.connect(url);
}

//connection
module.exports = {
    connectMongoDb,
}
