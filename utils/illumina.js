const yaml = require("js-yaml"),
  fs = require("fs"),
  path = require("path"),
  os = require("os");

const base_url = "https://aps2.platform.illumina.com/v1";

const id2username = function (id) {
  let username = {
    "567d89e4-de8b-3688-a733-d2a979eb510e": "PD_uni",
    "bd68e368-7587-3e22-a30e-9a2e1714b7c1": "PD",
    "7eec7332-f780-3edc-bb70-c4f711398f1c": "FR_uni",
    "6039c53c-d362-3dd6-9294-46f08d8994ff": "FR",
    "1678890e-b107-3974-a47d-0bb532a64ad6": "RV_uni",
    "9c925fa3-9b93-3f14-92a3-d35488ab1cc4": "RV",
    "8abf754b-e94f-3841-b44b-75d10d33588b": "SK_uni",
    "d24913a8-676f-39f3-9250-7cf22fbc48c8": "SK",
    "c9688651-7872-3753-8146-ffa41c177aa1": "VSav_uni",
    "590dfb6c-6e4f-3db8-9e23-2d1039821653": "VSav",
    "57a99faa-ae79-33f8-9736-454a36b06a43": "SU",
    "46258763-7c48-3a1c-8c5f-04003bf74e5a": "AL_uni",
    "b2f0ff65-c77b-37bc-af87-68a89c2f8d27": "AL",
    "6696900a-96ea-372a-bc00-ca6bbe19bf7b": "Kym",
    "ef928f99-662d-3e9f-8476-303131e9a58a": "Karey",
    "a46c2704-4568-3a39-b934-45bc9b352ac8": "Voula",
    "3ed6bc8a-ba5a-3ec3-9e25-361703c7ba20": "Egan_Illum",
    "aa9f1c02-3963-3c3b-ad0d-9b6f6e26a405": "Pratik_Illum",
    "7bc5755d-b316-3e7f-b25a-549f7015c142": "Pratik_Illum?",
    "e3c89a8a-23a7-36cf-a1dc-281d96ed1aab": "Yinan_Illum",
    "e44e09eb-60c7-3a0f-9313-46f7454ede92": "Andrei_Illum",
    "290ed655-8d6f-3bce-b850-1f8673ddd6a6": "Charles_Illum",
    "41fc4571-741c-386e-be44-cf9ae7313f53": "VLin",
  };
  return username[id];
};

const token = (function () {
  console.log("Loading ICA token");
  let token;
  token = process.env.ICA_ACCESS_TOKEN;
  if (token) {
    console.log("Using token from ENV");
  } else {
    try {
      let session_file = path.join(os.homedir(), ".ica/.session.aps2.yaml");
      token = yaml.load(fs.readFileSync(session_file, "utf8"));
      token = token["access-token"];
    } catch (e) {
      console.log(e);
    }
    console.log("Using token from session file");
  }
  return token;
})();

const request_opts = function () {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    baseURL: base_url,
  };
};

const total_period_usage = function (periods) {
  let arr = [];
  for (let p = 0; p < periods.length; p++) {
    let x = periods[p];
    // let pn = x["periodName"];
    let ps = x["start"];
    let pe = x["end"];
    let tot = x["totalUsages"];

    for (let i = 0; i < tot.length; i++) {
      tot.forEach((t) => {
        arr.push({
          // periodName: pn,
          periodStart: ps,
          periodEnd: pe,
          type: t["type"],
          amount: `${t["amount"]} ${t["unit"]}`,
        });
      });
    }
  }
  return arr;
};

const user_aggregated_period_usage = function (periods) {
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
          periodEnd: pe,
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
  user_aggregated_period_usage: user_aggregated_period_usage,
};
