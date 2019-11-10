format_date = function(date) {
    // remove milliseconds
    let d = new Date(Date.parse(date));
    return d.toISOString().split('.')[0]+"Z";
}

print_error = function(e) {
    console.log(`There was an error ${e}`);
}

module.exports = {
    format_date: format_date,
    print_error: print_error
}