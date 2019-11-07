const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      request = require("request"),
      path = require("path"),
      os = require("os"),
      illumina = require("./illumina");

const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// access /public files from /static
app.use("/static", express.static(path.join(__dirname, "public")));

const token = illumina.read_iap_token(path.join(os.homedir(), '.iap/.session.yaml'));

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
    opts.url = illumina.base_url + 'tasks?pageSize=1000';

    request(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const tasks = JSON.parse(body);
            res.render("tasks", { tasks: tasks, id2username: illumina.id2username });
        }
    });
});

app.get("/tasks/:taskid", (req, res) => {
    let opts = options;
    const taskid = req.params.taskid;
    opts.url = illumina.base_url + `tasks/${taskid}`;

    request(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const task_info = JSON.parse(body);
            console.log(task_info);
            res.render("taskid", { task_info: task_info, taskid: taskid, id2username: illumina.id2username });
        }
    });
});

app.get("/tasks/runs/:runid", (req, res) => {
    const runid = req.params.runid;
    res.send("You're getting details for task run " + runid + "!");
});

app.get("*", (req, res) => {
    res.send("Oops. Wrong URL!");
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
