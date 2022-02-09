const id2username = function (id) {
  let username = {
    "b2f0ff65-c77b-37bc-af87-68a89c2f8d27": "AL",
    "5dc7d7be-4a3f-3f85-a558-6bfb2096b696": "OH",
    "6039c53c-d362-3dd6-9294-46f08d8994ff": "FR",
    "d24913a8-676f-39f3-9250-7cf22fbc48c8": "SK",
    "bd68e368-7587-3e22-a30e-9a2e1714b7c1": "PD",
    "c1bd420d-3ff7-3c69-aa3e-e00e4c4529d2": "AS",
    "41fc4571-741c-386e-be44-cf9ae7313f53": "VLin",
    "436162b8-6e28-3173-9cdf-665ee95e3d89": "AF",

    "9c925fa3-9b93-3f14-92a3-d35488ab1cc4": "RV",
    "57a99faa-ae79-33f8-9736-454a36b06a43": "SU",
    "6696900a-96ea-372a-bc00-ca6bbe19bf7b": "Kym",
    "ef928f99-662d-3e9f-8476-303131e9a58a": "Karey",
    "a46c2704-4568-3a39-b934-45bc9b352ac8": "Voula",
    "aa9f1c02-3963-3c3b-ad0d-9b6f6e26a405": "Pratik_Illum",
    "7bc5755d-b316-3e7f-b25a-549f7015c142": "Pratik_Illum?",
    "e3c89a8a-23a7-36cf-a1dc-281d96ed1aab": "Yinan_Illum",
    "290ed655-8d6f-3bce-b850-1f8673ddd6a6": "Charles_Illum",
    "bc70451e-72c1-3956-80a9-00da82865d11": "HM",
    "877a7b1e-c57e-37d5-ab81-dbaba8577414": "SW",
    "bc99b89c-3bb7-334b-80d1-20ef9e65f0b0": "🤖"
  };
  return username[id];
};

module.exports = {
    id2username: id2username
}
