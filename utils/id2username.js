const id2username_json = require("./id2username.json");
const id2username = function (id) {
  return id2username_json[id];
};

module.exports = {
    id2username: id2username
}
