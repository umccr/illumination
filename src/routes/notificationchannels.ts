import express from "express";
const router = express.Router();
const axios = require("axios").default;
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const request_opts = illumina.request_opts();
const id2username = require("../utils/id2username");

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/notificationChannels";
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      // res.send(response.data);
      res.render("notificationchannels/channels", {
       data: response.data,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       format_date: utils.format_date,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:channelid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const channelid = req.params.channelid;
  opts.url = `/notificationChannels/${channelid}`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      //res.send(response.data);
      res.render("notificationchannels/channelid", {
       data: response.data,
       channelid: channelid,
       id2username: id2username.id2username,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});


module.exports = router;
