const exrpess = require('express');
const app = exrpess();
const mysql = require('mysql');
const PORT = process.env.port || 8000;
const config = require('./key');

const db = mysql.createConnection({
  host : config.host,
  user : config.user,
  password : config.password,
  database : config.database,
  insecureAuth : config.insecureAuth
  });

/* app.get('/api', (req, res) => {
   const sqlQuery = "INSERT INTO request (rowno) VALUES (1)";
   db.query(sqlQuery, (err, result) => {
    res.send("success!!");
   })
}); */

app.get('/api/list', (req, res) => {
  const sqlQuery = "SELECT * FROM BOARD;";
  db.query(sqlQuery, (err, result) => {
    res.send(result);
  })
});

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
})