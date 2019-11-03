const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    request = require("request"),
    path = require("path"),
    yaml = require("js-yaml"),
    fs = require("fs"),
    os = require("os");

const port = 3000;
const illumina_url = "https://aps2.platform.illumina.com/v1/"


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// access /public files from /static
app.use("/static", express.static(path.join(__dirname, "public")));

function read_iap_token(t) {
    let token;
    try {
        token = yaml.safeLoad(fs.readFileSync(t, 'utf8'));
        token = token['access-token'];
    } catch (e) {
        console.log(e);
    }
    return token;
}

const token = read_iap_token(path.join(os.homedir(), '.iap/.session.yaml'));

app.get("/", (req, res) => res.render("home"));

let opts = {
    method: 'GET',
    url: illumina_url + 'tasks?pageSize=1000',
    headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
};

app.get("/tasks", (req, res) => {

    request(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const tasks = JSON.parse(body);
            res.render("tasks", { tasks: tasks });
        }
    });
});

app.get("/tasks/:taskid", (req, res) => {
    const taskid = req.params.taskid;
    res.send("You're getting details for task " + taskid + "!");
});

app.get("/tasks/runs/:runid", (req, res) => {
    const runid = req.params.runid;
    res.send("You're getting details for task run " + runid + "!");
});

app.get("*", (req, res) => {
    res.send("You're a STAR!");
});


app.listen(port, () => {
    console.log("Server listening at http://localhost:3000");
});
