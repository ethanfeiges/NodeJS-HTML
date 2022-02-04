/*This code will demonstrate a variety of nodeJS modules and their applications through a series of examples. It will also have provide explanations on certain lines of code and the overall purpose of modules
 */

// Console Module: The built-in console module exports a console object that allows the terminal to send and recieve text feedback

// Logs to console
console.log("Hello");

const dogs = ["Cat", "Dog", "Lizard"];
// prints out table in key-value pairs according to index
console.table(dogs);

// Writes a message if assertion fails
console.assert(dogs.length < 2, "Whoops %s work", "didn't");
// Does nothing: assertion is true
console.assert((dogs.length = 2));

// Process module: Global object with methods that provides useful methods and information about the current process

// process.env: stores and controls information about the environment in which the process is currently running. Process.env is a series of key/value pairs.
console.log(process.env.CLASSPATH); // logs path of environment

/* process.argv holds an array of command line values provided when the current process is initiated 
(First array value: the path to the file)
If you enter node modules.js hello, process.argv[2] will log "hello"
*/
console.log(process.argv[2]);

console.log(process.memoryUsage()); // gives information about total memory an application is using

/*OS module: A non-global module that provides information about an operating system.
This cannot be used with merely Javascript, but NodeJS enables its features by execute outside of the browser
*/
const os = require("os");

const server = {
  type: os.type(), // returns computer's operating system
  architecture: os.arch(), // returns computer's CPU architecture
  uptime: os.uptime(), // return system uptime, in seconds
};
console.log(server);

// Util module: Contains tools that help debug.
const util = require("util");
/* types.is(type): Checks if a passed in argument is a certain type indicated by a boolean value
isNumberObject: Checks if the argument is a number OBJECT 
Important type.is(type) methods:

util.types.isPromise(value)
util.types.isProxy(value)
*/
console.log(util.types.isNumberObject(2)); // false
console.log(util.types.isNumberObject(new Number(2))); // true

// creating object that represents a school and given properties about it
const NHS = {
  teachers: 100,
  students: 2000,
  // "name" is deprecated: Use different object property name to avoid overwriting
  schoolName: "Newport High School",
};

/* OBSOLETE FUNCTION/CALLBACK MODEL:
Function will call the callback with different arguments depending on the 'school' argument passd */
function getSchoolInfo(school, callback) {
  return setTimeout(() => {
    if (
      school.hasOwnProperty("teachers") &&
      school.hasOwnProperty("students") &&
      school.hasOwnProperty("schoolName")
    ) {
      callback(null, school);
    } else {
      callback(new Error("Invalid school"));
    }
  });
}
// callback function called within the getScholInfo function
function callback(error, school) {
  if (error) {
    console.log(error);
    process.exit(1); // instructs Node JS to terminate code immediately
  }
  // only school argument is passed when it has all properties needed
  else {
    console.log(
      school.schoolName +
        " has " +
        school.teachers +
        " teachers and " +
        school.students +
        " students."
    );
  }
}
getSchoolInfo(NHS, callback); // will print message about NHS (Argument has necessary properties)
getSchoolInfo("Newport high school", callback); // will print error message. (Argument does not have necessary properties)

/* 
CLEANING UP OBSOLETE CODE:

Using the util module for callbacks:
util.promisfy(value): Converting a method that calls a callback function into a promise-based function
*/

// Promisifies getSchoolInfo above
const getSchoolInfoPromise = util.promisify(getSchoolInfo);
// using util.promisfy, we can use .then() and .catch() methods alongside async/await
getSchoolInfoPromise(NHS)
  .then(() => {
    console.log(
      school.schoolName +
        " has " +
        school.teachers +
        " teachers and " +
        school.students +
        " students."
    );
  })
  .catch((error) => {
    console.log(error);
  });
