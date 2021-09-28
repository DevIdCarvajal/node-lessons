const moment = require('moment'); // require

let laHora = moment().format('LTS');  // 11:41:21 AM

// ES6 Template strings
console.log(`Hola mundo, son las ${laHora}`);

// ES5-
//console.log("Hola mundo, son las " + laHora);