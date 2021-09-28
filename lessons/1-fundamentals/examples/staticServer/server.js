// ----- Import libraries -----

const moment = require('moment');
const http = require('http');

// ----- Define constants -----

const host = "localhost";
const port = 8080;

/*
function sayHello() {
    console.log("ola k ase")
}

// Arrow function
const sayHello2 = () => {
    console.log("ola k ase 2")
}

sayHello();
sayHello2();
*/

// ----- Create server -----

const server = http.createServer( (request, response) => {
    
    //console.log(request.url);
    
    if (request.url === "/") {

        // Http Headers
        response.writeHead(200, {
          'Content-Type' : 'text/html'
        });

        // Http Body
        response.write('<h1>Welcome to my home</h1>');

        // Send http message
        response.end();
    }
});

// ----- Start server -----

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});