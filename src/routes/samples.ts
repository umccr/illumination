import express from "express";
const router = express.Router();
const axios = require("axios").default;
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const request_opts = illumina.request_opts();

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/samples?region=1efd315d-6309-4d7e-826b-d3824b0b5acb";
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      res.send(response.data);
      //res.render("samples", {
      // data: response.data,
      // jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
      // });
    })
    .catch((error: Error) => utils.print_error(error));
});

module.exports = router;
