const express = require("express");
const router = express.Router();
const axios = require("axios").default;
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const request_opts = illumina.request_opts();

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/subscriptions";
  opts.params = qs;

  axios(opts)
    .then((response) => {
      // res.send(response.data);
      res.render("ens/subscriptions", {
        subscriptions: response.data,
        id2username: illumina.id2username,
        format_date: utils.format_date,
      });
    })
    .catch((error) => utils.print_error(error));
});

router.get("/:subscriptionid", (req, res) => {
  let opts = request_opts;
  const subid = req.params.subscriptionid;
  opts.url = `/subscriptions/${subid}`;

  axios(opts)
    .then((response) => {
      res.render("ens/subscriptionid", {
        sub_info: response.data,
        subid: subid,
        jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      });
    })
    .catch((error) => utils.print_error(error));
});

module.exports = router;
