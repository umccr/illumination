const chalk = require("chalk");
const dayjs = require("dayjs");

// dayjs uses the local time by default
const format_date = function (date) {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss ZZ");
};

const print_error = function (e) {
  console.error(chalk.red(`THERE WAS AN ERROR \n${e}`));
};

// https://stackoverflow.com/questions/4810841/how-can-i-pretty-print-json-using-javascript
const jsonSyntaxHighlight = function (json) {
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number_pre";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key_pre";
        } else {
          cls = "string_pre";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean_pre";
      } else if (/null/.test(match)) {
        cls = "null_pre";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
};

// https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript/18650828/#18650828
function format_bytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

module.exports = {
  format_date: format_date,
  format_bytes: format_bytes,
  print_error: print_error,
  jsonSyntaxHighlight: jsonSyntaxHighlight,
};
