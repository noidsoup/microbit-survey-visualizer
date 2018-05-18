const app = require('http').createServer(handler)
const io = require('socket.io')(app);
const fs = require('fs');

app.listen(80);

const SerialPort = require('serialport');
const port = new SerialPort('COM4', {
  baudRate: 115200
});

port.write('main screen turn on', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('message written');
});

// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  port.on('data', (data) => {
    socket.emit('vote', { vote: `${data}` });
  });
});
