const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const request_opts = illumina.request_opts();

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/volumes";
  opts.params = qs;

  axios(opts)
    .then((response) => {
      // res.send(response.data);
      res.render("gds/volumes", {
        volumes: response.data,
        id2username: illumina.id2username,
        format_date: utils.format_date,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/:volumeid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const volid = req.params.volumeid;
  opts.url = `/volumes/${volid}`;
  opts.params = qs;

  axios(opts)
    .then((response) => {
      res.render("gds/volumeid", {
        vinfo: response.data,
        volid: volid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      });
    })
    .catch((error) => utils.print_error(error));
});

module.exports = router;
