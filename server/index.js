const express = require('express');
const app = express();
const mysql = require('mysql');
const PORT = process.env.port || 8000;
const config = require('./key');


const bodyParser = require("body-parser");

// 아랫부분 적당한 위치에 추가
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host : config.host,
  user : config.user,
  password : config.password,
  database : config.database,
  insecureAuth : config.insecureAuth
  });

app.get('/api', (req, res) => {
   const sqlQuery = "INSERT INTO request (rowno) VALUES (1)";
   db.query(sqlQuery, (err, result) => {
    res.send("success!!");
   })
});

app.get('/api/list', (req, res) => {
  const sqlQuery =  "SELECT BOARD_ID, BOARD_TITLE, REGISTER_ID, DATE_FORMAT(REGISTER_DATE, '%Y-%m-%d') AS REGISTER_DATE FROM BOARD;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  })
});

app.post('/api/write', (req, res) => {
  
  const title = req.body.title;
  const content = req.body.content;

  console.log('req', req.body);
  console.log('title', title);
  console.log('content', content);

  const sqlQuery = "INSERT INTO BOARD(BOARD_TITLE, BOARD_CONTENT, REGISTER_ID) VALUES (?, ?, 'travelSnail');";
  db.query(sqlQuery, [title, content],(err, result) => {
    if(err){
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.post('/api/delete', (req, res) => {
  const id = req.body.id;

  const sqlQuery = 'DELETE FROM BOARD WHERE BOARD_ID IN (?);';
  db.query(sqlQuery, [id], (err, result) => {
    if(err){
      console.log('err', err);
    } else {
      res.send(result);
      console.log('result', result);
    }
  })
})

app.post('/api/update', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const sqlQuery = "UPDATE BOARD SET (BOARD_TITLE = ?, BOARD_CONTENT = ?, UPDATER_ID) FROM (?, ?, 'travelSnail');";
  db.query(sqlQuery, [title, content], (err, result) => {
    if(err){
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.get('/api/detail', (req, res) => {
  const id = req.query.id;
  console.log('req', id);
  const sqlQuery = "SELECT BOARD_TITLE, BOARD_CONTENT FROM BOARD WHERE BOARD_ID = ?;";
  db.query(sqlQuery, [id], (err, result) => {
    if(err){
      console.log(err);
    } else {
      res.send(result);
    }
  })
})

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})