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
  opts.url = "/folders";
  opts.params = qs;

  axios(opts)
    .then((response) => {
      // res.send(response.data);
      res.render("gds/folders", {
        folders: response.data,
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

router.get("/:folderid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const folderid = req.params.folderid;
  opts.url = `/folders/${folderid}`;
  opts.params = qs;

  axios(opts)
    .then((response) => {
      // res.send(response.data);
      res.render("gds/folderid", {
        finfo: response.data,
        folderid: folderid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      });
    })
    .catch((error) => utils.print_error(error));
});

module.exports = router;
