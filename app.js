const express = require("express"),
  app = express(),
  path = require("path");

const indexRouter = require("./routes/index"),
  tasksRouter = require("./routes/tasks"),
  workflowsRouter = require("./routes/workflows"),
  usagesRouter = require("./routes/usages"),
  healthRouter = require("./routes/health"),
  regionsRouter = require("./routes/regions"),
  subscriptionsRouter = require("./routes/subscriptions");

// const listEndpoints = require('express-list-endpoints');

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/tasks", tasksRouter);
app.use("/workflows", workflowsRouter);
app.use("/usages", usagesRouter);
app.use("/health", healthRouter);
app.use("/regions", regionsRouter);
app.use("/subscriptions", subscriptionsRouter);

app.get("*", (req, res) => {
  res.send("Oooooops. Wrong URL!");
});

// console.log(listEndpoints(app));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
