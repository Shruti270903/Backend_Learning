const fs = require("fs");

//synchronous writing of file
// fs.writeFileSync("hello.txt/", "hello onlyss...");

//asynchronous writing of file
// fs.writeFile("./hello.txt", "Hello from Nodejs in async", (err) => {
// })

//for rewding a file
// const  result = fs.readFileSync("./contact.txt", "utf-8");
// console.log(result)

// for reading asynchronously
// fs.readFile("./contact.txt", "utf-8", (err, result) => {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     else{
//         console.log(result);
//     }
// });
// fs.appendFileSync(
//   "./hello.txt/",
//   `${Date.now()} time at current situaton is this......`
// );
// fs.cpSync("./hello.txt", "./hello_copy.txt");
// fs.unlinkSync("./hello_copy.txt");

// console.log(fs.statSync("./hello.txt"));
// fs.mkdirSync("my-docs/a");

//blocking
// console.log("start");
// const result = fs.readFileSync("./contact.txt", "utf-8");
// console.log(result);
// console.log("end");
//non-blocking
// console.log("start");
// fs.readFile("./contact.txt", "utf-8", (err, result) => {
//     console.log(result);
// });
// console.log("end");

const os = require("os");
console.log(os.cpus().length);