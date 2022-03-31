# Illumination

**IMPORTANT**: The `main` branch of this repo currently handles **ICA V1**.
For **ICA V2**, see the [v2 branch](https://github.com/umccr/illumination/tree/v2).


<!-- vim-markdown-toc GFM -->

* [Installation](#installation)
* [Running](#running)
    * [Updating](#updating)
* [Features](#features)
    * [Display JSON of Workflow Version Definitions](#display-json-of-workflow-version-definitions)
    * [Display Summarised JSON Information In Tables](#display-summarised-json-information-in-tables)
* [Developer Notes](#developer-notes)
    * [Adding new endpoints](#adding-new-endpoints)
    * [Resources](#resources)
* [Routes Supported](#routes-supported)

<!-- vim-markdown-toc -->

Node.js Express app that interacts with the Illumina Connected Analytics (ICA) API.
Supports only `GET` endpoints.

<img src="https://i.postimg.cc/qvs1pRfJ/illumination-v2-home.png" alt="illumination home" height="500">

## Installation

**Step 1**: Install `Node.js` from <https://nodejs.org/en/download> if not already done.

e.g.:

```bash
brew install node

# check that it works
node --version
# v17.4.0
```

**Step 2**: Clone `illumination` repo (v2 branch) and install dependencies
(should take a minute max).

```bash
git clone https://github.com/umccr/illumination/tree/v2
cd illumination
npm install
```

**Step 3**: Check your ICAV2 environment variables:

```text
export ICAV2_ACCESS_TOKEN=`cat ~/.icav2/.session.ica.yaml | grep access-token | sed -e 's/access-token: //'`
# export ICAV2_SERVER_URL="ica.illumina.com" # this is hardcoded as a fallback
```

You can also use a `.env` file with your environment variables for convenience - see <https://github.com/motdotla/dotenv>

**Step 4** (Optional): Adjust the `utils/id2username.json` for better mapping of User IDs to User names.

## Running

```bash
npm start
# npm run devstart # for development
```

Open browser to <http://localhost:3000>.

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

(ICA v1)

<img src="https://i.postimg.cc/7Z40dMrk/workflow-definition-json.png" alt="workflow run table" height="500">

### Display Summarised JSON Information In Tables

(ICA v1)

<img src="https://i.postimg.cc/26SY3Jpx/workflow-run-table.png" alt="workflow run table" height="500">

## Developer Notes

### Adding new endpoints

Check out how to add/edit endpoints via the following commits:

- `/workgroups` endpoint [commit](https://github.com/umccr/illumination/commit/8c66dbbd193625db365b20e0f5017608bf82e555) (ICA v1).
- `/tokens/details` endpoint [commit](https://github.com/umccr/illumination/commit/bf02c9e908f0e481b7f12c68e9a29a292e180fbd) (ICA v1).

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
    '/projects',
    '/projects/:projectid',
    '/projects/:projectid/analyses'
    '/projects/:projectid/data',
    '/projects/:projectid/data/:dataid',
    '/projects/:projectid/analyses/:analysisid',
    '/projects/:projectid/analyses/:analysisid/steps',
    '/projects/:projectid/analyses/:analysisid/inputs',
    '/projects/:projectid/analyses/:analysisid/outputs',
    '/projects/:projectid/analyses/:analysisid/rawOutput',
    '/projects/:projectid/analyses/:analysisid/configurations',
    '/analysisStorages',
    '/users',
    '/bundles',
    '/workgroups',
    '/regions',
    '/samples',
    '/pipelines',
    '/pipelines/:pipelineid',
    '/metadatamodels',
    '/dataformats',
    '/eventcodes',
    '/eventlog',
    '/notificationchannels',
    '/storagebundles',
    '/storageconfigurations',
    '/storagecredentials',
    '/connectors',
];
```
