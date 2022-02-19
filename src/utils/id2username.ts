const id2username_json: {[key: string]: string} = require("./id2username.json");
const id2username = function (id: string) {
  return id2username_json[id];
};

module.exports = {
    id2username: id2username
}
