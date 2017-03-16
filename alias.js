require("./framework.js");

var connect_callback = function(client){

    client.publish( token_prefix + ',yali', alias , {qos : 1}, 
        function(error){
            if(null == error){
                var date = new Date();
                console.log(date + ":--- alias is set---");
                client.publish( token_prefix + ',yta/' + alias, 'hi' , {qos : 1}, 
                    function(error){
                        if(null == error){
                            var date1 = new Date();
                            console.log(date1 + ":--- sent to alias ---");
                        }
                    })

            }})
}

var end_callback = function(client) {
    //unset alias
//    client.publish(
//            token_prefix + ',yali', '', {qos : 1}, 
//            function(error){
                console.log("--- publish to unset is ok---");
                        client.end();
                        console.log('\x1B[36malias done\x1B[0m');
                        process.exit();
//            });
}

framework(connect_callback, end_callback, 1);
