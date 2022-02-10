const yaml = require("js-yaml"),
  fs = require("fs"),
  path = require("path"),
  os = require("os"),
  combineURLs = require("axios/lib/helpers/combineURLs");

const ica_v2_server_url = process.env.ICAV2_SERVER_URL || "https://ica.illumina.com";
const base_url = combineURLs(ica_v2_server_url, "ica/rest/api");

const token = (function () {
  console.log("Loading ICAV2 token");
  let token;
  token = process.env.ICAV2_ACCESS_TOKEN;
  if (token) {
    console.log("Using token from ENV");
  } else {
    try {
      let session_file = path.join(os.homedir(), ".icav2/.session.ica.yaml");
      token = yaml.load(fs.readFileSync(session_file, "utf8"));
      token = token["access-token"];
    } catch (e) {
      console.log(e);
    }
    console.log("Using token from session file");
  }
  return token;
})();

const request_opts = function () {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json",
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
