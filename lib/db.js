var conn = null;

exports.connectMySql = function() {
    const mysql = require('mysql')
    const options = {
        user: 'root',
        password: '111111',
        database: 'ms'
    }
    conn = mysql.createConnection(options);
    conn.connect((err) => {
        if(err)
            console.log('Error connect to bd');
        else
            console.log('Connect to bd ok');
    })
}

function getFilms(func) {
    conn.query('SELECT * FROM films ORDER BY Id', (err, todos) => {
        if(err) {
            console.log('Error select');
            throw err
        } else {
            var recs = [];
            for(var i = 0; i < todos.length; i++)
                recs.push(todos[i].filename);

            func(recs)
        }
    })  
}

exports.getFilms = getFilms

exports.connectOk = function() {
    return conn;
}