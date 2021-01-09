const { Socket } = require('dgram');
const express = require('express');
const app = express();
const path = require('path');

const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.join(__dirname + path.sep + 'public');
const VIEWS_PATH = path.join(__dirname + path.sep + 'views');


app.use(express.static(PUBLIC_PATH));
app.set('views', VIEWS_PATH);



http.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`);
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname  + '/views/index.html');
})

const io = require('socket.io')(http)
io.on('connection',(socket)=>{
     console.log('Connected...')
     socket.on('message',(msg)=>{
        //  console.log(msg)
        socket.broadcast.emit('message',msg)
     })
})