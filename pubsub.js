require("./framework.js");

var connect_callback = function(client){
    // test the normal presence
    // set and send message to self alias
    if (null == error){
        var date1 = new Date();
        console.log(date1 + ":--- publish to alias ---");
        client.publish(token_prefix + ',yta/' + alias, 'hello', {qos : 1}, 
                function(error){
                    var date2 = new Date();
                    client.subscribe(token_prefix + topic, function(error){
                        console.log(date2 + ":--- send to normal channel ---");
                        client.publish(token_prefix + topic, "hi", {qos:1});
                    });
                });
    }
}

var end_callback = function(client) {
    client.unsubscribe([token_prefix + topic], 
            function(error){
                console.log("--- publish to unset is ok---");
                client.end();

            });
}

framework(connect_callback, end_callback, 1);
