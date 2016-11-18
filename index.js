//import config
require("./config.js")

var mqtt = require('mqtt')

console.log(config)

var client  = mqtt.connect(config.url, {
        protocolId:'MQIsdp',
        protocolVersion:3,
        clientId: config.clientId,
        username: config.username,
        password: config.password
        })
 
console.log("now connect")

client.on('connect', function () {
  console.log("connect success")
  // test the basic sub and publish
  client.subscribe('normal_pub_sub', null , 
          function(error, granted) {
              if(null != error){
                  console.log("sub error")
              }else{
                  console.log("on suback is accept")
                  client.publish('normal_pub_sub', 'hello')
              }
          })

  // test the alias
  client.publish(',yali', 'test_alias_a', {qos : 1}, 
          function(error){
              if (null == error){
                  console.log("set alias go back");
                  client.publish(',yta/test_alias_a', 'hello')
              }
          })

})
 
client.on('message', function (topic, message) {
  console.log(topic , message.toString())
})

//client.end()
