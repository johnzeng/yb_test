require("./framework.js");

var connect_callback = function(client){
//    client.publish( token_prefix + ',yali', 'normal', {qos : 1}, 
//            function(error){
//                console.log("--- alias is set---");
                client.subscribe(token_prefix + topic + '/p', function(error){
                    console.log("--- sub to normal channel presence ---");
                });

//            });
}

var end_callback = function(client) {
    client.unsubscribe([token_prefix + topic + '/p'], 
            function(error){
                console.log("--- publish to unset presence is ok---");
                client.end();

            });

}

framework(connect_callback, end_callback, 1);
