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
    // select locations for the trend
    var sql = `select loc.Name from Locations loc join Trends tr on loc.ID = tr.Location_ID where tr.Name = '${event.trend}'`;
    con.query(sql, function (err2, result) {
      if (err2) callback(err2);
      else {
        const locations = Object.values(JSON.parse(JSON.stringify(result)));
				const correct = locations.filter(loc => loc.Name === event.guess).length > 0;
				callback(null, {
					correct: correct,
					answers: locations
				});
      };
    });
	});
}