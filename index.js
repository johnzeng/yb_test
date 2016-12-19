var program = require('commander');

program
  .option('-a, --appkey <appkey>', 'appkey')
  .option('-t, --topic <topic>', 'topic', 'normal')
  .option('-a --alias <alias>', 'alias', 'test_alias')
  .option('-u --uid <uid>', 'uid')
  .option('-p --password <password>', 'password')
  .option('-c --cid <client id>', 'client id')
  .option('-f, --front <host>', 'mqtt front' )
  .option('-k, --token <token>', 'token for yam' )
  .parse(process.argv);

var mqtt = require('mqtt')

var url = 'mqtt:localhost'
if(program.front) url = 'mqtt:' + program.front;

console.log("now connect to " + url + ", with" + program.cid + " " + program.uid + " " + program.password)
var client  = mqtt.connect(url, {
        protocolId:'MQIsdp',
        protocolVersion:3,
        clientId: program.cid,
        username: program.uid,
        password: program.password
        })

var counter = 3;

var alais = 'test_alias';
if(program.alias) alias = program.alias;

var topic = 'normal';
if(program.topic) topic = program.topic;

var token_prefix = '';
if(program.token) token_prefix = ',yam' + token_prefix + '_';

client.on('connect', function () {
  console.log("--- connect ---");
  // test the normal pubsub 
  client.subscribe([token_prefix + topic, token_prefix + topic + '/p'], 
      function(error){
          if(null == error){
              console.log("--- send to normal channel ---");
              client.publish(token_prefix + topic, "hi", {qos:1});
          }
      })

  // test the alias
  client.publish( token_prefix + ',yali', alias , {qos : 1}, 
      function(error){
          if (null == error){
              console.log("--- publish to alias ---");
              client.publish(token_prefix + ',yta/' + alias, 'hello');
          }
      })

})


client.on('message', function (topic, message) {
  console.log("!!! on message !!!!");
  console.log("topic:" + topic + ", message:" + message);
  counter--;
  if(counter==0){
      //unset alias
      client.publish( token_prefix + ',yali', '', {qos : 1}, 
          function(error){
              if (null == error){
                  client.unsubscribe([token_prefix + topic, token_prefix + topic + '/p'], 
                      function(error){
                          console.log("--- publish to unset is ok---");
                          client.end();

                      });
              }
          })
  }
})
