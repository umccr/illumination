const express = require("express");
const router = express.Router();
const request = require("request");
const illumina = require("../utils/illumina");
const utils = require("../utils/utils")
const request_opts = illumina.request_opts();

router.get("/", (req, res) => {
  let opts = request_opts;
  opts.url = "/health";

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("health/health", {
        health: body,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight
      });
    } else {
      utils.print_error(error);
    }
  });
});

module.exports = router;