const http = require("http");

const fs = require("fs");

const server = http.createServer((req,res)=>{
    //console.log("Hello");

    res.setHeader("Content-Type", "text/html");
    let path = "./views/";

    switch(req.url){
        case "/":
            res.statusCode = 200;
            path += "index.html";
            break;
        case "/ActivitySelection":
            res.statusCode = 200;
            path += "ActivitySelection.html";
            break;
        case "/MapView":
            res.statusCode = 200;
            path += "MapView.html";
            break;
        case "/ParkDetails":
            res.statusCode = 200;
            path += "ParkDetails.html";
            break;
        case "/ParkRecommendations":
            res.statusCode = 200;
            path += "ParkRecommendations.html";
            break;
        case "/Safety&Information":
            res.statusCode = 200;
            path += "Safety&Information.html";
            break;
        case "/signup":
            res.statusCode = 200;
            path += "signup.html";
            break;
        case "/userProfile":
            res.statusCode = 200;
            path += "userProfile.html";
            break;
        case "/locationInput":
            res.statusCode = 200;
            path += "locationInput.html";
            break;
        case "/about-us":
            res.statusCode = 301;
            res.setHeader("Location", "/locationInput");
            res.end();
            break;
        default:
            res.statusCode = 404;
            path += "404.html";
            break;
    }
    
    fs.readFile(path, (err,data) => {
       if(err){
            console.log(err);
            res.end();
       }else{
            res.write(data);
            res.end();
        }
    })
   // console.log(req.url, req.method);

   //res.setHeader("Content-Type", "text/plain");
   //res.write("Hello, Vanier Students!");
   //res.write("At Park Ex!");
   //res.end();
   //res.end("Hello, Vanier Students!");

});

server.listen(80);