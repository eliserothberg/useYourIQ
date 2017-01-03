// var mysql = require('mysql');
 
// var connection = mysql.createConnection(
//     {
//       host     : '127.0.0.1',
//       user     : 'root',
//       password : 'password',
//       database : 'sales_db',
//       dialect  : "mysql"
//     }
// );
 
// connection.connect();
 
// var queryString = 

// "SELECT * FROM Deals WHERE (dealStatus = 'Deal Won (100%)' OR dealStatus = 'Very Likely (90%)') AND (newVersusReturning = 'New Business' OR newVersusReturning = 'Upsell/New Sale to Existing Project') AND closeDate BETWEEN '2016-01-01' AND 'NOW';"

// ;
 
// connection.query(queryString, function(err, rows, fields) {
//     if (err) throw err;
 
//     for (var i in rows) {
//         console.log("Project Name: "+rows[i].name + "Revenue: $"+rows[i].revenue);
//     }
// });
 
// connection.end();