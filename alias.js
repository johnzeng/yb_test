require("./framework.js");

var connect_callback = function(client){

    client.publish( token_prefix + ',yali', alias , {qos : 1}, 
            function(error){
                if(null == error){
                    var date = new Date();
                    console.log(date + ":--- alias is set---");
                }
            })
}

var end_callback = function(client) {
    //unset alias
    client.publish(
            token_prefix + ',yali', '', {qos : 1}, 
            function(error){
                console.log("--- publish to unset is ok---");
            });
}

framework(connect_callback, end_callback, 1);
