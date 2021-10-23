// global objects: can access it in any file (can call directly)
console.log();
setTimeout();
clearTimeout();
setInterval();
// All functions are defined in the widnow object:
window.console.log();
window.setTimeout();

// In node JS, we have the "global" object rather than the "window" object:
global.console.log();
global.setTimeout();

/* Variables only have a scope of this file (not part of global)
var message = '';
console.log(global.message) WON'T WORK */

/* The 'global' scope is susceptible to method overwriting in other files when defined
We must avoid defining variables and functions in the global scope.
Instead, we need to use modules */

/* Modules: Small "building blocks" where we define variables and functions
Variables and functions with the same name won't overwrite others defined somewhere else 
(Encapsulation)
*/


