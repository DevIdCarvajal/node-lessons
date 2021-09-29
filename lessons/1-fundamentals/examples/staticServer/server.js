// ----- Import libraries -----

const moment = require('moment');
const http = require('http');
const fs = require('fs');

// ----- Define constants -----

const host = "localhost";
const port = 8080;

// ----- Create server -----

const server = http.createServer( (request, response) => {
    
    //console.log(request.url);

    // Endpoints
    
    if (request.url === "/") {

        // Http Headers
        response.writeHead(200, {
          'Content-Type' : 'text/html'
        });

        // Http Body
        response.write('<h1>&iexcl;Ya s&eacute; Node!</h1>');

        // Send http message
        response.end();
    }
    else

    // Cuando le pidan algo a "/hw", devolver el texto HTML:
    if (request.url === "/hw") {

        // Http Headers
        response.writeHead(200, {
          'Content-Type' : 'text/html'
        });

        // Http Body
        response.write(`<p style="color: orange">Happy Halloween!</p>`);

        // Send http message
        response.end();
    }
    else

    // Cuando le pidan algo a "/myjson", devolver el objeto JSON:
    if (request.url === "/myjson") {

        // Http Headers
        response.writeHead(200, {
          'Content-Type' : 'application/json'
        });

        // Http Body
        const respuesta = {
            "nombre": "Espagueti",
            "apellido": "Volador",
            "habilidades": ["Node", "Mongo"],
            "vacaciones": {
                "lugar1": "Benidorm",
                "lugar2": "Groenlandia"
            }
        }

        response.write(JSON.stringify(respuesta));

        // Send http message
        response.end();
    }
    else

    if (request.url === "/timenow") {

        // Http Headers
        response.writeHead(200, {
          'Content-Type' : 'text/plain'
        });

        // Http Body
        const ahora = moment().format("LTS");

        response.write(ahora);

        // Send http message
        response.end();
    }
    else

    if (request.url === "/web") {
        fs.readFile('front/index.html', (error, data) => {

            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();

        });
    }
    else

    if (request.url === "/styles") {
        fs.readFile('front/css/style.css', (error, data) => {

            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(data);
            response.end();

        });
    }

    else {
        // Http Headers
        response.writeHead(404, {
            'Content-Type' : 'text/plain'
        });

        // Http Body
        response.write("Estos androides no son los que buscas");

        // Send http message
        response.end();
    }
});

// ----- Start server -----

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});