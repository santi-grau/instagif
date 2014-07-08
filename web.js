// web.js

console.log("                                                                  ");
console.log("                                                                  ");
console.log(".--.   _..._                                       .--.           ");
console.log("|__| .'     '.                              .--./) |__|     _.._  ");
console.log(".--..   .-.   .              .|            /.''||  .--.   .' .._| ");
console.log("|  ||  '   '  |            .' |_     __   | |  | | |  |   | '     ");
console.log("|  ||  |   |  |       _  .'     | .:--.'.  |`-' /  |  | __| |__   ");
console.log("|  ||  |   |  |     .' |'--.  .-'/ |   | | /(^'`   |  ||__   __|  ");
console.log("|  ||  |   |  |    .   | / |  |  `^ __ | | | '---. |  |   | |     ");
console.log("|__||  |   |  |  .'.'| |// |  |   .'.''| |  /'^^'.||__|   | |     ");
console.log("    |  |   |  |.'.'.-'  /  |  '.'/ /   | |_||     ||      | |     ");
console.log("    |  |   |  |.'   |_.'   |   / | |._,| '/|'. __//       | |     ");
console.log("    '--'   '--'            `'-'   `--'  `^  `'---'        |_|     ");
console.log("                                                                  ");
console.log("                                                                  ");

var express = require("express");
var app = express();

app.get('/', function(req, res) {
  res.send('Hello World!');
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});