const express = require("express");
const router = express.Router();
const request = require("request");
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const pageSize = 1000;
const request_opts = illumina.request_opts();

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/files";
  opts.qs = qs;
  opts.qs.pageSize = pageSize;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("gds/files", {
        files: body,
        vname: opts.qs["volume.name"],
        id2username: illumina.id2username,
        format_date: utils.format_date,
        format_bytes: utils.format_bytes
      });
    } else {
      utils.print_error(error);
    }
  });
});

router.get("/:fileid", (req, res) => {
  let opts = request_opts;
  const fileid = req.params.fileid;
  opts.url = `/files/${fileid}`;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("gds/fileid", {
        finfo: body,
        fileid: fileid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight
      });
    } else {
      utils.print_error(error);
    }
  });
});

module.exports = router;
