const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use('/', express.static('client'));
app.get('*', (req, res)=>{
    res.sendFile(__dirname + '/client/index.html');

});

io.on('connection', function(socket){
    socket.emit('show_login','');
    socket.on('login', (reqData)=>{
        socket.emit('show_main','was geht ab');
    });
});

http.listen(80, ()=>{
  console.log('listening on *:80');
});
