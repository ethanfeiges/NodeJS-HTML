/* Node js doesn't execute code directly
It WRAPS the code around a function: */

// each argument of the function is local to each file
console.log(__filename);
console.log(__dirname);

var url = "http//mylogger.io/log";
/* Sending http request to this url
    HTTP request: to access a resource on the server */

const EventEmitter = require("events"); // class
// don't need to create object
class Logger extends EventEmitter { // logger class will have all func of EventEmitter
  log(message) { // don't need function keyword when inside a class
    // Send an HTTP request
    console.log(message);
  
    // Raise event IN function:
    this.emit("messageLogged", { id: 1, url: "http://" });
  }
}


/* log and url are scoped to only this module (private)
In our Main module, we want to be able to access the log function, however */

module.exports = Logger;
// Exporting class
