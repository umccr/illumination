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

const usernames = {
    "567d89e4-de8b-3688-a733-d2a979eb510e": "PD",
    "7eec7332-f780-3edc-bb70-c4f711398f1c": "RV",
    "8abf754b-e94f-3841-b44b-75d10d33588b": "SK",
    "c9688651-7872-3753-8146-ffa41c177aa1": "VS",
};

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

let options = {
    method: 'GET',
    headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
};

app.get("/tasks", (req, res) => {
    let opts = options;
    opts.url = illumina_url + 'tasks?pageSize=1000';

    request(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const tasks = JSON.parse(body);
            res.render("tasks", { tasks: tasks, usernames: usernames });
        }
    });
});

app.get("/tasks/:taskid", (req, res) => {
    let opts = options;
    const taskid = req.params.taskid;
    opts.url = illumina_url + `tasks/${taskid}`;

    request(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const task_info = JSON.parse(body);
            console.log(task_info);
            res.render("taskid", { task_info: task_info, taskid: taskid, usernames: usernames });
        }
    });
});

app.get("/tasks/runs/:runid", (req, res) => {
    const runid = req.params.runid;
    res.send("You're getting details for task run " + runid + "!");
});

app.get("*", (req, res) => {
    res.send("You're a STAR!");
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
