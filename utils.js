format_date = function(date) {
    // remove milliseconds
    let d = new Date(Date.parse(date));
    return d.toISOString().split('.')[0]+"Z";
}

module.exports = {
    format_date: format_date
}