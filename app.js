//Defining variables
var data;
var pwm;
var dir;
var sendData; 

//Setting up express
var express = require('express')
var app = express()

//Serving a static folder
app.use(express.static('public'));

//Starting server on port 3000
var server = app.listen(3000, (req, res) => {
    console.log("Server has started on port 3000");
});

//Setting up Serial Port
const SerialPort = require('serialport')
const port = new SerialPort('/dev/cu.usbserial-1420', {
    baudRate: 9600
  })

//Setting up Socket io
var socket = require("socket.io");
var io = socket(server);

//setup socket connection
io.sockets.on('connection', (socket) => {
    console.log("User has connected");

    socket.on('status', (status) => {
        data = status.dir + ',' + status.pwm;
        console.log(data);
        port.write(data, (err) => {
            if(err) { throw err; }
        });
    });
});


