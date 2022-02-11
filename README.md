# Illumination

**IMPORTANT**: The `main` branch of this repo currently handles **ICA V1**.
For **ICA V2**, see the [v2 branch](https://github.com/umccr/illumination/tree/v2).

- Open <http://localhost:3000>


## TOC

* [Installation](#installation)
* [Running](#running)
    * [Updating](#updating)
* [Features](#features)
    * [Display JSON of Workflow Version Definitions](#display-json-of-workflow-version-definitions)
    * [Display Summarised JSON Information In Tables](#display-summarised-json-information-in-tables)
* [Docker](#docker)
    * [Using Docker](#using-docker)
    * [Docker Shortcuts](#docker-shortcuts)
* [Developer Notes](#developer-notes)
    * [Adding new endpoints](#adding-new-endpoints)
    * [Resources](#resources)
* [Routes Supported](#routes-supported)

Node.js Express app that interacts with the Illumina Connected Analytics (ICA) API.
Supports only `GET` endpoints.

<img src="https://i.postimg.cc/fydrbjbK/illumination-home.png" alt="illumination home" height="500">

## Installation

**Step 1**: Install `Node.js` from <https://nodejs.org/en/download> if not already done.

e.g.:

```bash
brew install node

# check that it works
node --version
```

**Step 2**: Clone `illumination` repo and install dependencies
(should take a minute max).

```bash
git clone https://github.com/umccr/illumination
cd illumination
npm install
```

## Running

```bash
npm start
```

- `Ctrl+C` to stop

### Updating

Pull latest code changes and install/update newer dependencies:

```bash
cd illumination
git pull
npm install
```

## Features

### Display JSON of Workflow Version Definitions

<img src="https://i.postimg.cc/7Z40dMrk/workflow-definition-json.png" alt="workflow run table" height="500">

### Display Summarised JSON Information In Tables

<img src="https://i.postimg.cc/26SY3Jpx/workflow-run-table.png" alt="workflow run table" height="500">

## Docker

### Using Docker

```bash
# build the image
docker build -t victorskl/illumination:latest .

# set your ICA access token
export ICA_ACCESS_TOKEN='...'
# run the container
docker run --rm --env ICA_ACCESS_TOKEN -p 3000:3000 victorskl/illumination:latest
```

### Docker Shortcuts

For convenience, enter the following into your `~/.bashrc`. Then you can
simply type `run_illumination` in order to run the illumination docker command.

```bash
# ICA access token
if [[ -f ~/.ica/.session.aps2.yaml ]]; then
        export ICA_ACCESS_TOKEN=$(cat ~/.ica/.session.aps2.yaml | {
                             grep '^access-token: '
                           } | {
                             cut -d' ' -f2
                           })
fi

# ILLUMINATION ALIAS
alias run_illumination="docker run --rm -i -t --env ICA_ACCESS_TOKEN --publish 3000:3000 victorskl/illumination:latest"
```

> Note: there can be many variations on how you would like to automate ICA token generation then launch illumination into a specific ICA project context. i.e., bash-ing, alias-ing, zZZ-ing, etc... See relevant [wiki entry](https://github.com/umccr/wiki/tree/master/computing/cloud/illumina) and/or https://github.com/umccr/ica-ica-lazy for more pointers.

## Developer Notes

### Adding new endpoints

Check out how to add/edit endpoints via the following commits:

- `/workgroups` endpoint [commit](https://github.com/umccr/illumination/commit/8c66dbbd193625db365b20e0f5017608bf82e555)
- `/tokens/details` endpoint [commit](https://github.com/umccr/illumination/commit/bf02c9e908f0e481b7f12c68e9a29a292e180fbd)

### Resources

- Express.js: <https://expressjs.com/>
- EJS: <https://ejs.co/>
- axios: <https://github.com/axios/axios>

## Routes Supported

```js
// See app.js
const listEndpoints = require("express-list-endpoints");
console.log(listEndpoints(app));

[
  { path: '/', methods: [ 'GET' ] },
  { path: '/tasks', methods: [ 'GET' ] },
  { path: '/tasks/runs', methods: [ 'GET' ] },
  { path: '/tasks/runs/:runid', methods: [ 'GET' ] },
  { path: '/tasks/:taskid', methods: [ 'GET' ] },
  { path: '/tasks/:taskid/versions', methods: [ 'GET' ] },
  { path: '/tasks/:taskid/versions/:versionid', methods: [ 'GET' ] },
  { path: '/workflows', methods: [ 'GET' ] },
  { path: '/workflows/runs', methods: [ 'GET' ] },
  { path: '/workflows/runs/:runid', methods: [ 'GET' ] },
  { path: '/workflows/runs/:runid/history', methods: [ 'GET' ] },
  { path: '/workflows/versions', methods: [ 'GET' ] },
  { path: '/workflows/versions/:versionid', methods: [ 'GET' ] },
  { path: '/workflows/signals', methods: [ 'GET' ] },
  { path: '/workflows/signals/:signalid', methods: [ 'GET' ] },
  { path: '/workflows/:workflowid', methods: [ 'GET' ] },
  { path: '/workflows/:workflowid/versions', methods: [ 'GET' ] },
  { path: '/workflows/:workflowid/versions/:versionid', methods: [ 'GET' ] },
  { path: '/usages', methods: [ 'GET' ] },
  { path: '/health', methods: [ 'GET' ] },
  { path: '/regions', methods: [ 'GET' ] },
  { path: '/files', methods: [ 'GET' ] },
  { path: '/files/:fileid', methods: [ 'GET' ] },
  { path: '/folders', methods: [ 'GET' ] },
  { path: '/folders/:folderid', methods: [ 'GET' ] },
  { path: '/volumes', methods: [ 'GET' ] },
  { path: '/volumes/:volumeid', methods: [ 'GET' ] },
  { path: '/subscriptions', methods: [ 'GET' ] },
  { path: '/subscriptions/:subscriptionid', methods: [ 'GET' ] },
  { path: '/tokens/details', methods: [ 'GET' ] },
  { path: '/workgroups', methods: [ 'GET' ] },
  { path: '/projects', methods: [ 'GET' ] },
  { path: '*', methods: [ 'GET' ] }
];
```
