var net = require("net")
var port = 3000
var predictions = ["yes", "i fucking said yes already..", "no", "ehhh...no", "please ask a yes or no question", "i'm dumb...ask another 8ball..."]
function rand(){
  var num = Math.floor(Math.random()*predictions.length)
  return predictions[num]
}
var server = net.createServer(function(c){
  c.setEncoding('utf8')
  console.log("client connected")
  c.on('data',function(data){
    if(/\?$/g.test(data.trim())){
      c.write(rand())
    } else {
      c.write("NOTHER question")
    }
  })
})

server.listen(port,function(){
  console.log("Listening to port " + port)
})
