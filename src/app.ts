import express from "express";
const app = express();
import path from "path";

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
  dataformatsRouter = require("./routes/dataformats"),
  eventcodesRouter = require("./routes/eventcodes"),
  eventlogRouter = require("./routes/eventlog"),
  notificationchannelsRouter = require("./routes/notificationchannels"),
  storagebundlesRouter = require("./routes/storagebundles"),
  storageconfigurationsRouter = require("./routes/storageconfigurations"),
  storagecredentialsRouter = require("./routes/storagecredentials"),
  connectorsRouter = require("./routes/connectors");
// const listEndpoints = require("express-list-endpoints");

const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "../views"));
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
app.use("/dataformats", dataformatsRouter);
app.use("/eventcodes", eventcodesRouter);
app.use("/eventlog", eventlogRouter);
app.use("/notificationchannels", notificationchannelsRouter);
app.use("/storagebundles", storagebundlesRouter);
app.use("/storageconfigurations", storageconfigurationsRouter);
app.use("/storagecredentials", storagecredentialsRouter);
app.use("/connectors", connectorsRouter);

app.get("*", (req, res) => {
  res.status(404).render("404");
});

// console.log(listEndpoints(app));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
