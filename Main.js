// LOADING A MODULE:
const showModule = require("./func.js"); // use const to prevent overwriting
console.log(showModule);
// shows what is being loaded

showModule.show("message"); // log function prints out message

console.log();
// Each Node JS file has a "main" module:
console.log(module); // module is NOT a global object

/* In node, every file is a module, and every variable and file
defined in that file are SCOPED to that module */

// ALL OBJECTS BELOW CAN BE FOUND ON NODE JS website
const path = require("path"); // "path" is an object with a bunch of useful methods
var pathObj = path.parse(__filename); // Parse: returns an object whose properties represent significant elementso of the path.
// one of the arguments in the module wrapper function

console.log(pathObj);
// Contains a few useful properties (root, dir, base, extention, file name)

const os = require("os");
var totalMemory = os.totalmem(); // gets amount of total system memory in bytes
var freeMemory = os.freemem(); // gets free memory of system in bytes
console.log("Total Memory: " + totalMemory);
console.log(`Free Memory: ${freeMemory} `);

const fileSystem = require("fs"); // contains async and sync methods (AVOID SYNC)

// SYNCHRONOUS FORM
console.log(fileSystem.readdirSync("./")); // './' represents current folder
// Returns all files and folders in current folder (String Array)

// ASYNCHRONOUS FORM
fileSystem.readdir("./", function (err, files) {
  // 2nd parameter a "callback" function
  if (err) console.log("Error", err);
  // Print out the error if an error has occured
  else console.log("Result", files); // Print out the file array
});
// Only one of the parameters "err" or "files" will have a value

//EVENT example:
const Logger = require("./logger.js"); // gets class
const logX = new Logger(); // create object of class
logX.log("message"); // class method

// Whhen the logger raises an event, execute this code
logX.on("messageLogged", function (arg) { // e, eventArg
  console.log("Listener called", arg); // pass data about event that happened
});
