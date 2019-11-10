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
    baseUrl : illumina.base_url,
    json: true
};

//------------------------ TES Routes -------------------------------//
app.get("/tasks", (req, res) => {
    let opts = options;
    opts.url = `/tasks?pageSize=${pageSize}`;

    request.get(opts, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            res.render("tes/tasks", {
                tasks: body,
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
            res.render("tes/taskruns", {
                truns: body,
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
            res.render("tes/taskid", {
                task_info: body,
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
            res.send(body);
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
            res.render("tes/taskrunid", {
                trun_info: body,
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
            res.render("wes/workflows", {
                wflows: body,
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
            res.send(body);
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
            res.render("wes/workflowid", {
                wflow_info: body,
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
