const express = require("express");
const router = express.Router();
const request = require("request");
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const request_opts = illumina.request_opts();

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/workflows";
  opts.qs = qs;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("wes/workflows", {
        wflows: body,
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
  let qs = req.query;
  opts.url = "/workflows/runs";
  opts.qs = qs;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("wes/workflowruns", {
        wruns: body,
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
  let qs = req.query;
  const runid = req.params.runid;
  opts.url = `/workflows/runs/${runid}`;
  opts.qs = qs;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("wes/workflowrunid", {
        wrun_info: body,
        runid: runid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight
      });
    } else {
      utils.print_error(error);
    }
  });
});

router.get("/runs/:runid/history", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const runid = req.params.runid;
  opts.url = `/workflows/runs/${runid}/history`;
  opts.qs = qs;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("wes/workflowrunhistory", {
        history: body,
        runid: runid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight
      });
    } else {
      utils.print_error(error);
    }
  });
});

router.get("/versions", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/workflows/versions";
  opts.qs = qs;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("wes/workflowversionsall", {
        versions: body,
        id2username: illumina.id2username,
        format_date: utils.format_date
      });
    } else {
      utils.print_error(error);
    }
  });
});

router.get("/signals", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/workflows/signals";
  opts.qs = qs;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("wes/workflowsignals", {
        signals: body,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight
      });
    } else {
      utils.print_error(error);
    }
  });
});

router.get("/signals/:signalid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const signalid = req.params.signalid;
  opts.url = `/workflows/signals/${signalid}`;
  opts.qs = qs;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("wes/workflowsignalid", {
        signal: body,
        signalid: signalid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight
      });
    } else {
      utils.print_error(error);
    }
  });
});

router.get("/:workflowid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const wflowid = req.params.workflowid;
  opts.url = `/workflows/${wflowid}`;
  opts.qs = qs;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("wes/workflowid", {
        wflow_info: body,
        wflowid: wflowid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight
      });
    } else {
      utils.print_error(error);
    }
  });
});

router.get("/:workflowid/versions", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const workflowid = req.params.workflowid;
  opts.url = `/workflows/${workflowid}/versions`;
  opts.qs = qs;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      // res.send(body);
      res.render("wes/workflowversions", {
        versions: body,
        workflowid: workflowid,
        id2username: illumina.id2username,
        format_date: utils.format_date
      });
    } else {
      utils.print_error(error);
    }
  });
});

router.get("/:workflowid/versions/:versionid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const workflowid = req.params.workflowid;
  const versionid = req.params.versionid;
  opts.url = `/workflows/${workflowid}/versions/${versionid}`;
  opts.qs = qs;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("wes/workflowversionbody", {
        workflowid: workflowid,
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
