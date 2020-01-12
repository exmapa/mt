const pg = require('pg')

var conn = null;

function Connection() {
	this.test = "TESTsTRING";

	const connString = 'postgres://postgres:masterkey@localhost/ms';
	const client = new pg.Client(connString);
	client.connect();
/*	client.connect(connString, function(err, client, done) {
		if(err)
			return console.error('Error connect', err);

		console.log('connect psql ok');
	})*/
	this.connect = connect;
}

function connect() {
	console.log('connect()');
}

module.exports = Connection;