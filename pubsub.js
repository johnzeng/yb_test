require("./framework.js");

var connect_callback = function(client){
    // test the normal presence
    client.publish( token_prefix + ',yali', alias , {qos : 1}, 
            function(error){
                console.log("--- alias is set---");
                if(null == error){
                    // set and send message to self alias
                    if (null == error){
                        console.log("--- publish to alias ---");
                        client.publish(token_prefix + ',yta/' + alias, 'hello', {qos : 1}, 
                            function(error){
                                client.subscribe(token_prefix + topic, function(error){
                                    console.log("--- send to normal channel ---");
                                    client.publish(token_prefix + topic, "hi", {qos:1});
                                });
                            });
                    }
                }
            })
}

var end_callback = function(client) {
    //unset alias
    client.publish(
            token_prefix + ',yali', '', {qos : 1}, 
            function(error){
                if (null == error){
                    client.unsubscribe([token_prefix + topic], 
                        function(error){
                            console.log("--- publish to unset is ok---");
                            client.end();

                        });
                }else{
                    console.log("get error :" + error);
                }
            });
}

framework(connect_callback, end_callback, 2);
