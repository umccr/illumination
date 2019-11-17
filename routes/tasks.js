const express = require("express");
const router = express.Router();
const request = require("request");
const illumina = require("../utils/illumina");
const utils = require("../utils/utils")
const pageSize = 100;
const request_opts = illumina.request_opts();

router.get("/", (req, res) => {
  let opts = request_opts;
  opts.url = "/tasks";
  opts.qs = {
    pageSize: pageSize,
    sort: "timeCreated desc"
  };

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("tes/tasks", {
        tasks: body,
        id2username: illumina.id2username,
        format_date: utils.format_date
      });
    } else {
      utils.print_error(error);
    }
  });
});

router.get("/runs", (req, res) => {
  let opts = request_opts;
  opts.url = "/tasks/runs";
  opts.qs = {
    pageSize: pageSize,
    sort: "timeCreated desc"
  };

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("tes/taskruns", {
        truns: body,
        id2username: illumina.id2username,
        format_date: utils.format_date
      });
    } else {
      utils.print_error(error);
    }
  });
});

router.get("/runs/:runid", (req, res) => {
  let opts = request_opts;
  const runid = req.params.runid;
  opts.url = `/tasks/runs/${runid}`;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("tes/taskrunid", {
        trun_info: body,
        runid: runid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight
      });
    } else {
      utils.print_error(error);
    }
  });
});

router.get("/:taskid", (req, res) => {
  let opts = request_opts;
  const taskid = req.params.taskid;
  opts.url = `/tasks/${taskid}`;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("tes/taskid", {
        task_info: body,
        taskid: taskid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight
      });
    } else {
      utils.print_error(error);
    }
  });
});

router.get("/:taskid/versions", (req, res) => {
  let opts = request_opts;
  const taskid = req.params.taskid;
  opts.url = `/tasks/${taskid}/versions`;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("tes/taskversions", {
        versions: body,
        taskid: taskid,
        id2username: illumina.id2username,
        format_date: utils.format_date
      });
    } else {
      utils.print_error(error);
    }
  });
});

router.get("/:taskid/versions/:versionid", (req, res) => {
  let opts = request_opts;
  const taskid = req.params.taskid;
  const versionid = req.params.versionid;
  opts.url = `/tasks/${taskid}/versions/${versionid}`;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("tes/taskversionbody", {
        taskid: taskid,
        versionid: versionid,
        version: body,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight
      });
    } else {
      utils.print_error(error);
    }
  });
});


module.exports = router;
