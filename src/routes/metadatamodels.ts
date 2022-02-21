import express from "express";
const router = express.Router();
const axios = require("axios").default;
const illumina = require("../utils/illumina");
const utils = require("../utils/utils");
const request_opts = illumina.request_opts();

router.get("/", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  opts.url = "/metadataModels";
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      // res.send(response.data);
      res.render("metadatamodels/metadatamodels", {
       data: response.data,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:metadatamodelid", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const metadatamodelid = req.params.metadatamodelid;
  opts.url = `/metadataModels/${metadatamodelid}`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      // res.send(response.data);
      res.render("metadatamodels/metadatamodelid", {
       data: response.data,
       metadatamodelid: metadatamodelid,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

router.get("/:metadatamodelid/fields", (req, res) => {
  let opts = request_opts;
  let qs = req.query;
  const metadatamodelid = req.params.metadatamodelid;
  opts.url = `/metadataModels/${metadatamodelid}/fields`;
  opts.params = qs;
  axios(opts)
    .then((response: any) => {
      // res.send(response.data);
      res.render("metadatamodels/metadatamodelfields", {
       data: response.data,
       metadatamodelid: metadatamodelid,
       jsonSyntaxHighlight: utils.jsonSyntaxHighlight,
       });
    })
    .catch((error: Error) => utils.print_error(error));
});

module.exports = router;
