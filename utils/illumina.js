const yaml = require("js-yaml"),
  fs = require("fs"),
  path = require("path"),
  os = require("os");

const id2username = function(id) {
  let username = {
    "567d89e4-de8b-3688-a733-d2a979eb510e": "PD",
    "7eec7332-f780-3edc-bb70-c4f711398f1c": "FR",
    "1678890e-b107-3974-a47d-0bb532a64ad6": "RV",
    "8abf754b-e94f-3841-b44b-75d10d33588b": "SK_old",
    "d24913a8-676f-39f3-9250-7cf22fbc48c8": "SK",
    "c9688651-7872-3753-8146-ffa41c177aa1": "VS",
    "57a99faa-ae79-33f8-9736-454a36b06a43": "SU",
    "6696900a-96ea-372a-bc00-ca6bbe19bf7b": "Kym",
    "ef928f99-662d-3e9f-8476-303131e9a58a": "Karey",
    "3ed6bc8a-ba5a-3ec3-9e25-361703c7ba20": "Egan-Illumina",
    "b2f0ff65-c77b-37bc-af87-68a89c2f8d27": "AL",
    "46258763-7c48-3a1c-8c5f-04003bf74e5a": "AL_old"
  };

  return username[id];
};

const base_url = "https://aps2.platform.illumina.com/v1";

const token = (function() {
  console.log("Loading IAP token");
  let token;
  token = process.env.IAP_TOKEN;
  if (token) {
    console.log("Using token from ENV");
  } else {
    try {
      var session_file = path.join(os.homedir(), ".iap/.session.yaml");
      token = yaml.safeLoad(fs.readFileSync(session_file, "utf8"));
      token = token["access-token"];
    } catch (e) {
      console.log(e);
    }
    console.log("Using token from session file");
  }
  return token;
})();

const request_opts = function() {
  // const base_url = module.exports.base_url;
  // const t = module.exports.token;
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    baseUrl: base_url,
    json: true
  };
};

const total_period_usage = function(periods) {
  let arr = [];
  for (let p = 0; p < periods.length; p++) {
    let x = periods[p];
    // let pn = x["periodName"];
    let ps = x["start"];
    let pe = x["end"];
    let tot = x["totalUsages"];

    for (let i = 0; i < tot.length; i++) {
      tot.forEach(t => {
        arr.push({
          // periodName: pn,
          periodStart: ps,
          periodEnd: pe,
          type: t["type"],
          amount: `${t["amount"]} ${t["unit"]}`
        });
      });
    }
  }
  return arr;
};

const user_aggregated_period_usage = function(periods) {
  let arr = [];
  for (let p = 0; p < periods.length; p++) {
    let x = periods[p];
    // let pn = x["periodName"];
    let ps = x["start"];
    let pe = x["end"];
    let users = x["userAggregatedUsages"];

    for (let i = 0; i < users.length; i++) {
      for (let y = 0; y < users[i]["usages"].length; y++) {
        arr.push({
          userFullName: users[i]["user"]["fullName"],
          userName: users[i]["user"]["userName"],
          type: users[i]["usages"][y]["type"],
          amount: `${users[i]["usages"][y]["amount"]} ${users[i]["usages"][y]["unit"]}`,
          // periodName: pn,
          periodStart: ps,
          periodEnd: pe
        });
      }
    }
  }
  return arr;
};

module.exports = {
  token: token,
  base_url: base_url,
  request_opts: request_opts,
  id2username: id2username,
  total_period_usage: total_period_usage,
  user_aggregated_period_usage: user_aggregated_period_usage
};
