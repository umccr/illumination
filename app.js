const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      request = require("request"),
      path = require("path"),
      os = require("os"),
      utils = require("./utils"),
      illumina = require("./illumina");

const port = process.env.PORT || 3000;
const pageSize = 100;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// access /public files from /static
app.use("/static", express.static(path.join(__dirname, "public")));

const token = illumina.read_iap_token(path.join(os.homedir(), '.iap/.session.yaml'));

app.get("/", (req, res) => res.render("home"));

let options = {
    headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
    },
    baseUrl : illumina.base_url
};

//------------------------ TES Routes -------------------------------//
app.get("/tasks", (req, res) => {
    let opts = options;
    opts.url = `/tasks?pageSize=${pageSize}`;

    request.get(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const tasks = JSON.parse(body);
            res.render("tes/tasks", {
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
    opts.url = `/tasks/runs?pageSize=${pageSize}`;

    request.get(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const truns = JSON.parse(body);
            // console.log(truns);
            res.render("tes/taskruns", {
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
    opts.url = `/tasks/${taskid}`;

    request.get(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const task_info = JSON.parse(body);
            // console.log(task_info);
            res.render("tes/taskid", {
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

app.get("/tasks/:taskid/versions", (req, res) => {
    let opts = options;
    const taskid = req.params.taskid;
    opts.url = `/tasks/${taskid}/versions`;

    request.get(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const vinfo = JSON.parse(body);
            // console.log(vinfo);
            res.send(vinfo);
            // res.render("tes/taskid", {
            //     task_info: task_info,
            //     taskid: taskid,
            //     id2username: illumina.id2username,
            //     format_date: utils.format_date
            // });
        } else {
            console.log("There was an error: " + error);
        }
    });
});

app.get("/tasks/runs/:runid", (req, res) => {
    let opts = options;
    const runid = req.params.runid;
    opts.url = `/tasks/runs/${runid}`;

    request.get(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const trun_info = JSON.parse(body);
            // console.log(taskrun_info);
            // res.send(taskrun_info);
            res.render("tes/taskrunid", {
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

//------------------------ WES Routes -------------------------------//
app.get("/workflows", (req, res) => {
    let opts = options;
    opts.url = `/workflows?pageSize=${pageSize}`;

    request.get(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const wflows = JSON.parse(body);
            // res.send(wflows);
            res.render("wes/workflows", {
                wflows: wflows,
                id2username: illumina.id2username,
                format_date: utils.format_date
            });
        } else {
            console.log("There was an error: " + error);
        }
    });
});

app.get("/workflows/runs", (req, res) => {
    let opts = options;
    opts.url = `/workflows/runs?pageSize=${pageSize}`;

    request.get(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const wruns = JSON.parse(body);
            res.send(wruns);
            // res.render("wes/workflowruns", {
            //     wruns: wruns,
            //     id2username: illumina.id2username,
            //     format_date: utils.format_date
            // });
        } else {
            console.log("There was an error: " + error);
        }
    });
});


app.get("/workflows/:workflowid", (req, res) => {
    let opts = options;
    const wflowid = req.params.workflowid;
    opts.url = `/workflows/${wflowid}`;

    request.get(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            const wflow_info = JSON.parse(body);
            // res.send(wflow_info);
            res.render("wes/workflowid", {
                wflow_info: wflow_info,
                wflowid: wflowid,
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
