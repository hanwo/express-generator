/*
게시판 CRUD 만들기
 */

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

/* GET board listing. */
// router.get('/', function (req, res, next) {
//     console.log(req.query);
//     // 전체 검색
//     if (!req.query.id) {
//         connection.query(`select * from board`, (err, rows, fields) => {
//             res.json(rows);
//         })
//     } else { // ID 조회
//         let id = req.query.id;
//         connection.query(`select * from board where id = ${id}`, (err, rows, fields) => {
//             res.json(rows);
//         })
//     }
// });

// router.get('/', function (req, res, next) {
//     if (req.query.name) {
//         let name = req.query.name;
//         connection.query(`select * from board where name = '${name}'`, (err, rows, fields) => {
//             res.json(rows);
//         })
//     }
// });

// // 삽입
// router.post('/', function (req, res, next) {
//     let title = req.body.title;
//     let content = req.body.content;
//     connection.query(`insert into board(title,content) values('${title}', '${content}')`, (err, rows, fields) => {
//         console.log(err);
//         res.json('성공');
//     })
// });
//
// // 수정
// router.put('/', function (req, res, next) {
//     let id = req.body.id;
//     let title = req.body.title;
//     let content = req.body.content;
//     if(title && !content){
//         connection.query(`UPDATE board SET title = '${title}' where id = ${id}`, (err, rows, fields) => {
//             console.log(err, rows, fields)
//             res.json(`${title}의 제목 변경 성공`);
//         })
//     } else if(!title && content){
//         connection.query(`UPDATE board SET content = '${content}' where id = ${id}`, (err, rows, fields) => {
//             console.log(err, rows, fields)
//             res.json(`${content}의 내용 변경 성공`);
//         })
//     } else if(title && content){
//         connection.query(`UPDATE board SET content = '${content}', title = '${title}' where id = ${id}`, (err, rows, fields) => {
//             console.log(err, rows, fields)
//             res.json(`${id}의 제목,내용 변경 성공`);
//         })
//     }
//
// });
//
// //삭제
// router.delete('/', function (req, res, next) {
//     let id = req.body.id;
//     connection.query(`DELETE FROM board WHERE id = ${id}`, (err, rows, fields) => {
//         console.log((err, rows, fields));
//         res.json(`삭제 성공`);
//     })
// });

// Get Board & Users Listening
// 검색
router.get('/', function (req, res, next) {
    let query = 'select b.id, b.title, b.content, b.date, b.writer, u.name as name from board b JOIN users u on u.id = b.writer where'
    // 전체 검색
    if (Object.keys(req.query).length === 0) {
        connection.query(`select b.*, u.name from board b JOIN users u on b.writer = u.id;`, (err, rows, fields) => {
            res.json(rows);
        })
    } else { // 검색
        for (const [key, value] of Object.entries(req.query)) {
            query += ` b.${key} = '${value}' or`
        }
        query = query.substr(0, query.length - 2)
        connection.query(query, (err, rows, fields) => {
            if(err) res.json('검색 실패')
            res.json(rows);
        })
    }
});

// 삽입
router.post('/', function (req, res, next) {
    let title = req.body.title;
    let content = req.body.content;
    let writer = req.body.writer;
    connection.query(`insert into board(title,content,writer) values('${title}', '${content}', '${writer}')`, (err, rows, fields) => {
        if (err) res.json('삽입 실패');
        res.json('성공');
    })
});

// 수정
router.put('/', function (req, res) {
    let writer = req.body.id;
    let title = req.body.title;
    let content = req.body.content;
    connection.query(`UPDATE board SET content = '${content}', title = '${title}' where writer = ${writer}`, (err, rows, fields) => {
        if (err) res.json('수정 실패')
        res.json('수정 성공');
    })
})

// 삭제
router.delete('/', function (req, res, next) {
    let id = req.body.id;
    connection.query(`DELETE FROM board WHERE writer = ${id}`, (err, rows, fields) => {
        if (err) res.json('삭제 실패')
        res.json(`삭제 성공`);
    })
});
module.exports = router;
