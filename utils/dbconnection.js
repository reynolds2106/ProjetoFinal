const sql = require("mysql");

const pool = sql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "loja",
});

module.exports = {
  checkExist: function (query, array, callback) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
      connection.query(
        {
          sql: query,
          timeout: 20000, // 20s
          values: array,
        },
        function (error, results, fields) {
          connection.release();
          if (error) throw error;
          console.log("The solution is: ", results.length);
          if (results.length > 0) {
            callback(results);
          } else {
            callback(null);
          }
        }
      );
    });
  },
  getQuery: function (query, array, callback) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
      connection.query(
        {
          sql: query,
          timeout: 20000, // 20s
          values: array,
        },
        function (error, results, fields) {
          connection.release();
          if (error) throw error;
          console.log("The solution is: ", results);
          callback(results);
        }
      );
    });
  },
  changeQuery: function (query, array, callback) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
      connection.query(
        {
          sql: query,
          timeout: 20000, // 20s
          values: array,
        },
        function (error, results, fields) {
          connection.release();
          if (error) throw error;
          console.log("The solution is: ", results);
          callback(results);
        }
      );
    });
  },
  changeWithoutCallbackQuery: function (query, array) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      // Use the connection
      connection.query(
        {
          sql: query,
          timeout: 20000, // 20s
          values: array,
        },
        function (error, results) {
          connection.release();
          if (error) throw error;
          console.log("affected rows " + results.affectedRows + " rows");
        }
      );
    });
  },
};