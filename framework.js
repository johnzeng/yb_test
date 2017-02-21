var program = require('commander');
program
.option('-a, --appkey <appkey>', 'normal appkey', '58072d1fd69873332db470a6')
.option('-t, --topic <topic>', 'topic', 'normal')
.option('-n --alias <alias>', 'alias', 'test_alias')
.option('-f, --front <host>', 'mqtt front' , 'localhost')
.option('-k, --token <token>', 'token for yam' , '')
.parse(process.argv);

global.alais = 'test_alias';
if(program.alias != '') alias = program.alias;

global.topic = 'normal';
if(program.topic != '') topic = program.topic;

global.token_prefix = '';
if(program.token != '') token_prefix = ',yam' + program.token + '_';

var appkey = ''
if(program.appkey != '') appkey = program.appkey;

global.userinfo = {};

var url = ''
if(program.front) url = 'mqtt:' + program.front;

global.framework = function(connect_callback, end_callback, msg_count){
    var request = require('request');

    var post_data = {
        'a' : appkey,
        'p' : 2
    };

    var todo = function(){
        var mqtt = require('mqtt')

        console.log("now connect to " + url + ", with " + userinfo.cid + " " + userinfo.uid + " " + userinfo.password)
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
            var date = new Date();
            console.log(date + ":topic:" + topic + ", message:" + message);
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
