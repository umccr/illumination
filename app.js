const express = require("express"),
  app = express(),
  path = require("path");

const indexRouter = require("./routes/index"),
  projectsRouter = require("./routes/projects"),
  analysisStoragesRouter = require("./routes/analysisstorages"),
  usersRouter = require("./routes/users"),
  bundlesRouter = require("./routes/bundles"),
  workgroupsRouter = require("./routes/workgroups"),
  regionsRouter = require("./routes/regions"),
  samplesRouter = require("./routes/samples"),
  pipelinesRouter = require("./routes/pipelines"),
  metadatamodelsRouter = require("./routes/metadatamodels"),
  connectorsRouter = require("./routes/connectors");
// const listEndpoints = require("express-list-endpoints");

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/projects", projectsRouter);
app.use("/analysisStorages", analysisStoragesRouter);
app.use("/users", usersRouter);
app.use("/bundles", bundlesRouter);
app.use("/workgroups", workgroupsRouter);
app.use("/regions", regionsRouter);
app.use("/samples", samplesRouter);
app.use("/pipelines", pipelinesRouter);
app.use("/metadatamodels", metadatamodelsRouter);
app.use("/connectors", connectorsRouter);

app.get("*", (req, res) => {
  res.status(404).render("404");
});

// console.log(listEndpoints(app));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
