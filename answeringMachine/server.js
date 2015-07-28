var net = require("net")
var port = 3000
var fs = require("fs")
var counter = 0

fs.readFile('mailbox.json', function(err, content){
  var parsed = JSON.parse(content)
  if(parsed.length > 0){
    var last = parsed.length - 1
    counter = parseInt(Object.keys(parsed[last])[0])
  }
})

var server = net.createServer(function(c){
  c.setEncoding('utf8')
  console.log("client is connected")
  c.on("data", function(data){
    if(data.match(/^\w+\s/g)[0] === "add "){
      fs.readFile("mailbox.json", function(err, content){
        var existing = JSON.parse(content)
        var newObj = {}
        newObj[counter + 1] = data.match(/\s.+/g)[0].trim()
        existing.push(newObj)
        wContent = JSON.stringify(existing)
        console.log(wContent)
        fs.writeFile("mailbox.json", wContent)
        counter++
      })
    } else if(data.match(/^\w+\s/g)[0].trim() === "read"){
      fs.readFile("mailbox.json", function(err, content){

        if(JSON.parse(content).length === 0){
          console.log("No Messages")
        } else {
          var parsed = JSON.parse(content)
          parsed.forEach(function(x){
            console.log(x)
          })
        }
      })
    } else if(data.match(/^\w+\s\w+\s/g)[0].trim() === "delete all"){
      fs.readFile("mailbox.json", function(err, content){
        var blank = "[]"
        counter = 0
        fs.writeFile("mailbox.json", blank)
      })
    } else if(data.match(/^\w+\s/g)[0].trim() === "delete"){
      fs.readFile("mailbox.json", function(err, content){
        index = data.split(" ")[1]
        console.log(index)
        var parsed = JSON.parse(content)
        parsed.forEach(function(x){
          console.log(Object.keys(x)[0])
          console.log(parsed.indexOf(x))
          console.log(parseInt(Object.keys(x)[0]) === parseInt(index))
          if(parseInt(Object.keys(x)[0]) === parseInt(index)){
            parsed.splice(parsed.indexOf(x), 1)
          }
        })
        fs.writeFile("mailbox.json", JSON.stringify(parsed))
      })
    }

  })
})

server.listen(port, function(){
  console.log("i'm listening to " + port)
})
