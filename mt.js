/*
	apt-get update
	apt install snapd
	snap install heroku --classic

	heroku login
	heroku create

	https://morning-harbor-96133.herokuapp.com/
	https://git.heroku.com/morning-harbor-96133.git

	Procfile

	git push heroku master

	heroku logs --tail

	heroku addons - просмотр дополнений, напр. Postgres

	DATABASE_URL: postgres://lrxbgbxqyxxjoa:1c0c5a35d7d5e724ce6ef6716e8d91c03c122143528487c695a69206a0b3070b@ec2-174-129-29-52.compute-1.amazonaws.com:5432/daluu8l8eijmui

	Postgresql:
	  npm install pg --save

*/
const express = require('express')
const app = express()

/*const db = require('./lib/db')
db.connectMySql();*/

const Connection = require('./lib/post');
var conn = new Connection();
console.log('conn:' + conn.test);
conn.connect();

const handlebars = require('express-handlebars').create({ defaultLayout: 'main'})
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.use(require('body-parser').urlencoded({ extended: true }))

app.get('/', (req, res) => {
	console.log(req.query.name);
	if(db.connectOk()) {
		console.log('connect ok');
		var recs = db.getFilms((recs) => {
			res.render('home', { films: recs, name: req.query.name });
			// res.render('home', { films: recs, name: req.query.name });
		})		
	} else {
		console.log('connect error');
		res.send('<h1>Ошибка соединения с БД</h1>')
	}
})

/*app.post('/', (req, res) => {
	console.log('post-object:' + req);
	for(key in req)
		console.log('    ' + key);
	console.log('post:' + req.query.name);
	var recs = db.getFilms((recs) => {
		res.render('home', { films: recs, name: req.query.name });
		// res.render('home', { films: recs, name: req.query.name });
	})
})

app.get('/processform', (req, res) => {
	console.log(req.query.naim);
	res.render('processform', {});
})*/

app.use(express.static(__dirname + '/public'))

/*app.get('/about', (req, res) => {
	res.render('about')
})

app.get('/contact', (req, res) => {
	res.render('about')
})

app.get('/headers', (req, res) => {
	var s = '<ul>'
	for(var key in req.headers)
		s += `<li>${key} <b>${req.headers[key]}</b>`
	res.send(s + '</ul>');
})

app.use((req, res) => {
	res.status(404)
	res.render('404')
})*/

app.use((req, res) => {
	res.status(404)
	res.send('Ошибка 404: наполнения еще нет<br>' + connStatus)
})

const port = process.env.PORT || 5000;
app.listen(port, () =>
	console.log(`Server started, port ${port}`))

