require("./framework.js");

var connect_callback = function(client){
    // test the normal presence
    // set and send message to self alias
    var date2 = new Date();
    client.subscribe(token_prefix + topic, function(error){
        if(!error){
            console.log(date2 + ":--- now send to normal channel ---");
            client.publish(token_prefix + topic, "hi", {qos:1});
        }else{
            client.end();
        }
    });
}

var end_callback = function(client) {
    client.unsubscribe([token_prefix + topic], 
        function(error){
            console.log("--- publish to unset is ok---");
            client.end();
            console.log('\x1B[36mpubsub done\x1B[0m');
            process.exit();
        });
}

framework(connect_callback, end_callback, -1);
