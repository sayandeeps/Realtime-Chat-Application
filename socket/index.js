const io = require('socket.io')(8900,{
    cors: {
        origin: 'http://localhost:3000',
    },  
});
let users=[] ;

const addUser = (userId, socketId) => {
    !users.some(user => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
}

const getUsers = (userId) => {
    return users.find(user => user.userId === userId);
}


//on connection

io.on('connection', (socket) => {
    console.log("a user connected.");
    socket.on('addUser', userId => {
        addUser(userId, socket.id);
        io.emit('getUsers', users);
    });

    //send message 
    socket.on('sendMessage', ({senderId, receiverId, text}) => {
        const user = getUsers(receiverId);
        if (user && user.socketId) {
            io.to(user.socketId).emit('getMessage', {
                senderId,
                text,
            });
        } else {
            console.error('User or user.socketId not found', user);
        }
    });


    //on disconnect
    socket.on("disconnect", () => {
        console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
});