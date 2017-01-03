require("./framework.js");

var connect_callback = function(client){
    client.subscribe(token_prefix + topic + '/p', function(error){
        console.log("--- sub to normal channel presence ---");
    });
}

var end_callback = function(client) {
    client.unsubscribe([token_prefix + topic + '/p'], 
            function(error){
                console.log("--- publish to unset presence is ok---");
                client.end();
                console.log('\x1B[36mpresence done\x1B[0m');

            });

}

framework(connect_callback, end_callback, 1);
