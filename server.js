const express = require('express');
const http = require('http');
const app = express();
const router = express.Router();

const port = 3000;

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

microbit.on('error', function(err) {
  console.log('Error: ', err.message);
})

app.set('port', port);
app.use(express.static(`${__dirname}/dist`));
app.engine('.html', require('ejs').renderFile);
app.set('views', `${__dirname}/dist`);
router.get('/*', (req, res, next) => { res.sendFile(`${__dirname}/dist/index.html`); });
app.use('/', router);

const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', function (socket) {
  microbit.on('data', (data) => {
    console.log(`vote cast: ${data}`);
    socket.emit('vote', { vote: `${data}` });
  });
});

function onListening() {
  const address = server.address();
  const bind = typeof address === 'string'
        ? `pipe ${address}`
        : `port ${address.port}`;
  console.log(`Listening on ${bind}`);
}
server.on('listening', onListening);

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.info(`App running on port ${port}`);
});

module.exports = server;