/*
	apt-get update
	apt install snapd
	snap install heroku --classic
	
	heroku login
	heroku create

	https://morning-harbor-96133.herokuapp.com/
	https://git.heroku.com/morning-harbor-96133.git

*/
const express = require('express')
const app = express()

const db = require('./lib/db')
db.connectMySql()

const handlebars = require('express-handlebars').create({ defaultLayout: 'main'})
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')

app.use((req, res, next) => {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});

app.use(require('body-parser').urlencoded({ extended: true }))

app.get('/', (req, res) => {
	console.log(req.query.name);
	var recs = db.getFilms((recs) => {
		res.render('home', { films: recs, name: req.query.name });
		// res.render('home', { films: recs, name: req.query.name });
	})
})

app.post('/', (req, res) => {
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
})

app.use(express.static(__dirname + '/public'))

app.get('/about', (req, res) => {
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
})

app.use((req, res) => {
	res.status(404)
	res.send('Ошибка 404: наполнения еще нет')
})

app.listen(5000, () =>
	console.log('Server started, port 5000'))

