function show(message) { // don't need function keyword when inside a class
    // Send an HTTP request
    console.log(message);
}
module.exports.show = show;