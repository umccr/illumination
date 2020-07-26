const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const request_opts = illumina.request_opts();
const queryString = require("querystring");

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/files";
  opts.params = qs;

  axios(opts)
    .then((response) => {
      // res.send(response.data);
      res.render("gds/files", {
        files: response.data,
        queryString: queryString,
        qs: qs,
        vname: opts.params["volume.name"],
        id2username: illumina.id2username,
        format_date: utils.format_date,
        format_bytes: utils.format_bytes,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/:fileid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const fileid = req.params.fileid;
  opts.url = `/files/${fileid}`;
  opts.params = qs;

  axios(opts)
    .then((response) => {
      res.render("gds/fileid", {
        finfo: response.data,
        fileid: fileid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      });
    })
    .catch((error) => utils.print_error(error));
});

module.exports = router;
