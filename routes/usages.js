const express = require("express");
const router = express.Router();
const request = require("request");
const illumina = require("../utils/illumina");
const utils = require("../utils/utils")
const request_opts = illumina.request_opts();

router.get("/", (req, res) => {
  let opts = request_opts;
  opts.url = "/usages";
  opts.qs = {
    periods: 3
  };

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("usages/usages", {
        b: body,
        total_period_usage: illumina.total_period_usage,
        user_aggregated_period_usage: illumina.user_aggregated_period_usage
      });
    } else {
      utils.print_error(error);
    }
  });
});

module.exports = router;