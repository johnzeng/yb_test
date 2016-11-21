//import config
require("./config.js")

var mqtt = require('mqtt')

var client  = mqtt.connect(config.url, {
        protocolId:'MQIsdp',
        protocolVersion:3,
        clientId: config.clientId,
        username: config.username,
        password: config.password
        })
 

client.on('connect', function () {
  // test the basic sub and publish
  client.subscribe('normal_pub_sub', null , 
          function(error, granted) {
              if(null != error){
              }else{
                  client.publish('normal_pub_sub', 'hello')
              }
          })

  // test the alias
  client.publish(',yali', 'test_alias_b', {qos : 1}, 
          function(error){
              if (null == error){
                  client.publish(',yta/test_alias_b', 'hello');
              }
          })

})

var counter = 0
client.on('message', function (topic, message) {
  console.log(topic , message.toString());
  counter ++;
  if (counter === 2){
      client.publish(',yaliget',"", {qos:1});

  }
  if (counter === 3){
    client.end();
  }
})

