// ----- Import libraries -----

const moment = require('moment');

const http = require('http');
const fs = require('fs');
const process = require('process');

// ----- Define constants -----

const host = "localhost";
const port = 8080;

const welcomeMessage = `
    <h1>&iexcl;Ya s&eacute; Node!</h1>
    <h2>Gracias al ${process.argv[2]}</h2>
`;

// ----- Define functions -----

    /*
        -- Anotar en el fichero de log la petición realizada --

        1) Reconocer qué petición me han hecho
        2) Saber qué momento es
        3) Escribir en el fichero la petición y el momento
            (Si el fichero no existe... --> Crearlo)
    */

function addToLog(endpoint, statusCode) {

    // 2) Saber qué momento es
    const now = moment().format("DD-MM-YYYY HH:mm:ss")

    // 3) Escribir en el fichero la petición y el momento
    try {
        const newline = `${now} - ${statusCode} ${endpoint}\n`;

        fs.appendFile('requests.log', newline, (error, file) => {
            console.log('Saved!');
        });
    }
    catch(error) {
        console.log(error);
    }
}

// ----- Create server -----

const server = http.createServer( (request, response) => {

    // 1) Reconocer qué petición me han hecho
    const endpoint = request.url;
    //console.log(endpoint);

    let statusCode = 200;
    
    // Endpoints
    if (endpoint === "/") {

        // Http Headers
        response.writeHead(statusCode, {
          'Content-Type' : 'text/html'
        });

        // Http Body
        response.write(welcomeMessage);

        // Send http message
        response.end();
    }
    else

    // Cuando le pidan algo a "/hw", devolver el texto HTML:
    if (endpoint === "/hw") {

        // Http Headers
        response.writeHead(statusCode, {
          'Content-Type' : 'text/html'
        });

        // Http Body
        response.write(`<p style="color: orange">Happy Halloween!</p>`);

        // Send http message
        response.end();
    }
    else

    // Cuando le pidan algo a "/myjson", devolver el objeto JSON:
    if (endpoint === "/myjson") {

        // Http Headers
        response.writeHead(statusCode, {
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

    if (endpoint === "/timenow") {

        // Http Headers
        response.writeHead(statusCode, {
          'Content-Type' : 'text/plain'
        });

        // Http Body
        const ahora = moment().format("LTS");

        response.write(ahora);

        // Send http message
        response.end();
    }
    else

    if (endpoint === "/web") {
        fs.readFile('front/index.html', (error, data) => {

            response.writeHead(statusCode, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();

        });
    }
    else

    if (endpoint === "/logo") {
        fs.readFile('front/img/http-protocol.jpg', (error, data) => {

            response.writeHead(statusCode, { 'Content-Type': 'image/jpeg' });
            response.write(data);
            response.end();

        });
    }
    else

    if (endpoint === "/styles") {
        fs.readFile('front/css/style.css', (error, data) => {

            response.writeHead(statusCode, { 'Content-Type': 'text/css' });
            response.write(data);
            response.end();

        });
    }

    else {
        statusCode = 404;

        // Http Headers
        response.writeHead(statusCode, {
            'Content-Type' : 'text/plain'
        });

        // Http Body
        response.write("Estos androides no son los que buscas");

        // Send http message
        response.end();
    }

    if( process.argv[3] === "yes" )
        addToLog(endpoint, statusCode);

    console.log( process.cwd() );
    console.log('Version: ' + process.version);
});

// ----- Start server -----

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});