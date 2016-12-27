require("./framework.js");

var connect_callback = function(client){
    // test the normal presence
    // set and send message to self alias
    var date2 = new Date();
    client.subscribe(token_prefix + topic, function(error){
        console.log(date2 + ":--- send to normal channel ---");
        client.publish(token_prefix + topic, "hi", {qos:1});
    });
}

var end_callback = function(client) {
    client.unsubscribe([token_prefix + topic], 
            function(error){
                console.log("--- publish to unset is ok---");
                client.end();

            });
}

framework(connect_callback, end_callback, 1);
