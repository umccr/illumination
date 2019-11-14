const yaml = require("js-yaml"),
  fs = require("fs");

const base_url = "https://aps2.platform.illumina.com/v1";

const id2username = function(id) {
  let username = {
    "567d89e4-de8b-3688-a733-d2a979eb510e": "PD",
    "7eec7332-f780-3edc-bb70-c4f711398f1c": "RV",
    "1678890e-b107-3974-a47d-0bb532a64ad6": "RV2",
    "8abf754b-e94f-3841-b44b-75d10d33588b": "SK",
    "c9688651-7872-3753-8146-ffa41c177aa1": "VS"
  };

  return username[id];
};

const read_iap_token = function(t) {
  let token;
  try {
    token = yaml.safeLoad(fs.readFileSync(t, "utf8"));
    token = token["access-token"];
  } catch (e) {
    console.log(e);
  }
  return token;
};

const total_period_usage = function(periods) {
  let arr = [];
  for (let p = 0; p < periods.length; p++) {
    let x = periods[p];
    let pn = x["periodName"];
    let ps = x["start"];
    let pe = x["end"];
    let tot = x["totalPeriodUsage"];

    for (let i = 0; i < tot.length; i++) {
      tot.forEach(t => {
        arr.push({
          periodName: pn,
          periodStart: ps,
          periodEnd: pe,
          product: t["productName"],
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
    let pn = x["periodName"];
    let ps = x["start"];
    let pe = x["end"];
    let users = x["userAggregatedUsage"];

    for (let i = 0; i < users.length; i++) {
      for (let y = 0; y < users[i]["productUsages"].length; y++) {
        arr.push({
          userFullName: users[i]["user"]["fullName"],
          userName: users[i]["user"]["userName"],
          productName: users[i]["productUsages"][y]["productName"],
          amount: users[i]["productUsages"][y]["amount"],
          periodName: pn,
          periodStart: ps,
          periodEnd: pe
        });
      }
    }
  }
  return arr;
};

module.exports = {
  read_iap_token: read_iap_token,
  base_url: base_url,
  id2username: id2username,
  total_period_usage: total_period_usage,
  user_aggregated_period_usage: user_aggregated_period_usage
};
