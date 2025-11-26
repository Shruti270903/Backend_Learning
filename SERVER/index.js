const http= require("http");
const fs= require("fs");


const myServer = http.createServer((req, res)=>{
    // console.log("new req. found");
    // console.log(req.headers)
    // console.log(req)
    const log = `${Date.now()}:${req.url} New Req Received \n`;
    fs.appendFile("log.txt", log, (err, data)=>{
        // res.end("Hello from server again");
        switch(req.url){
            case '/':res.end("homie page");
            break;
            case '/about': res.end("my name is shruti");
            break;
            default:
                res.end("404");
        }
    })
    // res.end("hello from server");
});

myServer.listen(8000, ()=> console.log("Server Started at port 1000"));
