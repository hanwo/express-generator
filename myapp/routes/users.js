var express = require('express');
var router = express.Router();
var cors = require('cors')
var maraidb = require('mysql')
var app = express();
app.use(cors());

var connection = maraidb.createConnection({
    host: 'nowrica.synology.me',
    port: 33336,
    user: 'root',
    password: '1234',
    database: 'express'
})
connection.connect();

/* GET users listing. */
router.get('/', function (req, res, next) {
    if (!req.query.name) {
        connection.query(`select * from users`, (err, rows, fields) => {
            res.json(rows);
        })
    }
    next();
});

router.get('/', function (req, res, next) {
    if (req.query.name) {
        let name = req.query.name;
        connection.query(`select * from users where name = '${name}'`, (err, rows, fields) => {
            res.json(rows);
        })
    }
});

router.post('/', function (req, res, next) {
    let name = req.body.name;
    let age = req.body.age;
    connection.query(`insert into users(name,age) values('${name}', ${age})`, (err, rows, fields) => {
        console.log(err);
        res.json('성공');
    })
});

router.put('/', function (req, res, next) {
    let name = req.body.name;
    let age = req.body.age;
    connection.query(`UPDATE users SET age = ${age} where name = '${name}'`, (err, rows, fields) => {
        console.log(err, rows, fields)
        res.json(`${name}의 나이 변경 성공`);
    })
});

router.delete('/', function (req, res, next) {
    let name = req.body.name;
    connection.query(`DELETE FROM users WHERE name = '${name}'`, (err, rows, fields) => {
        console.log((err, rows, fields));
        res.json(`${name} 삭제 성공`);
    })
});

module.exports = router;
