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
router.get('/', function(req, res, next) {
  connection.query(`select * from users`, (err, rows, fields) => {
    res.json(rows);
  })
});
//
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/', function(req, res, next) {
  let name = req.body.name;
  let age = req.body.age;
  console.log(typeof name);
  console.log(typeof age);
  connection.query(`insert into users(name,age) values('${name}', ${age})`, (err, rows, field) => {
    console.log(err);
    res.json('성공');
  })
});

// router.put('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// router.delete('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
