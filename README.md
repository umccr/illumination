IAP Walkthrough
===============

- [IAP Walkthrough](#iap-walkthrough)
  - [CLI](#cli)
    - [Examples](#examples)
  - [Tutorials](#tutorials)
    - [DRAGEN Trio](#dragen-trio)
    - [DRAGEN Tumor-Normal](#dragen-tumor-normal)
  - [WES](#wes)

## CLI


* Map User ID to Username

| ID       | User |
|----------|------|
| c9688651 | VS   |
| 567d89e4 | PD   |
| 7eec7332 | RV   |
| 8abf754b | SK   |

### Examples

#### volumes

- `iap volumes create my_volume`
  - (`createVolumeConflict` if already exists)
- `iap volumes get my_volume`
  - (`getVolumeNotFound` if doesn't exist)
- `iap volumes list`


#### folders

- `iap folders create gds://my_volume/my_folder`

```
id: f4541785-...
name: my_folder
volumeId: e67aba29-...
path: /my_folder/
```

- `iap folders get gds://my_volume/my_folder/`

```
│───────────────────────│────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────│
│ Field (16)            │ Value                                                                                                                  │
│───────────────────────│────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────│
│ archiveJobStatus      │ None                                                                                                                   │
│ archiveJobStorageTier │                                                                                                                        │
│ createdBy             │ 567d89e4-...                                                                                                           │
│ id                    │ f4541785-...                                                                                                           │
│ inheritedAcl          │ [tid:YXdzLXV...                                                                                                        │
│                       │ uid:567d89e4-...]                                                                                                      │
│ jobStatus             │ None                                                                                                                   │
│ modifiedBy            │ 567d89e4-...                                                                                                           │
│ name                  │ my_folder                                                                                                              │
│ path                  │ /my_folder/                                                                                                            │
│ subTenantId           │ uid:567d89e4-...                                                                                                       │
│ tenantId              │ YXdzLXV...                                                                                                             │
│ timeCreated           │ 2019-10-06 15:10:11.816 +1100 AEDT                                                                                     │
│ timeModified          │ 2019-10-06 15:10:11.816 +1100 AEDT                                                                                     │
│ urn                   │ urn:stratus:gds.files:ap-southeast-2:volumes/e67aba29-.../f4541785-...                                                 │
│ volumeId              │ e67aba29-...                                                                                                           │
│ volumeName            │ my_volume                                                                                                              │
│───────────────────────│────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────│
```

* `iap folders list gds://my_folder/`

```
│──────────────────────────────────────│───────│────────────│─────────│────────────────────────────────────│
│ id                                   │ name  │ volumeName │ path    │ timeCreated                        │
│──────────────────────────────────────│───────│────────────│─────────│────────────────────────────────────│
│ d8138acb-c8bd-4463-b5cd-08d737e44d7a │       │ my_volume  │ /       │ 2019-09-13 10:49:58.821 +1000 AEST │
│ f4541785-2e44-40a3-4fc9-08d74379f6fd │ fold1 │ my_volume  │ /fold1/ │ 2019-10-06 15:10:11.816 +1100 AEDT │
│ 01d1b3aa-2af6-436b-3a0f-08d73b126584 │ foo   │ my_volume  │ /foo/   │ 2019-09-17 11:57:29.475 +1000 AEST │
│──────────────────────────────────────│───────│────────────│─────────│────────────────────────────────────│
```

* `iap folders update gds://my_volume/fold1/`

```
id: f4541785-...
gdsPath: gds://my_folder/fold1/
```

* `iap folders upload ../../tmp1 gds://my_volume/fold2/`

```
Using: 2 workers and 4 threads-per-worker
 uploaded ../..//tmp1/file2.txt to   gds://my_volumee67aba29-02d8-4b85-498e-08d737e44d41/fold2/
 uploaded ../..//tmp1/file1.txt to   gds://my_volumee67aba29-02d8-4b85-498e-08d737e44d41/fold2/
 uploaded ../..//tmp1/file4.txt to   gds://my_volumee67aba29-02d8-4b85-498e-08d737e44d41/fold2/
 uploaded ../..//tmp1/file3.txt to   gds://my_volumee67aba29-02d8-4b85-498e-08d737e44d41/fold2/
 uploaded ../..//tmp1/file5.txt to   gds://my_volumee67aba29-02d8-4b85-498e-08d737e44d41/fold2/
Finished
```

* `iap folders archive gds://diakumis/fold2/`
  - `archiveStatus` has changed to `Archived` from `None` (whatever that means)

```
Archived folder gds://diakumis/fold2/
```

* `folders delete gds://diakumis/fold2/`

```
Are you sure you want to delete this folder? (y,n) : y
```

* `iap files download gds://diakumis/foo/baz.txt .`


* `iap files delete gds://diakumis/foo/baz.txt`

```
Are you sure you want to delete this file? (y,n) : y
deleted file gds://diakumis/foo/baz.txt
```

* `iap files delete gds://diakumis/foo/baz.txt`

```
File not found
```


## Tutorials

### DRAGEN Trio

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

### DRAGEN Tumor-Normal

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


