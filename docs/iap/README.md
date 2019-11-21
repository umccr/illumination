IAP Documentation Notes
=======================

- [IAP Documentation Notes](#iap-documentation-notes)
  - [Tasks](#tasks)
    - [Create Task (`POST /tasks`)](#create-task-post-tasks)
    - [Create and Launch Task Run (`POST /tasks/runs`)](#create-and-launch-task-run-post-tasksruns)
    - [Create Task Version (`POST /tasks/<taskid>/versions`)](#create-task-version-post-taskstaskidversions)
    - [Launch Task Version (`POST /tasks/<taskid>/versions/<versionid>:launch`)](#launch-task-version-post-taskstaskidversionsversionidlaunch)
  - [Workflows](#workflows)
    - [Create Workflow (`POST /workflows`)](#create-workflow-post-workflows)
    - [Create Workflow Version (`POST /workflows/<workflowid>`)](#create-workflow-version-post-workflowsworkflowid)
    - [Launch Workflow Version (`POST /workflows/<workflowid>/versons/<version-name>:launch`)](#launch-workflow-version-post-workflowsworkflowidversonsversion-namelaunch)
  - [DRAGEN Trio](#dragen-trio)
  - [DRAGEN Tumor-Normal](#dragen-tumor-normal)

## Tasks
* Task: just a template with substitutions
* Task Version: filled-in template
* Task Run: executed instance of Docker image

### Create Task (`POST /tasks`)
Returns Task ID (+ version ID if `taskVersions` provided)

* name (req)
* description
* acl
* taskVersions (similar/same structure as `POST /tasks/<taskid>/versions`)

### Create and Launch Task Run (`POST /tasks/runs`)
Returns Task Run ID

* name
* description
* acl
* execution
  * image
    * name (req)
    * tag
    * digest
    * credentials
      * username
      * password
  * command
  * args
  * inputs
  * outputs
  * **systemFiles**
    * url
  * environment
    * variables
    * resources
      * type
      * size
      * cpuCores
      * memoryGb
      * hardware
  * workingDirectory

### Create Task Version (`POST /tasks/<taskid>/versions`)
Creates new Task Version within an existing task with Task ID `<taskid>`.
Returns Task Version ID.

* version (req)
* description
* acl
* execution
  * image
    * name (req)
    * tag
    * digest
    * credentials
      * username
      * password
  * command
  * args
  * inputs
  * outputs
  * **systemFiles**
    * url
  * retryLimit
  * environment
    * variables
    * resources
      * type
      * size
      * cpuCores
      * memoryGb
      * hardware
  * workingDirectory

### Launch Task Version (`POST /tasks/<taskid>/versions/<versionid>:launch`)
Launches Task Version with ID `<versionid>` for Task with ID `<taskid>`
Returns Task Run ID.

* name
* description
* arguments
* acl


## Workflows
* Workflow: just a template with substitutions
* Workflow Version: filled-in template
* Workflow Run

### Create Workflow (`POST /workflows`)
Returns Workflow ID (+ version ID if `workflowVersion` provided)

* name (req)
* description
* organization
* category
* workflowVersion
  * version (req)
  * description
  * language
    * name (req)
    * version
  * definition
  * acl
* acl

### Create Workflow Version (`POST /workflows/<workflowid>`)

* version (req)
* description
* language
  * name (req)
  * version
* definition
* acl

### Launch Workflow Version (`POST /workflows/<workflowid>/versons/<version-name>:launch`)

* name (req)
* input

## DRAGEN Trio

1. Building Workflow
  - Create initial JSON
  - Define inputs
  - Create GDS volume
  - Create ENS subscription
  - Run DRAGEN TES task
  - Poll for task completion
  - Delete ENS subscription

2. Launching Workflow
  - Create workflow
  - Create workflow version
  - Launch workflow
  - Retrieve output files

## DRAGEN Tumor-Normal

1. Building Workflow
  - Create workflow
  - Create workflow version
      - Define arguments and connections
      - State for creating GDS volume
      - State for running DRAGEN
      - State for polling for DRAGEN task status

2. Launching Workflow
  - Create workflow
  - Create workflow version
  - Launch workflow
  - Retrieve output files
