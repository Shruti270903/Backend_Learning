const fs = require("fs");
const os = require("os");

console.log(os.cpus().length, "sdgd");
console.log("1");

//Blocking
const result = fs.readFileSync("./contact.txt", "utf-8");
console.log(result);

console.log("2");


//Non-blocking 
console.log("11");
fs.readFile("contact.txt", "utf-8", (err, result)=>{
    if(err){
        console.log("error", err);
}else{
console.log(result);
}
})

console.log("22")
console.log("33")
console.log("44")
console.log(" 55")