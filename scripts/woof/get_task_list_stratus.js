const request = require("request");
const yaml = require("js-yaml");
const fs = require("fs");
const os = require("os");

// get iap token
let token;
try {
    const token_file = os.homedir() + '/.iap/.session.yaml';
    token = yaml.safeLoad(fs.readFileSync(token_file, 'utf8'));
    token = token['access-token'];
} catch (e) {
    console.log(e);
}

const options = {
    method: 'GET',
    url: 'https://aps2.platform.illumina.com/v1/tasks',
    headers: {
        Host: 'aps2.platform.illumina.com',
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
};

request(options, (error, response, body) => {
  if (error) throw new Error(error);
  console.log(body);
});

