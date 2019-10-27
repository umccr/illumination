const express = require('express');
const request = require('request');

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("home"));

app.get("/tasks", (req, res) => {
    res.send("You're getting a list of all tasks!");
});

app.get("/tasks/runs", (req, res) => {
    res.send("You're getting list of task runs!");
});

app.get("/tasks/:taskid", (req, res) => {
    const taskid = req.params.taskid;
    res.send("You're getting details for task " + taskid + "!");
});

app.get("/tasks/runs/:runid", (req, res) => {
    const runid = req.params.runid;
    res.send("You're getting details for task run " + runid + "!");
});


// app.get("/tes/tasks", (req, res) => {
//     const query = req.query.name;
//     console.log(query);
//     const url = 'https://aps2.platform.illumina.com/v1/tasks'
//     // const url = `http://omdbapi.com/?s=${query}&apikey=thewdb`
//     request(url, (error, response, body) => {
//         // if (!error && response.statusCode == 200) {
//             // const data = JSON.parse(body);
//             // res.render("results", {data: data});
//         // }
//     });
// });




app.get("*", (req, res) => {
    res.send("You're a STAR!");
});


app.listen(port, () => {
    console.log("Server listening at http://localhost:3000");
});
