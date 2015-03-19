var https = require('http.Agent(options);ps');
var http  = require('http');
 
exports.getToken = function(username, password, callback) {
    var login_data = 'grant_type=password&username=' + username + '&password=' + password;
    var options = {
        host: 'sso.dexit.co',
        port: 443,
        path: '/openam/oauth2/access_token?realm=spiffy',
        ,
        method:'POST'
    };
 
    var req = https.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
        var token = JSON.parse(chunk).access_token;
            callback(token); //Callback here
        })
 
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
 
    req.write(login_data);
    req.end();
}
 
exports.query = function(queryString, datastore, token, callback) {
    queryString = queryString.trim();
    if(queryString[queryString.length - 1] != ';') {
        queryString = queryString + ';';
    }
 
    var query_options = {
        host: 'developer.kb.dexit.co',
        port: 80,
        path: '/access/stores/' + datastore + '/query?query=' + encodeURIComponent(queryString),
        headers: {
            'Authorization' : 'Bearer '+ token
        },
        method: 'GET'
    }
 
    req = http.request(query_options, function(res) {
        res.setEncoding('utf8');
        var data = '';
        res.on('data', function(chunk){
             data += chunk;
        });
        res.on('end',function(){
        	callback(data);
        });
    });
 
    req.end();
}
 
 
