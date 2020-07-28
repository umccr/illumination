# Illumination

- [Illumination](#illumination)
  - [Installation](#installation)
    - [Updating](#updating)
  - [Running](#running)
  - [Routes Supported](#routes-supported)
  - [Docker](#docker)
  - [Features](#features)
    - [Display JSON of Workflow Version Definitions](#display-json-of-workflow-version-definitions)
    - [Display Summarised JSON Information In Tables](#display-summarised-json-information-in-tables)

Node.js Express app that interacts with the Illumina Stratus API.
Currently supports only `GET` endpoints.

<img src="https://i.postimg.cc/fydrbjbK/illumination-home.png" alt="illumination home" height="500">

## Installation

**Step 1**: Install `Node.js` from <https://nodejs.org/en/download> if not already done.

e.g.:

```bash
brew install node

# check that it works
node --version
# v14.4.0
```

**Step 2**: Clone `illumination` repo and install dependencies
(should take around 10-20 seconds)

```bash
git clone https://github.com/umccr/illumination
cd illumination
npm install
```

### Updating

Pull latest code changes and install/update newer dependencies:

```bash
cd illumination
git pull
npm install
```

## Running

```bash
npm start # or node app.js
```

## Routes Supported

```js
[
  { path: "/", methods: ["GET"] },
  { path: "/tasks", methods: ["GET"] },
  { path: "/tasks/runs", methods: ["GET"] },
  { path: "/tasks/runs/:runid", methods: ["GET"] },
  { path: "/tasks/:taskid", methods: ["GET"] },
  { path: "/tasks/:taskid/versions", methods: ["GET"] },
  { path: "/tasks/:taskid/versions/:versionid", methods: ["GET"] },
  { path: "/workflows", methods: ["GET"] },
  { path: "/workflows/runs", methods: ["GET"] },
  { path: "/workflows/runs/:runid", methods: ["GET"] },
  { path: "/workflows/runs/:runid/history", methods: ["GET"] },
  { path: "/workflows/versions", methods: ["GET"] },
  { path: "/workflows/signals", methods: ["GET"] },
  { path: "/workflows/signals/:signalid", methods: ["GET"] },
  { path: "/workflows/:workflowid", methods: ["GET"] },
  { path: "/workflows/:workflowid/versions", methods: ["GET"] },
  { path: "/workflows/:workflowid/versions/:versionid", methods: ["GET"] },
  { path: "/usages", methods: ["GET"] },
  { path: "/health", methods: ["GET"] },
  { path: "/regions", methods: ["GET"] },
  { path: "/files", methods: ["GET"] },
  { path: "/files/:fileid", methods: ["GET"] },
  { path: "/volumes", methods: ["GET"] },
  { path: "/volumes/:volumeid", methods: ["GET"] },
  { path: "/subscriptions", methods: ["GET"] },
  { path: "/subscriptions/:subscriptionid", methods: ["GET"] },
  { path: "*", methods: ["GET"] },
];
```

## Docker

```bash
# build the image
docker build -t umccr/illumination:latest .

# set your IAP access token
export IAP_TOKEN='...'
# run the container
docker run --rm --env IAP_TOKEN -p 3000:3000 umccr/illumination:latest
```

For convenience, enter the following into your `~/.bashrc`. Then you can
simply type `run_illumination` in order to run the illumination docker command.

```bash
# IAP token
if [[ -f ~/.iap/.session.yaml ]]; then
        export IAP_TOKEN=$(cat ~/.iap/.session.yaml | {
                             grep '^access-token: '
                           } | {
                             cut -d' ' -f2
                           })
fi

# ILLUMINATION ALIAS
alias run_illumination="docker run --rm -i -t --env IAP_TOKEN --publish 3000:3000 umccr/illumination:latest"
```

## Features

### Display JSON of Workflow Version Definitions

<img src="https://i.postimg.cc/7Z40dMrk/workflow-definition-json.png" alt="workflow run table" height="500">

### Display Summarised JSON Information In Tables

<img src="https://i.postimg.cc/26SY3Jpx/workflow-run-table.png" alt="workflow run table" height="500">
