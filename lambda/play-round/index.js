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
    // select a random trend
    var sql = "select distinct * from Trends order by RAND() limit 1";
    con.query(sql, function (err2, result) {
      if (err2) callback(err2);
      else {
        // select tweets for the trend
        sql = `select tw.* from Tweets tw join Trend_Tweets tt on tw.ID = tt.Tweet_ID join Trends tr on tt.Trend_ID = tr.ID where tr.ID = ${result[0].ID}`
        con.query(sql, function (err3, response) {
          if (err3) callback(err3);
          else {
            callback(null, {
              trend: result[0].Name,
              tweets: Object.values(JSON.parse(JSON.stringify(response)))
            });
          }
        });
      };
    });
  })
};