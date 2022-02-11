const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const request_opts = illumina.request_opts();
const id2username = require("../utils/id2username");

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/pipelines";
  opts.params = qs;
  axios(opts)
    .then((response) => {
      // res.send(response.data);
      res.render("pipelines/pipelines", {
       data: response.data,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/:pipelineid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const pipelineid = req.params.pipelineid;
  opts.url = `/pipelines/${pipelineid}`;
  opts.params = qs;
  axios(opts)
    .then((response) => {
      // res.send(response.data);
      res.render("pipelines/pipelineid", {
       data: response.data,
       id2username: id2username.id2username,
       pipelineid: pipelineid,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error) => utils.print_error(error));
});

module.exports = router;
