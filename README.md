Illumination
============

- [Illumination](#illumination)
  - [Installation](#installation)
  - [Running](#running)
  - [Routes](#routes)

Node.js Express app that interacts with the Illumina Stratus API.
Currently supports most `GET` endpoints.

<img src="https://i.postimg.cc/9fxp6Vds/illumination-home.png" alt="illumination home" height="500">

Installation
------------

1. Install `Node.js` from <https://nodejs.org/en/download> if not already done

```bash
brew install node
```

```
# check version
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

Routes
------

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
  { path: '/subscriptions', methods: [ 'GET' ] },
  { path: '/subscriptions/:subscriptionid', methods: [ 'GET' ] },
  { path: '*', methods: [ 'GET' ] } ]
```
