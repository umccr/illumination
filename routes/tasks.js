const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const request_opts = illumina.request_opts();

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/tasks";
  opts.params = qs;

  axios(opts)
    .then((response) => {
      res.render("tes/tasks", {
        tasks: response.data,
        id2username: illumina.id2username,
        format_date: utils.format_date,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/runs", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/tasks/runs";
  opts.params = qs;

  axios(opts)
    .then((response) => {
      res.render("tes/taskruns", {
        taskruns: response.data,
        id2username: illumina.id2username,
        format_date: utils.format_date,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/runs/:runid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const runid = req.params.runid;
  opts.url = `/tasks/runs/${runid}`;
  opts.params = qs;

  axios(opts)
    .then((response) => {
      res.render("tes/taskrunid", {
        trun_info: response.data,
        runid: runid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/:taskid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const taskid = req.params.taskid;
  opts.url = `/tasks/${taskid}`;
  opts.params = qs;

  axios(opts)
    .then((response) => {
      res.render("tes/taskid", {
        task_info: response.data,
        taskid: taskid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/:taskid/versions", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const taskid = req.params.taskid;
  opts.url = `/tasks/${taskid}/versions`;
  opts.params = qs;

  axios(opts)
    .then((response) => {
      res.render("tes/taskversions", {
        versions: response.data,
        taskid: taskid,
        id2username: illumina.id2username,
        format_date: utils.format_date,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/:taskid/versions/:versionid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const taskid = req.params.taskid;
  const versionid = req.params.versionid;
  opts.url = `/tasks/${taskid}/versions/${versionid}`;
  opts.params = qs;

  axios(opts)
    .then((response) => {
      res.render("tes/taskversionbody", {
        taskid: taskid,
        versionid: versionid,
        version: response.data,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      });
    })
    .catch((error) => utils.print_error(error));
});

module.exports = router;
