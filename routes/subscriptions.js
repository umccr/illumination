const express = require("express");
const router = express.Router();
const request = require("request");
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const request_opts = illumina.request_opts();

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/subscriptions";
  opts.qs = qs;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("ens/subscriptions", {
        subscriptions: body,
        id2username: illumina.id2username,
        format_date: utils.format_date
      });
    } else {
      utils.print_error(error);
    }
  });
});

router.get("/:subscriptionid", (req, res) => {
  let opts = request_opts;
  const subid = req.params.subscriptionid;
  opts.url = `/subscriptions/${subid}`;

  request.get(opts, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.render("ens/subscriptionid", {
        sub_info: body,
        subid: subid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight
      });
    } else {
      utils.print_error(error);
    }
  });
});

module.exports = router;
