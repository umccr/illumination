const request = require("request"),
  path = require("path"),
  os = require("os"),
  utils = require("../../utils/utils"),
  illumina = require("../../utils/illumina");

const token = illumina.read_iap_token(
  path.join(os.homedir(), ".iap/.session.yaml")
);

let options = {
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  },
  baseUrl: illumina.base_url,
  json: true
};

// GET /tasks
// let opts = options;
// opts.url = "/tasks";
// opts.qs = {
//   pageSize: 3,
//   sort: "timeCreated desc"
// };

// request.get(opts, (error, response, body) => {
//   if (!error && response.statusCode == 200) {
//     console.log(body);
//   } else {
//     utils.print_error(error);
//   }
// });

// POST /tasks
// let opts = options;
// opts.url = "/tasks";

// opts.body = {
//   name: "TES_test1",
//   description: "Testing TES",
//   taskVersions: [
//     {
//       version: "v1",
//       execution: {
//         image: {
//           name: "{{ImageName}}",
//           tag: "{{ImageTag}}"
//         },
//         command: "bash",
//         args: ["-c", "{{Args}}"],
//         outputs: [
//           {
//             path: "/var/log/tessystemlogs",
//             url: "gds://teslogs/peterLogs"
//           }
//         ],
//         resources: {
//           type: "standard",
//           size: "small"
//         }
//       }
//     }
//   ]
// };

// request.post(opts, (error, response, body) => {
//   if (!error && response.statusCode == 201) {
//     console.log(body);
//   } else {
//     utils.print_error(error);
//   }
// });

// POST /tasks/<taskid>/versions/<versionid>:launch
let opts = options;
opts.url = "/tasks/tdn.2bc8bc193af844689103e276600d2fda/versions/tvn.356952145c0a4e47bb6fc65b77a2bda8:launch";
opts.body = {
  "name": "TES_test1",
  "description": "Testing TES",
  "arguments": {
      "ImageName":"ubuntu",
      "ImageTag": "latest",
      "Args": "sleep 20"
  }
}

request.post(opts, (error, response, body) => {
  if (!error && response.statusCode == 201) {
    console.log(body);
  } else {
    utils.print_error(error);
  }
});
