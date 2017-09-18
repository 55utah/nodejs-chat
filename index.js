
// var app=require('http').createServer(handler)
var express=require('express');
var app=express();
var server=require('http').createServer(app);
server.listen(3000,'222.205.97.160');
var io=require('socket.io');
var socket=io.listen(server);
var fs=require('fs');
const path = require('path');

app.get("/", function (req,res) {
     res.sendFile(__dirname+"/index.html");
  });


// function handler(req,res){
//
//    fs.readFile('./index.html',function(err,data){
//     res.writeHead(200,{'Content-Type':'text/html'});
//     res.end(data,'utf-8');
//    });
// }

app.use('/static', express.static(path.join(__dirname, 'public')));

socket.on('connection',function(socket){
	//socket.join('room1',function(){console.log("join room");})
	socket.emit('news',{hello:'您已连接'});


   socket.on('chat',function(data){
 
   	var data=data;
	socket.broadcast.emit('notice',{msg:data});
	socket.emit('notice',{msg:data});
  });
   socket.on('setNick',function(data){
   	socket.emit('log up',{nick:data+"已连接"});
     socket.broadcast.emit('log up',{nick:data+"已连接"});
   });
});

