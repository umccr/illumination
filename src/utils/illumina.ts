const yaml = require("js-yaml"),
  fs = require("fs"),
  path = require("path"),
  os = require("os"),
  utils = require("./utils")

const ica_v2_server_url = process.env.ICAV2_SERVER_URL || "ica.illumina.com";
const base_url = utils.combineURLs(`https://${ica_v2_server_url}`, "ica/rest/api");

/* grab access-token from:
* 1. the ICAV2_ACCESS_TOKEN env var
* 2. the ~/.icav2/.session.ica.yaml file
*/
const token = (function () {
  let session_file = ".icav2/.session.ica.yaml"
  let session_file_path = path.join(os.homedir(), session_file);
  let token;
  token = process.env.ICAV2_ACCESS_TOKEN;
  if (token) {
    console.log("Loading ICAV2 access-token from ICAV2_ACCESS_TOKEN env var");
  } else {
    try {
      token = yaml.load(fs.readFileSync(session_file_path, "utf8"));
      token = token["access-token"];
      if (token) {
        console.log(`Loading ICAV2 access-token from ~/${session_file}`);
      }
    } catch (e) {
      utils.print_error(`Couldn't find ICAV2_ACCESS_TOKEN env var or 'access-token' in ~/${session_file}.`)
      utils.print_error(e);
      process.exit(1);
    }
  }
  return token;
})();

const request_opts = function () {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "accept": "application/vnd.illumina.v3+json"
    },
    baseURL: base_url,
  };
};

module.exports = {
  token: token,
  base_url: base_url,
  request_opts: request_opts,
};
