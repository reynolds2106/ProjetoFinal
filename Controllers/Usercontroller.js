const UsersModel = require("../Models/Users");
const crypto = require("crypto");
function teste(callback) {
  UsersModel.teste(function (data) {
    callback(data);
  });
}

function create_user(data, callback) {
  var hash = crypto.createHash("md5").update(data.password).digest("hex");
  console.log(hash);
  UsersModel.create_user(
    data.name,
    data.email,
    hash,
    data.role,
    function (data) {
      callback(data);
    }
  );
}

module.exports = { create_user, teste };
