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
  opts.url = "/bundles";
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      // res.send(response.data);
      res.render("bundles/bundles", {
       data: response.data,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       id2username: id2username.id2username,
       format_date: utils.format_date,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:bundleid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const bundleid = req.params.bundleid;
  opts.url = `/bundles/${bundleid}`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("bundles/bundleid", {
       data: response.data,
       bundleid: bundleid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:bundleid/data", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const bundleid = req.params.bundleid;
  opts.url = `/bundles/${bundleid}/data`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
     // res.send(response.data);
      res.render("bundles/data", {
       data: response.data,
       bundleid: bundleid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       format_date: utils.format_date,
       format_bytes: utils.format_bytes,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

module.exports = router;
