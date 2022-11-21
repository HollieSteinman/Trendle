const mysql = require('mysql');

const pool = mysql.createPool({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: "trendle",
  charset : 'utf8mb4'
});


exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  pool.getConnection(function(err1, con) {
      // insert game
      var sql = `insert into Games (Username, Score) values (${con.escape(event.name)}, ${event.score})`;
      con.query(sql, function (err2, result) {
      if (err2) callback(err2);
      else {
          callback(null, {
              success: true
          })
      };
      });
  })
}