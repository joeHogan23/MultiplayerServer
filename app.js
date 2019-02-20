const io = require('socket.io')(process.env.PORT||5000);

var playerCount = 0;

console.log("Server is Running");

//Connection to Unity
io.on('connection', function(socket){
    console.log('Connected to Unity');

    socket.broadcast.emit('spawn');
    playerCount++;
    for(var i = 0; i < playerCount; i++){
        socket.emit('spawn');
        console.log('Sending spawn to New Player');
    }

    socket.on("say hello", function(data){
        console.log('Your Unity Game Says Hello');
        socket.emit('talkback');
        
    });

    socket.on('disconnect', function(){
        console.log("Player Disconnected");
        playerCount--;
    });
});