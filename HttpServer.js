const http = require("http");
const server = http.createServer(function (req, res) {
  if (req.url === '/') {
    res.write("Hello World"); // prints hello world on page
    res.end();
  }
  // adding routes linearly
  if(req.url === '/api/courses'){  // if url is ...
      res.write(JSON.stringify([1, 2, 3])); // return list of courses from database
      res.end();
  }
}); // part of http module. uses CALLBACK function



// Sever is an event emanator: Has all the capabilities of event emanator:
/* server.on();
server.add();
server.emit(); 
etc. */



// Everytime there is a new connection or new request the "server" raises an event
// On the event of connection, execute function:
server.on("connection", function socket() {
  
  console.log("New connection");
});
// You can find the 'connection' event on documentation

server.listen(3000); // starts the HTTP server listening for connections on given port
console.log("Listening on port 3000...");
