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
  console.log("--- connect ---")
  // test the basic sub and publish
  client.subscribe(['normal_pub_sub', 'test_alias_b/p'], null , 
          function(error, granted) {
              if(null != error){
              }else{
                  console.log("--- sub ack ---")
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

  // test the basic sub and publish with token
  client.subscribe([ ',yam' + config.token + '_normal_pub_sub',',yam' + config.token +'_test_alias_b/p'], null , 
          function(error, granted) {
              if(null != error){
              }else{
                  console.log("--- sub with token ack ---")
                  client.publish(',yam' + config.token + '_normal_pub_sub', 'hello')
              }
          })

  // test the alias
  client.publish(',yam' + config.token + '_,yali', 'test_alias_b', {qos : 1}, 
      function(error){
          if (null == error){
              client.publish(',yam' + config.token + '_,yta/test_alias_b', 'hello');
          }
      })


})

var counter = 0
client.on('message', function (topic, message) {
  console.log("!!! on message !!!!");
  console.log(topic , message.toString());
  counter ++;
  if (counter === 2){
      client.publish(',yaliget',"", {qos:1});
  }
  if (counter === 3){
    client.end();
    process.exit();
  }
  console.log("counter:" + counter);
})
