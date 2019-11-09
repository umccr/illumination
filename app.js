const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      request = require("request"),
      path = require("path"),
      os = require("os"),
      utils = require("./utils"),
      illumina = require("./illumina");

const port = process.env.PORT || 3000;

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
            res.render("tasks", {
                tasks: tasks,
                id2username: illumina.id2username,
                format_date: utils.format_date
            });
        } else {
            console.log("There was an error: " + error);
        }
    });
});

app.get("/tasks/runs", (req, res) => {
    let opts = options;
    opts.url = illumina.base_url + 'tasks/runs?pageSize=1000';

    request(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const truns = JSON.parse(body);
            console.log(truns);
            res.render("taskruns", {
                truns: truns,
                id2username: illumina.id2username,
                format_date: utils.format_date
            });
        } else {
            console.log("There was an error: " + error);
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
            // console.log(task_info);
            res.render("taskid", {
                task_info: task_info,
                taskid: taskid,
                id2username: illumina.id2username,
                format_date: utils.format_date
            });
        } else {
            console.log("There was an error: " + error);
        }
    });
});

app.get("/tasks/runs/:runid", (req, res) => {
    let opts = options;
    const runid = req.params.runid;
    opts.url = illumina.base_url + `tasks/runs/${runid}`;

    request(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const trun_info = JSON.parse(body);
            // console.log(taskrun_info);
            // res.send(taskrun_info);
            res.render("taskrunid", {
                trun_info: trun_info,
                runid: runid,
                id2username: illumina.id2username,
                format_date: utils.format_date
            });
        } else {
            console.log("There was an error: " + error);
        }
    });
});

app.get("*", (req, res) => {
    res.send("Oops. Wrong URL!");
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
