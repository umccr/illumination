Illumination
============

- [Illumination](#illumination)
  - [Installation](#installation)
  - [Running](#running)
  - [Routes Supported](#routes-supported)

Node.js Express app that interacts with the Illumina Stratus API.
Currently supports only `GET` endpoints.

<img src="https://i.postimg.cc/JzWnLPZj/illumination-home.png" alt="illumination home" height="500">

Installation
------------

1. Install `Node.js` from <https://nodejs.org/en/download> if not already done.

e.g.:

```bash
brew install node
```

```
# check that it works
$ node --version
v11.6.0
```

2. Clone `illumination` repo and install dependencies

```bash
git clone https://github.com/umccr/illumination
cd illumination
npm install
```

Running
-------

```bash
npm start
```

Or

```bash
node app.js
```

Routes Supported
----------------

```js
[ { path: '/', methods: [ 'GET' ] },
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
  { path: '/volumes', methods: [ 'GET' ] },
  { path: '/volumes/:volumeid', methods: [ 'GET' ] },
  { path: '/subscriptions', methods: [ 'GET' ] },
  { path: '/subscriptions/:subscriptionid', methods: [ 'GET' ] },
  { path: '*', methods: [ 'GET' ] } ]
```
