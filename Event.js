/* Event: A signal that something has happened in our application
Example: Everytime we recieve a request on an HTTP port, the HTTP class raises an event
Event: NEW REQUEST */

const EventEmitter = require("events"); // gets EvenEmitter CLASS (not an object)
// Class: Container for related methods and properties

// Create object:
const emitter = new EventEmitter();

// Listener: A function that will be called when the message log is raised
emitter.on("messageLogged", function (arg) { // e, eventArg
  console.log("Listener called", arg); // pass data about event that happened
});
emitter.emit("messageLogged", {id: 1, url: 'http//'}); // -signals that an event has happened
// Sends additional data, too

/* However, this code should be within a class that holds the you're calling. 
(Demonstrated with Logger in the logger file) */

