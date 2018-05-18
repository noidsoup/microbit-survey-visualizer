const express = require('express');
const http = require('http');
const app = express();
const router = express.Router();

const SerialPort = require('serialport');
const microbit = new SerialPort('COM4', {
  baudRate: 115200
});

microbit.write('main screen turn on', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('microbit connected');
});

// Open errors will be emitted as an error event
microbit.on('error', function(err) {
  console.log('Error: ', err.message);
})

//const app = require('http').createServer(handler)
const port = 3000;
app.set('port', port);
app.use(express.static(`${__dirname}/dist`)); // set the static files location for the static html
app.engine('.html', require('ejs').renderFile);
app.set('views', `${__dirname}/dist`);
router.get('/*', (req, res, next) => { res.sendFile(`${__dirname}/dist/index.html`); });
app.use('/', router);

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  microbit.on('data', (data) => {
    socket.emit('vote', { vote: `${data}` });
  });
});

function broadcastTime() {
  io.sockets.emit('getTime', 'wat');
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;

  setInterval(broadcastTime, 1000);
  console.log(`Listening on ${bind}`);
}
server.on('listening', onListening);

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.info(`App running in ${process.env.NODE_ENV || 'none'} mode on port ${port}`);
});

module.exports = server;

/* const SerialPort = require('serialport');
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
 */