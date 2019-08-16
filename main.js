const http = require('http');
const fs = require('fs');

const server = http.createServer();
const io = require('socket.io').listen(server);

const datas = {
	victor: {
		gender: 'male',
		age: 42,
		specificity: 'RCV'
	},
	mailys: {
		gender: 'female',
		age: 24,
		specificity: 'neurology'
	},
	fabrice: {
		gender: 'undefined',
		age: 84,
		specificity: 'none'
	}
}

server.on('request', function(req, res) {

	if (req.url === '/jq.js') {
        res.writeHead(200, {"Content-Type": "application/javascript"});
    	fs.readFile('jq.js', 'utf-8', function(error, content) {
			res.end(content);	
		});
	} else if (req.url === '/') {
    	fs.readFile('./index.htm', 'utf-8', function(error, content) {
       		res.writeHead(200, {"Content-Type": "text/html"});
       		res.end(content);
		});
	} else {
		res.writeHead(301, {Location : '/'});
		res.end();
	}
});

io.sockets.on('connection', function (socket) {
	socket.on('sendMessage', function (datas) {
		io.emit('newMessage', datas);
		console.log(datas);
	});
});

server.listen(8080);
