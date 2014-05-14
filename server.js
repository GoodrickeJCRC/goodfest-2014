var connect = require('connect');
connect().use(connect.static(__dirname + '/dist')).listen(8080);
