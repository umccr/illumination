const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const request_opts = illumina.request_opts();

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/regions";
  opts.params = qs;

  axios(opts)
    .then((response) => {
      res.render("dcs/regions", {
        regions: response.data,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      });
    })
    .catch((error) => utils.print_error(error));
});

module.exports = router;
