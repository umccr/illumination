const express = require("express"),
  app = express(),
  path = require("path");

const indexRouter = require("./routes/index"),
  tasksRouter = require("./routes/tasks"),
  workflowsRouter = require("./routes/workflows"),
  usagesRouter = require("./routes/usages"),
  healthRouter = require("./routes/health"),
  regionsRouter = require("./routes/regions"),
  filesRouter = require("./routes/files"),
  foldersRouter = require("./routes/folders"),
  volumesRouter = require("./routes/volumes"),
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
app.use("/files", filesRouter);
app.use("/folders", foldersRouter);
app.use("/volumes", volumesRouter);
app.use("/subscriptions", subscriptionsRouter);

app.get("*", (req, res) => {
  res.status(404).render("404");
});

// console.log(listEndpoints(app));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
