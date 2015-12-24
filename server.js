// determine port based on argument
// e.g. node server.js staging
var PORT = 8080;
if (process.argv.length > 2 && process.argv[2] === 'staging') PORT = 8000;

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(PORT);

console.log('Serving frontend on port ' + PORT + '...');
