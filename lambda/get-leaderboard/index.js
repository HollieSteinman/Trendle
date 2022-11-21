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
    // find top 10 games
    var sql = 'select * from Games order by score desc limit 10;';
    con.query(sql, function (err2, result) {
      if (err2) callback(err2);
      else {
        callback(null, Object.values(JSON.parse(JSON.stringify(result))))
      };
    });
  })
}