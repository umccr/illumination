const request = require("request"),
    yaml = require("js-yaml"),
    fs = require("fs"),
    os = require("os")


const token_file = os.homedir() + '/.iap/.session.yaml';
const token = read_iap_token(token_file);

const options = {
    method: 'GET',
    url: 'https://aps2.platform.illumina.com/v1/tasks',
    headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
};


request(options, (error, response, body) => {
    if (error) throw new Error(error);
    console.log(body);
});

