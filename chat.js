const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('syle', express.static(__dirname + '/style'))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', (socket) => {
    const count = io.engine.clientsCount;
    console.log("Quantidade de conexões: " + count)
    socket.on('msg', (msg) => io.emit('msg', { 'user': socket.user, 'msg': msg }))

    socket.on('join', (user) => {
        if(user != null){
            socket.user = user

            function imprimir(user) {
                user.forEach((user => {
                    console.log(user);
                    io.emit('users', socket.user ) //emitindo users
                }))
            }

            users = [socket.user]
        
            imprimir(users)
        }
        socket.broadcast.emit('msg', { user: 'servidor', 'msg': socket.user + ' entrou !' } )
    })

    socket.on('jointo', (destinatario, users) => {
        users.forEach(user => {
            if(user == socket.user){
                io.to(socket.id).emit('newUser');
            }
        })
    })

})

http.listen(3000, () => console.log('Ouvindo na porta 3000'))