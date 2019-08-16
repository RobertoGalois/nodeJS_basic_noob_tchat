const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer();
const io = socketIO.listen(server);

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

app.get('/', (req, res) => {
	res.status(200).setHeader('Content-Type', 'text/html');
	res.render('index.ejs');
})
.get('/jq.js', (req, res) => {
	res.status(200).setHeader('Content-Type', 'application/javascript');
	res.render('jq.ejs');
})
.get('/socket.io/socket.io.js', (req, res) => {
	res.status(200).setHeader('Content-Type', 'application/javascript');
})
.use((req, res) => {
	res.status(301).redirect('/');
})

/*
	if (req.url === '/jq.js') {
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
*/

app.listen(8080);
