
let socket=io()

$('#loginbox').show()
$('#chatbox').hide()


$('#btnlogin').click(()=>{
      socket.emit('login',{
         user:$('#username').val(),
         password:$('#password').val()
      })
})


socket.on('logged_in',()=>{
      $('#loginbox').hide()
      $('#chatbox').show()
})

$('#btnSend').click(()=>{
      socket.emit('msg_sent',{
          to:$('#to').val(),
          msg:$('#inpMsg').val()
      })
      $('#to').val()=''
      $('#inpMsg').val()=''
})

socket.on('loggedin_failed',()=>{
     window.alert('Username or password wrong')
})


socket.on('msg_rcv',(data)=>{
      $('#ulMsgList').append($('<li>').text(data.msg))
})