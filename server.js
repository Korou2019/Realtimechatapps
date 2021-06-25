

const http=require('http')

const express=require('express')

const app=express()
const SERVER_PORT=process.env.PORT || 3355
const socketio=require('socket.io')

const server=http.createServer(app)

const io=socketio(server)

app.use('/',express.static(__dirname +'/public'))

let users={
    'korou':'p@2023'
}

io.on('connection',(socket)=>{
   console.log('connected with socket id=',socket.id)
   
   socket.on('login',(data)=>{
       if(users[data.user]){
           if(users[data.user]==data.password){
            socket.join(data.user)
            socket.emit('logged_in')
           }
           else{
            socket.emit('loggedin_failed')
           }
       }
       else{
           users[data.user]=data.password
           socket.join(data.user)
           socket.emit('logged_in')
       }
       console.log(users)
   })
   
   socket.on('msg_sent',(data)=>{
      if(data.to){
      io.to(data.to).emit('msg_rcv',data)
      }
      else{
          socket.broadcast.emit('msg_rcv',data)
      }
   })
})



server.listen(SERVER_PORT,()=>{
    console.log('server started on http://localhost:3355')
})