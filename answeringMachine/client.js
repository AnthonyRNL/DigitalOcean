var net = require("net")
var client = net.Socket()
client.setEncoding('utf8')
client.connect({port:3000, host: "localhost"}, function(){
  console.log("connected to server")
  process.stdin.on('data', function(input){
    client.write(input)
  })
})
