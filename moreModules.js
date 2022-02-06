/* This code applies the events and errors module, explains the timers module, and implements the stdin event listener in separate examples */

// Here we require in the 'events' module and save a reference to it in an events variable
let events = require("events");
let myEmitter = new events.EventEmitter();
let listenerCallback = (data) => {
  console.log("Celebrate " + data);
};
// if an event titled 'celebration' gets emitted
// myEmitter.on: Execute the indicated function when the indicated event is emitted.
myEmitter.on("celebration", listenerCallback);

// emitting an event and passing "Valentine's day" as an argument into the listenerCallback function
myEmitter.emit("celebration", "Valentine's day!");

/* Code prompts the user with an infinite amount of random math expressions amd evaluates their response - which is recorded through process.stdin.on();
 */
let mathFunction = () => {
  let x = Math.floor(Math.random() * 100);
  let y = Math.floor(Math.random() * 100);
  let operation = Math.floor(Math.random() * 4 + 1);
  result = 0;
  if (operation == 1) {
    process.stdout.write("What is " + x + " * " + y + "? ");
    result = x * y;
  } else if (operation == 2) {
    process.stdout.write("What is " + x + " / " + y + "? ");
    result = Math.floor(x / y);
  } else if (operation == 3) {
    process.stdout.write("What is " + x + " + " + y + "? ");
    result = Math.floor(x + y);
  } else {
    process.stdout.write("What is " + x + " - " + y + "? ");
    result = Math.floor(x - y);
  }
  /* Handling user input/output
    When the user enters text into the terminal, a 'data' event will be fired and this listener will be executed

    Wrapper function allows us to pass in multiple parameters
    '.once' deletes the listener after running -> Prevents N number of listeners being created.
  */
  process.stdin.once("data", (input) => processResponse(input, result));
};
let processResponse = (input, answer) => {
  input = input.toString().trim();
  if (input == "quit") {
    process.stdout.write("Good math practice");
    process.exit();
  }
  if (isNaN(input)) {
    process.stdout.write("Your input was not a number. Please try again \n");
  }

  if (input != answer) {
    process.stdout.write(
      "Wrong answer. You were off by: " + Math.abs(input - answer) + "\n"
    );
  } else {
    process.stdout.write("Correct! \n");
  }
  process.stdout.write("Correct answer: " + answer + "\n");
  // back to math function (loop)
  mathFunction();
};

// starts math questions
mathFunction();

/* ERRORS: error module is global scope
Error-first callback: Callback functions have an error as the first expected argument
*/

// YOU CANNOT USE TRY/CATCH for async operations because the error is THROWN asynchronously
let errorFirstCallback = (err, success) => {
  // err is not null
  if (err) {
    console.log(err);
  } else {
    console.log(success);
  }
};
// if the user simply enters "invalid"
let handleInput = (input, callback) => {
  if (input == "invalid") {
    errorFirstCallback(new Error("Bad input"), null);
  } else {
    errorFirstCallback(null, "good input");
  }
};
handleInput("invalid", errorFirstCallback); // "Error: Bad input"
handleInput("good", errorFirstCallback); // "good input"

/* BUFFER MODULE: Used to handle binary data (global scope)
Buffer object represnts a fixed amount of memory that cannot be resized */

// Allocate buffer of size 15 filled with 'b'
const bufferAlloc = Buffer.alloc(15, "b");
console.log(bufferAlloc); // array form where each element represents a byte of data. HEXADECIMAL CONVERSION VALUE OF 'b': 62
console.log(bufferAlloc.toString()); // "bbbbbbbbbbbbbbb"

const buffer1 = Buffer.from("hello"); // creates a new Buffer object.
const buffer2 = Buffer.from("world");
// uses DECIMAL conversion of each char value in string
const bufferArray = [buffer1, buffer2];
const bufferConcat = Buffer.concat(bufferArray); // joins buffer1 and buffer2 Buffer objects

// Translate buffer (array of bytes) to string value
const bufferString = bufferConcat.toString();
console.log(bufferString); // "helloworld"

/* TIMERS MODULE: When we want our code to be executed at a specific point in time
In contast to front-end JS, timer functions get added to the Node.js-specific event loop, where the timer functions are scheduled and put into a queue rather than being handled as a web api


setImmediate(callback) 
executes callbacck after the poll phase of the Node.js queue is complete
Poll phase: I/O related callbacks, new I/O events (talking to databases, HTTP requests, etc.)

setTimeout(callback, time) executes callback at a minimum time of what is passed as an argument
*/
