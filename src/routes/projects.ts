import express from "express";
const router = express.Router();
const axios = require("axios").default;
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const request_opts = illumina.request_opts();
const id2username = require("../utils/id2username");

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/projects";
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/projects", {
       data: response.data,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  opts.url = `/projects/${projectid}`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/projectid", {
       data: response.data,
       projectid: projectid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/analyses", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  opts.url = `/projects/${projectid}/analyses`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/analysis/analyses", {
       data: response.data,
       projectid: projectid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/base/jobs", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  opts.url = `/projects/${projectid}/base/jobs`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      res.send(response.data);
      // res.render("projects/base/jobs", {
      // data: response.data,
      // projectid: projectid,
      // id2username: id2username.id2username,
      // jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      // });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/base/tables", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  opts.url = `/projects/${projectid}/base/tables`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      res.send(response.data);
      // res.render("projects/base/tables", {
      //  data: response.data,
      //  projectid: projectid,
      //  id2username: id2username.id2username,
      //  jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      //  });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/data", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  opts.url = `/projects/${projectid}/data`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/data/data", {
       data: response.data,
       projectid: projectid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       format_bytes: utils.format_bytes,
       format_date: utils.format_date
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/data/:dataid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  const dataid = req.params.dataid;
  opts.url = `/projects/${projectid}/data/${dataid}`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/data/dataid", {
       data: response.data,
       projectid: projectid,
       dataid: dataid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/analyses/:analysisid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  const analysisid = req.params.analysisid;
  opts.url = `/projects/${projectid}/analyses/${analysisid}`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/analysis/analysisid", {
       data: response.data,
       projectid: projectid,
       analysisid: analysisid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/analyses/:analysisid/steps", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  const analysisid = req.params.analysisid;
  opts.url = `/projects/${projectid}/analyses/${analysisid}/steps`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/analysis/analysissteps", {
       data: response.data,
       projectid: projectid,
       analysisid: analysisid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/analyses/:analysisid/inputs", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  const analysisid = req.params.analysisid;
  opts.url = `/projects/${projectid}/analyses/${analysisid}/inputs`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/analysis/analysisinputs", {
       data: response.data,
       projectid: projectid,
       analysisid: analysisid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/analyses/:analysisid/outputs", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  const analysisid = req.params.analysisid;
  opts.url = `/projects/${projectid}/analyses/${analysisid}/outputs`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/analysis/analysisoutputs", {
       data: response.data,
       projectid: projectid,
       analysisid: analysisid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/analyses/:analysisid/rawOutput", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  const analysisid = req.params.analysisid;
  opts.url = `/projects/${projectid}/analyses/${analysisid}/rawOutput`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/analysis/analysisrawoutput", {
       data: response.data,
       projectid: projectid,
       analysisid: analysisid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/analyses/:analysisid/configurations", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  const analysisid = req.params.analysisid;
  opts.url = `/projects/${projectid}/analyses/${analysisid}/configurations`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/analysis/analysisconfigurations", {
       data: response.data,
       projectid: projectid,
       analysisid: analysisid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/permissions", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  opts.url = `/projects/${projectid}/permissions`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/permissions/permissions", {
       data: response.data,
       projectid: projectid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/permissions/:permissionid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  const permissionid = req.params.permissionid;
  opts.url = `/projects/${projectid}/permissions/${permissionid}`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/permissions/permissionid", {
       data: response.data,
       projectid: projectid,
       permissionid: permissionid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/pipelines", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  opts.url = `/projects/${projectid}/pipelines`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/pipelines/pipelines", {
       data: response.data,
       projectid: projectid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/pipelines/:pipelineid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  const pipelineid = req.params.pipelineid;
  opts.url = `/projects/${projectid}/pipelines/${pipelineid}`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/pipelines/pipelineid", {
       data: response.data,
       projectid: projectid,
       pipelineid: pipelineid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/notificationSubscriptions", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  opts.url = `/projects/${projectid}/notificationSubscriptions`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/subscriptions/subscriptions", {
       data: response.data,
       projectid: projectid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/customNotificationSubscriptions", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  opts.url = `/projects/${projectid}/customNotificationSubscriptions`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/subscriptions/customsubscriptions", {
       data: response.data,
       projectid: projectid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/bundles", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  opts.url = `/projects/${projectid}/bundles`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/bundles/bundles", {
       data: response.data,
       projectid: projectid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       format_bytes: utils.format_bytes,
       format_date: utils.format_date,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:projectid/bundles/:bundleid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const projectid = req.params.projectid;
  const bundleid = req.params.bundleid;
  opts.url = `/projects/${projectid}/bundles/${bundleid}`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("projects/bundles/bundleid", {
       data: response.data,
       projectid: projectid,
       bundleid: bundleid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

module.exports = router;
