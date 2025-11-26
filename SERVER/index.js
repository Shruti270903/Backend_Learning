
const fs = require('fs');
const http= require('http');
const url = require("url");

const myServer = http.createServer((req, res) => {
if(req.url === "/favicon.ico") return res.end();
    const log = `${Date.now()}:${req.url}New Request. received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);
    fs.appendFile('log.txt', log, (err, data)=>{
      
        switch(myUrl.pathname){
            case '/':
                res.end("Hello from the homepage/server again ");
                break;
            case '/about':
              const username= myUrl.query.myname;
                res.end(`hi, ${username}`);
                break;
                case '/contact':
                res.end("This is the contact page of the server ");
                break;
                case '/search':
                    const search= myUrl.query.search_query;
                    res.end("here are your result for" + search); 
            // default:
            //     res.end("404 page not found ");
            }
    })
//    console.log(req);
    console.log("New Req. received");
    // res.end("Hello from the other side/server again ");
    
});


myServer.listen(8000, ()=>{
    console.log("Server listening on port 8000 server started ");
});