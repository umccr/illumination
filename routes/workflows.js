const express = require("express");
const router = express.Router();
const request = require("request");
const illumina = require("../utils/illumina");
const utils = require("../utils/utils")
const pageSize = 100;
const request_opts = illumina.request_opts();

router.get("/", (req, res) => {
  let opts = request_opts;
  opts.url = "/workflows";
  opts.qs = {
    pageSize: pageSize,
    sort: "timeCreated desc"
  };

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
  opts.url = "/workflows/runs";
  opts.qs = {
    pageSize: pageSize,
    sort: "timeCreated desc"
  };

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
  const runid = req.params.runid;
  opts.url = `/workflows/runs/${runid}`;

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
  const runid = req.params.runid;
  opts.url = `/workflows/runs/${runid}/history`;
  opts.qs = {
    pageSize: pageSize,
    sort: "eventId asc"
  };

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
  opts.url = "/workflows/versions";
  opts.qs = {
    pageSize: pageSize,
    sort: "timeCreated desc"
  };

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

router.get("/:workflowid", (req, res) => {
  let opts = request_opts;
  const wflowid = req.params.workflowid;
  opts.url = `/workflows/${wflowid}`;

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
  const workflowid = req.params.workflowid;
  opts.url = `/workflows/${workflowid}/versions`;

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
  const workflowid = req.params.workflowid;
  const versionid = req.params.versionid;
  opts.url = `/workflows/${workflowid}/versions/${versionid}`;

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