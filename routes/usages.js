const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const request_opts = illumina.request_opts();

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/usages";
  opts.params = qs;

  axios(opts)
    .then((response) => {
      res.render("dcs/usages", {
        b: response.data,
        total_period_usage: illumina.total_period_usage,
        user_aggregated_period_usage: illumina.user_aggregated_period_usage,
      });
    })
    .catch((error) => utils.print_error(error));
});

module.exports = router;
