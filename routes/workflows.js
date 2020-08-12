const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const request_opts = illumina.request_opts();

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/workflows";
  opts.params = qs;

  axios(opts)
    .then((response) => {
      // res.send(response.data);
      res.render("wes/workflows", {
        wflows: response.data,
        id2username: illumina.id2username,
        format_date: utils.format_date,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/runs", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/workflows/runs";
  opts.params = qs;

  axios(opts)
    .then((response) => {
      // res.send(response.data);
      res.render("wes/workflowruns", {
        wflruns: response.data,
        base_url: illumina.base_url,
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
  opts.url = `/workflows/runs/${runid}`;
  opts.params = qs;

  axios(opts)
    .then((response) => {
      // res.send(response.data);
      res.render("wes/workflowrunid", {
        wrun_info: response.data,
        runid: runid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/runs/:runid/history", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const runid = req.params.runid;
  opts.url = `/workflows/runs/${runid}/history`;
  opts.params = qs;

  axios(opts)
    .then((response) => {
      res.render("wes/workflowrunhistory", {
        history: response.data,
        runid: runid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/versions", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/workflows/versions";
  opts.params = qs;

  axios(opts)
    .then((response) => {
      // res.send(response.data);
      res.render("wes/workflowversionsall", {
        versions: response.data,
        id2username: illumina.id2username,
        format_date: utils.format_date,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/signals", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/workflows/signals";
  opts.params = qs;

  axios(opts)
    .then((response) => {
      res.render("wes/workflowsignals", {
        signals: response.data,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/signals/:signalid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const signalid = req.params.signalid;
  opts.url = `/workflows/signals/${signalid}`;
  opts.params = qs;

  axios(opts)
    .then((response) => {
      res.render("wes/workflowsignalid", {
        signal: response.data,
        signalid: signalid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/:workflowid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const wflowid = req.params.workflowid;
  opts.url = `/workflows/${wflowid}`;
  opts.params = qs;

  axios(opts)
    .then((response) => {
      res.render("wes/workflowid", {
        wflow_info: response.data,
        wflowid: wflowid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/:workflowid/versions", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const workflowid = req.params.workflowid;
  opts.url = `/workflows/${workflowid}/versions`;
  opts.params = qs;

  axios(opts)
    .then((response) => {
      // res.send(response.data);
      res.render("wes/workflowversions", {
        versions: response.data,
        workflowid: workflowid,
        id2username: illumina.id2username,
        format_date: utils.format_date,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/:workflowid/versions/:versionid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const workflowid = req.params.workflowid;
  const versionid = req.params.versionid;
  opts.url = `/workflows/${workflowid}/versions/${versionid}`;
  opts.params = qs;

  axios(opts)
    .then((response) => {
      res.render("wes/workflowversionbody", {
        workflowid: workflowid,
        versionid: versionid,
        version: response.data,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      });
    })
    .catch((error) => utils.print_error(error));
});

module.exports = router;
