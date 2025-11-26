
const fs = require('fs');
const http= require('http');
const path = require('path');

const server = http.createServer((req, res) => {
    const log = `${Date.now()}:${req.url}New Request. received\n;`
 
    fs.appendFile('log.txt', log, (err, data)=>{
        // res.end("Hello from the other side/server again ")
        switch(req.url){
            case '/':
                res.end("Hello from the homepage/server again ");
                break;
            case '/about':
                res.end("This is the about page of the server ");
                break;
                case '/contact':
                res.end("This is the contact page of the server ");
                break;
            default:
                res.end("404 page not found ");}
    })
//    console.log(req);
    console.log("New Req. received");
    // res.end("Hello from the other side/server again ");
    
});


server.listen(8000, ()=>{
    console.log("Server listening on port 8000 server started ");
});