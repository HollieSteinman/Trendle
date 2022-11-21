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
        // select all locations
        var sql = "select Name from Locations;";
        con.query(sql, function (err2, result) {
        if (err2) callback(err2);
        else {
            callback(null, Object.values(JSON.parse(JSON.stringify(result))));
        };
        });
    });
}