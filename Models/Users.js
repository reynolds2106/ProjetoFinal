const db = require("../utils/dbconnection");

function teste(callback) {
  db.getQuery("SELECT name,email FROM users", [], function (data) {
    if (data.length != 0) {
      callback({
        success: true,
        data: data,
      });
    } else {
      callback({
        success: false,
        error: "No data ",
      });
    }
  });
}

function create_user(name,email,password,roles,callback){
  db.changeQuery("INSERT INTO users (name,email,password,roles_id) VALUES (?,?,?,?)", [name,email,password,roles], function (data) {
    if (data.length != 0) {
      callback({
        success: true,
        message: "success",
      });
    } else {
      callback({
        success: false,
        error: "No data ",
      });
    }
  } );
}

module.exports = {teste,create_user};
