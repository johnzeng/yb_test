var program = require('commander');
program
.option('-a, --appkey <appkey>', 'appkey', '58072d1fd69873332db470a6')
.option('-t, --topic <topic>', 'topic', 'normal')
.option('-a --alias <alias>', 'alias', 'test_alias')
.option('-f, --front <host>', 'mqtt front' )
.option('-k, --token <token>', 'token for yam' )
.parse(process.argv);

global.alais = 'test_alias';
if(program.alias) alias = program.alias;

global.topic = 'normal';
if(program.topic) topic = program.topic;

global.token_prefix = '';
if(program.token != '') token_prefix = ',yam' + program.token + '_';

global.userinfo = {};

global.framework = function(connect_callback, end_callback, msg_count){
    var request = require('request');


    var post_data = {
        'a' : program.appkey,
        'p' : 2
    };

    var todo = function(){
        var mqtt = require('mqtt')

            var url = 'mqtt:localhost'
            if(program.front) url = 'mqtt:' + program.front;

        console.log("now connect to " + url + ", with" + userinfo.cid + " " + userinfo.uid + " " + userinfo.password)
            var client  = mqtt.connect(url, {
                protocolId:'MQIsdp',
                protocolVersion:3,
                clientId: userinfo.cid,
                username: userinfo.uid,
                password: userinfo.password
            })

        var counter = msg_count;


        client.on('connect', function () {
            console.log("--- connect ---");
            connect_callback(client);
        });

        client.on('message', function (topic, message) {
            console.log("!!! on message !!!!");
            console.log("topic:" + topic + ", message:" + message);
            counter--;
            console.log("counter : " + counter);
            if(counter==0){
                console.log("counter done, now end");
                end_callback(client);
            }
        })
    }


    request({
        url: "http://reg.yunba.io:8383/device/reg/",
        method: "POST",
        json: true,   // <--Very important!!!
        body: post_data 
    }, function (error, response, body){
        userinfo.cid = body.c;
        userinfo.uid = body.u;
        userinfo.password = body.p;
        todo();
    });

};
