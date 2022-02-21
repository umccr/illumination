import fs from "fs";
// import * as id2username_json from "./id2username.json";
const id2username_json = JSON.parse(fs.readFileSync("./id2username.json", "utf-8"))

const id2username = function (id: string) {
  return id2username_json[id];
};

module.exports = {
    id2username: id2username
}
